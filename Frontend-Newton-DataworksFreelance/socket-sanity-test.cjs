const { io } = require('socket.io-client');
const fs = require('fs');

const API = 'http://localhost:5000';
const clientToken = fs.readFileSync('/tmp/client_token', 'utf8').trim();
const freelancerToken = fs.readFileSync('/tmp/freelancer_token', 'utf8').trim();

function connectAs(name, token) {
  const socket = io(API, { auth: { token }, reconnectionDelayMax: 10000 });
  socket.on('connect', () => console.log(`${name} connected (id=${socket.id})`));
  socket.on('connect_error', (err) => console.error(`${name} connect_error:`, err && err.message ? err.message : err));
  socket.on('disconnect', (reason) => console.log(`${name} disconnected:`, reason));
  socket.on('onlineUsers', (users) => console.log(`${name} onlineUsers:`, users.map(u=>u.name)));
  socket.on('newMessage', (msg) => console.log(`${name} got newMessage:`, msg.content, 'from', msg.senderId));
  socket.on('notification', (n) => console.log(`${name} got notification:`, n.type, n.title));
  socket.on('messageSent', (m) => console.log(`${name} messageSent ack:`, m.content));
  return socket;
}

(async () => {
  const client = connectAs('Client', clientToken);
  const freelancer = connectAs('Freelancer', freelancerToken);

  // wait for connections
  await new Promise(r => setTimeout(r, 1500));

  console.log('Sending a socket message from client to freelancer...');
  const freelancerId = '6a18ce19aff5adaf23cd5e0e';
  client.emit('sendMessage', { receiverId: freelancerId, content: 'Hello via socket from client test', clientId: 'node-test-' + Date.now() });

  // wait to observe
  await new Promise(r => setTimeout(r, 2000));
  console.log('Now sending reply from freelancer...');
  const clientId = '6a18ce03aff5adaf23cd5e0b';
  freelancer.emit('sendMessage', { receiverId: clientId, content: 'Reply via socket from freelancer test' });

  await new Promise(r => setTimeout(r, 2000));
  client.disconnect();
  freelancer.disconnect();
})();