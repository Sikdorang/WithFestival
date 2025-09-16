import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:4000', {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('Socket.IO connection established');
});

socket.on('disconnect', () => {
  console.log('Socket.IO connection closed');
});

socket.on('error', (error: unknown) => {
  console.error('Socket.IO error:', error);
});

export default socket;
