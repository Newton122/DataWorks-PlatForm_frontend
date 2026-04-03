import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { io } from 'socket.io-client';

// Use production URL as fallback
const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://dataworks-platform.onrender.com';

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typingUsers, setTypingUsers] = useState({});
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [messagesPage, setMessagesPage] = useState(1);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection with fallback to production URL
    const newSocket = io(API_URL, {
      auth: {
        token: localStorage.getItem('token')
      }
    });

    newSocket.on('connect', () => {
      console.log('Connected to socket server');
    });

    newSocket.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });

    newSocket.on('newMessage', (message) => {
      console.log('Received newMessage:', message);
      setMessages(prev => {
        // Remove temporary message with the same clientId, if any
        let filtered = prev;
        if (message.clientId) {
          filtered = filtered.filter(m => m.clientId !== message.clientId);
        }

        // Skip duplicates
        if (filtered.some(m => m._id === message._id)) {
          return filtered;
        }

        // Only include if in current conversation
        if (selectedConversation &&
            (message.senderId === selectedConversation.userId ||
             message.receiverId === selectedConversation.userId)) {
          return [...filtered, message];
        }

        return filtered;
      });

      // Show browser notification if not focused and message is not from self
      if (message.senderId !== user?._id && !document.hasFocus()) {
        if (Notification.permission === 'granted') {
          new Notification('New message', {
            body: message.content,
            icon: '/favicon.ico'
          });
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              new Notification('New message', {
                body: message.content,
                icon: '/favicon.ico'
              });
            }
          });
        }
      }

      
      // Update conversation list to reflect new message
      setConversations(prev => {
        let conversationExists = false;
        const updated = prev.map(conv => {
          if (conv.userId === message.senderId || conv.userId === message.receiverId) {
            conversationExists = true;
            const otherUserId = message.senderId === user?._id ? message.receiverId : message.senderId;
            return {
              ...conv,
              userId: otherUserId,
              userName: conv.userName || 'Unknown User',
              userAvatar: conv.userAvatar || 'U',
              lastMessage: message.content,
              lastMessageTime: message.timestamp,
              timestamp: message.timestamp,
              unread: message.receiverId === user?._id ? (conv.unread || 0) + 1 : conv.unread,
              online: onlineUsers.some(u => u._id.toString() === otherUserId.toString())
            };
          }
          return conv;
        });
        
        // If conversation doesn't exist, add it
        if (!conversationExists) {
          const otherUserId = message.senderId === user?._id ? message.receiverId : message.senderId;
          const otherUser = onlineUsers.find(u => u._id.toString() === otherUserId.toString());
          const newConv = {
            userId: otherUserId,
            userName: otherUser?.name || 'Unknown User',
            userAvatar: (otherUser?.name || 'U').charAt(0).toUpperCase(),
            lastMessage: message.content,
            lastMessageTime: message.timestamp,
            timestamp: message.timestamp,
            unread: message.receiverId === user?._id ? 1 : 0,
            online: !!otherUser
          };
          updated.unshift(newConv);
        }
        
        // Sort by last message time
        return updated.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
      });

      // Auto-scroll for current conversation when user is at bottom (or if message is from me)
      if (selectedConversation &&
          (message.senderId === selectedConversation.userId || message.receiverId === selectedConversation.userId) &&
          (isAtBottom || message.senderId === user?._id)) {
        scrollToBottom();
      }
    });

    newSocket.on('userTyping', ({ userId, name }) => {
      setTypingUsers(prev => ({ ...prev, [userId]: name }));
    });

    newSocket.on('userStopTyping', ({ userId }) => {
      setTypingUsers(prev => {
        const newState = { ...prev };
        delete newState[userId];
        return newState;
      });
    });

    newSocket.on('messagesRead', ({ readBy }) => {
      // Update messages to show they've been read
      setMessages(prev => prev.map(msg => {
        if (msg.senderId === user?._id || msg.senderId === 'me') {
          return { ...msg, read: true };
        }
        return msg;
      }));
    });

    newSocket.on('messageSent', (message) => {
      // This is just a confirmation that the message was sent
      console.log('Message sent confirmation:', message);
    });

    newSocket.on('messageError', ({ error }) => {
      console.error('Message error:', error);
      alert('Failed to send message. Please try again.');
    });

    newSocket.on('messagesRead', ({ readBy }) => {
      // Update messages to show they've been read
      setMessages(prev => prev.map(msg => {
        if (msg.senderId === user?._id || msg.senderId === 'me') {
          return { ...msg, read: true };
        }
        return msg;
      }));
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.userId);
      setIsAtBottom(true);

      // Mark messages as read when opening conversation
      if (socket && selectedConversation.userId) {
        socket.emit('markAsRead', { senderId: selectedConversation.userId });

        // Trigger notification bell refresh when message read state changes
        window.dispatchEvent(new Event('notifications-updated'));
      }
      // Clear typing indicator when changing conversations
      setTypingUsers({});
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  }, [selectedConversation]);

  // Update conversation online status when onlineUsers changes
  useEffect(() => {
    setConversations(prev => prev.map(conv => ({
      ...conv,
      online: onlineUsers.some(u => u._id.toString() === conv.userId.toString())
    })));
  }, [onlineUsers]);

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

  const loadOlderMessages = () => {
    if (!selectedConversation || !hasMoreMessages || loadingMore) return;
    fetchMessages(selectedConversation.userId, messagesPage + 1, true);
  };

  // Handle manual scroll position changes
  const onChatScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

    setIsAtBottom(distanceFromBottom < 72);

    if (scrollTop < 60 && hasMoreMessages && !loadingMore) {
      loadOlderMessages();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/messages/conversations`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        // API returns { conversations: [...] }
        setConversations(data.conversations || data);
      } else {
        console.error('Failed to fetch conversations:', response.statusText);
        setConversations([]);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (userId, page = 1, append = false) => {
    if (!userId) return;

    if (append) {
      setLoadingMore(true);
    }

    try {
      const response = await fetch(`${API_URL}/api/messages/${userId}?page=${page}&limit=30`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();

        if (append) {
          // Preserve scroll position when prepending older messages
          const oldScrollHeight = chatContainerRef.current.scrollHeight;
          const oldScrollTop = chatContainerRef.current.scrollTop;

          setMessages(prev => [...data.messages, ...prev]);

          // After render, adjust scroll to maintain position
          setTimeout(() => {
            const newScrollHeight = chatContainerRef.current.scrollHeight;
            const scrollDifference = newScrollHeight - oldScrollHeight;
            chatContainerRef.current.scrollTop = oldScrollTop + scrollDifference;
          }, 0);
        } else {
          setMessages(data.messages || []);
        }

        setMessagesPage(page);
        setHasMoreMessages(data.hasMore);

        if (!append) {
          setIsAtBottom(true);
        }
      } else {
        console.error('Failed to fetch messages:', response.statusText);
        if (!append) setMessages([]);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      if (!append) setMessages([]);
    } finally {
      setLoadingMore(false);
    }
  };





  const handleTyping = () => {
    if (socket && selectedConversation) {
      socket.emit('typing', { receiverId: selectedConversation.userId });
      
      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Set timeout to stop typing indicator
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('stopTyping', { receiverId: selectedConversation.userId });
      }, 2000);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const messageToSend = newMessage.trim();
    const tempId = `temp-${Date.now()}`;

    const tempMessage = {
      _id: tempId,
      senderId: user?._id || 'me',
      receiverId: selectedConversation.userId,
      content: messageToSend,
      timestamp: new Date().toISOString(),
      read: false,
      sending: true,
      clientId: tempId
    };

    setMessages(prev => [...prev, tempMessage]);
    setNewMessage('');

    // Stop typing indicator
    if (socket && selectedConversation) {
      socket.emit('stopTyping', { receiverId: selectedConversation.userId });
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }

    try {
      if (socket && socket.connected) {
        console.log('Sending message via socket:', {
          receiverId: selectedConversation.userId,
          content: messageToSend,
          clientId: tempId
        });
        socket.emit('sendMessage', {
          receiverId: selectedConversation.userId.toString(),
          content: messageToSend,
          clientId: tempId
        });
      } else {
        // fallback HTTP call if socket is disconnected
        await fetch(`${API_URL}/api/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            receiverId: selectedConversation.userId,
            content: messageToSend
          })
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => prev.filter(m => m._id !== tempId));
      alert('Failed to send message. Please try again.');
    }
  };

  const deleteMessage = async (messageId) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`${API_URL}/api/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setMessages(prev => prev.filter(m => m._id !== messageId));
        // Update conversation last message if needed
        setConversations(prev => prev.map(conv => {
          if (conv.userId === selectedConversation.userId) {
            const remainingMessages = messages.filter(m => m._id !== messageId);
            const lastMsg = remainingMessages[remainingMessages.length - 1];
            return {
              ...conv,
              lastMessage: lastMsg ? lastMsg.content : '',
              lastMessageTime: lastMsg ? lastMsg.timestamp : conv.timestamp
            };
          }
          return conv;
        }));
      } else {
        alert('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message');
    }
  };

  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      
      const now = new Date();
      const diff = now - date;
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);
      
      if (minutes < 1) return 'Just now';
      if (minutes < 60) return `${minutes}m ago`;
      if (hours < 24) return `${hours}h ago`;
      if (days < 7) return `${days}d ago`;
      
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = availableUsers.filter(u =>
    u.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const fetchAvailableUsers = async () => {
    setLoadingUsers(true);
    try {
      console.log('Fetching available users from:', `${API_URL}/api/messages/users`);
      console.log('Current user:', user);
      const response = await fetch(`${API_URL}/api/messages/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Fetch response status:', response.status, response.statusText);
      if (response.ok) {
        const data = await response.json();
        console.log('Users received:', data.users?.length || 0, 'users');
        setAvailableUsers(data.users || []);
      } else {
        console.error('Failed to fetch users:', response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        setAvailableUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setAvailableUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  const startNewConversation = async (selectedUser) => {
    // Check if conversation already exists
    const existingConv = conversations.find(conv => conv.userId === selectedUser._id);
    if (existingConv) {
      setSelectedConversation(existingConv);
      setShowNewMessageModal(false);
      setUserSearchTerm('');
      return;
    }

    // Create a new conversation object
    const newConv = {
      userId: selectedUser._id,
      userName: selectedUser.name,
      userAvatar: selectedUser.name?.charAt(0)?.toUpperCase() || 'U',
      lastMessage: '',
      timestamp: new Date().toISOString(),
      unread: 0,
      online: onlineUsers.some(u => u._id.toString() === selectedUser._id.toString())
    };

    setConversations(prev => [newConv, ...prev]);
    setSelectedConversation(newConv);
    setShowNewMessageModal(false);
    setUserSearchTerm('');
  };

  const openNewMessageModal = () => {
    setShowNewMessageModal(true);
    fetchAvailableUsers();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center mobile-compact">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--accent-primary)] border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--text-muted)]">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-primary)] mobile-compact">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] min-h-[80vh] overflow-hidden">
        <div className="grid md:grid-cols-3 gap-2 md:gap-0 h-full">
            {/* Conversations Sidebar */}
            <div className="md:col-span-1 border-r border-[var(--border-color)] flex flex-col min-h-[60vh] md:min-h-auto">
              {/* Header */}
              <div className="p-3 md:p-4 border-b border-[var(--border-color)] flex-shrink-0">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h2 className="text-base md:text-lg font-semibold text-[var(--text-primary)]">Messages</h2>
                  <div className="flex gap-1 md:gap-2">
                    <button
                      onClick={() => selectedConversation && fetchMessages(selectedConversation.userId)}
                      className="px-2 md:px-3 py-1 md:py-1.5 bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-xs md:text-sm font-medium rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
                    >
                      Refresh
                    </button>
                    <button
                      onClick={openNewMessageModal}
                      className="px-2 md:px-3 py-1 md:py-1.5 polidhed-dark-green-btn text-xs md:text-sm font-medium rounded-lg whitespace-nowrap"
                    >
                      New Message
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-xs md:text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                  />
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Conversation List */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length === 0 ? (
                  <div className="p-4 text-center text-[var(--text-muted)]">
                    {user?.role === 'freelancer' ? 
                      'No conversations yet. Apply to jobs to connect with clients!' : 
                      'No conversations found'
                    }
                  </div>
                ) : (
                  filteredConversations.map((conv) => (
                    <div
                      key={conv.userId}
                      onClick={() => setSelectedConversation(conv)}
                      className={`p-4 border-b border-[var(--border-color)] cursor-pointer transition-colors ${
                        selectedConversation?.userId === conv.userId
                          ? 'bg-[var(--bg-secondary)]'
                          : 'hover:bg-[var(--bg-secondary)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-sm font-semibold text-[var(--accent-primary)]">
                            {conv.userAvatar}
                          </div>
                          {conv.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[var(--bg-primary)]"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-sm font-semibold text-[var(--text-primary)] truncate">{conv.userName}</h3>
                            <span className="text-xs text-[var(--text-muted)]">{formatDate(conv.timestamp)}</span>
                          </div>
                          <p className="text-xs text-[var(--text-muted)] truncate">{conv.lastMessage}</p>
                        </div>
                        {conv.unread > 0 && (
                          <div className="w-5 h-5 bg-[var(--accent-primary)] flex items-center justify-center text-xs text-white font-semibold">
                            {conv.unread}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2 flex flex-col min-h-[60vh] md:min-h-auto">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-[var(--border-color)]">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-sm font-semibold text-[var(--accent-primary)]">
                          {selectedConversation.userAvatar}
                        </div>
                        {selectedConversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[var(--bg-primary)]"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[var(--text-primary)]">{selectedConversation.userName}</h3>
                        <p className="text-xs text-[var(--text-muted)]">
                          {selectedConversation.online ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Jump to latest button */}
                  {!isAtBottom && (
                    <div className="p-2 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] text-right">
                      <button
                        onClick={() => {
                          setIsAtBottom(true);
                          scrollToBottom();
                        }}
                        className="px-3 py-1 text-xs text-[var(--text-primary)] rounded polidhed-dark-green-btn"
                      >
                        Jump to latest
                      </button>
                    </div>
                  )}

                  {/* Messages */}
                  <div className="px-4 py-2 border-b border-[var(--border-color)]">
                    {hasMoreMessages && !loadingMore ? (
                      <button
                        onClick={loadOlderMessages}
                        className="px-3 py-1 text-xs text-[var(--text-primary)] rounded bg-[var(--bg-tertiary)] hover:bg-[var(--bg-hover)]"
                      >
                        Load older messages
                      </button>
                    ) : hasMoreMessages && loadingMore ? (
                      <p className="text-xs text-[var(--text-muted)]">Loading older messages...</p>
                    ) : (
                      <p className="text-xs text-[var(--text-muted)]">No more older messages</p>
                    )}
                  </div>

                  <div
                    ref={chatContainerRef}
                    onScroll={onChatScroll}
                    className="flex-1 overflow-y-scroll px-4 pt-4 pb-0 space-y-4 min-h-0"
                  >
                    {messages.length === 0 ? (
                      <div className="text-center text-[var(--text-muted)] py-8">
                        No messages yet. Start the conversation!
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message._id}
                          className={`flex ${
                            message.senderId === user?._id || message.senderId === 'me'
                              ? 'justify-end'
                              : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[70%] px-4 py-2 relative group ${
                              message.senderId === user?._id || message.senderId === 'me'
                                ? 'bg-[var(--accent-primary)] text-white'
                                : 'bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)]'
                            }`}
                          >
                            {(message.senderId === user?._id || message.senderId === 'me') && (
                              <button
                                onClick={() => deleteMessage(message._id)}
                                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                title="Delete message"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                            <p className="text-sm">{message.content}</p>
                            <div className={`flex items-center justify-end gap-1 mt-1 ${
                              message.senderId === user?._id || message.senderId === 'me'
                                ? 'text-indigo-200'
                                : 'text-[#64748B]'
                            }`}>
                              <span className="text-xs">{formatTime(message.timestamp)}</span>
                              {(message.senderId === user?._id || message.senderId === 'me') && message.read && (
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Typing Indicator */}
                  {selectedConversation && typingUsers[selectedConversation.userId] && (
                    <div className="px-4 py-2 text-sm text-[var(--text-muted)]">
                      {typingUsers[selectedConversation.userId]} is typing...
                    </div>
                  )}

                  {/* Message Input */}
                  <div className="px-4 pb-4 pt-0 border-t border-[var(--border-color)]">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => {
                          setNewMessage(e.target.value);
                          handleTyping();
                        }}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className={`px-4 py-2 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                          newMessage.trim()
                            ? 'polidhed-dark-green-btn'
                            : 'bg-[var(--bg-tertiary)]'
                        }`}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Select a conversation</h3>
                    <p className="text-sm text-[var(--text-muted)]">Choose a conversation from the sidebar to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* New Message Modal */}
      {showNewMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg w-full max-w-md max-h-[85vh] flex flex-col">
            <div className="p-3 md:p-4 border-b border-[var(--border-color)] flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-base md:text-lg font-semibold text-[var(--text-primary)]">New Message</h3>
                <button
                  onClick={() => {
                    setShowNewMessageModal(false);
                    setUserSearchTerm('');
                  }}
                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-3 relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto flex-1">
              {loadingUsers ? (
                <div className="p-8 text-center">
                  <div className="w-8 h-8 border-2 border-[var(--accent-primary)] border-t-transparent animate-spin mx-auto mb-2"></div>
                  <p className="text-[var(--text-muted)] text-sm">Loading users...</p>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="p-4 md:p-8 text-center text-[var(--text-muted)] text-sm">
                  {user?.role === 'freelancer' ? 
                    'No available contacts. Apply to jobs to connect with clients, or contact admin for support.' : 
                    'No users found'
                  }
                </div>
              ) : (
                filteredUsers.map((u) => (
                  <div
                    key={u._id}
                    onClick={() => startNewConversation(u)}
                    className="p-3 md:p-4 border-b border-[var(--border-color)] cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-sm font-semibold text-[var(--accent-primary)] flex-shrink-0">
                        {u.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-[var(--text-primary)] truncate">{u.name}</h4>
                        <p className="text-xs text-[var(--text-muted)] truncate">{u.email}</p>
                        <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${
                          u.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                          u.role === 'freelancer' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {u.role}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
