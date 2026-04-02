
import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const NotificationBell = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Socket connection
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.emit("joinRoom", userId);

    newSocket.on("notification", (data) => {
      setNotifications(prev => [data, ...prev]);
      setUnreadCount(prev => prev + 1);
      // Play sound
      new Audio('/sounds/notification.mp3').play().catch(e => console.log('Audio failed:', e));
    });

    // Fetch existing notifications
    fetchNotifications();

    return () => newSocket.close();
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notifications', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNotifications(res.data.notifications);
      setUnreadCount(res.data.unreadCount);
    } catch (error) {
      console.error('Fetch notifications error:', error);
    }
  };

  const markAllRead = async () => {
    try {
      await axios.patch('http://localhost:5000/api/notifications/read', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUnreadCount(0);
    } catch (error) {
      console.error('Mark read error:', error);
    }
  };

  return (
    <div className="notification-bell" style={{ position: 'relative', cursor: 'pointer' }}>
      <div 
        onClick={() => setShowDropdown(!showDropdown)}
        style={{ fontSize: '24px' }}
      >
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: 'red',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {unreadCount}
          </span>
        )}
      </div>

      {showDropdown && (
        <div style={{
          position: 'absolute',
          top: '35px',
          right: '0',
          width: '300px',
          maxHeight: '400px',
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          overflowY: 'auto'
        }}>
          <div style={{ padding: '15px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4>Notifications</h4>
            {unreadCount > 0 && (
              <button 
                onClick={markAllRead}
                style={{ background: '#007bff', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Mark all read
              </button>
            )}
          </div>
          <div>
            {notifications.length === 0 ? (
              <p style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No notifications</p>
            ) : (
              notifications.map((n, i) => (
                <div key={n._id || i} style={{
                  padding: '15px',
                  borderBottom: '1px solid #f0f0f0',
                  background: !n.isRead ? '#f8f9ff' : 'white'
                }}>
                  <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}>{n.message}</p>
                  <small style={{ color: '#666' }}>
                    {new Date(n.createdAt).toLocaleString()}
                  </small>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;

