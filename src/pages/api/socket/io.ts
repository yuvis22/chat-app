import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';

export default function ioHandler(req: NextApiRequest, res: NextApiResponse) {
  if (!res.socket || !res.socket.server) {
    return res.status(500).json({ error: 'Failed to initialize socket server' });
  }

  const httpServer: NetServer = res.socket.server as any;
  
  if (!httpServer.io) {
    console.log('Initialize Socket.io server...');
    const io = new SocketIOServer(httpServer, {
      path: '/api/socket/io',
      addTrailingSlash: false,
    });
    
    io.on('connection', (socket) => {
      console.log(`Socket connected: ${socket.id}`);
      
      socket.on('join-chat', (chatId: string) => {
        console.log(`Socket ${socket.id} joined chat: ${chatId}`);
        socket.join(chatId);
      });
      
      socket.on('leave-chat', (chatId: string) => {
        console.log(`Socket ${socket.id} left chat: ${chatId}`);
        socket.leave(chatId);
      });
      
      socket.on('send-message', (data: any) => {
        const { chatId, message } = data;
        console.log(`Message received in chat ${chatId}:`, message);
        io.to(chatId).emit('new-message', message);
      });
      
      socket.on('typing', (data: any) => {
        const { chatId, userId } = data;
        socket.to(chatId).emit('user-typing', userId);
      });
      
      socket.on('stop-typing', (data: any) => {
        const { chatId, userId } = data;
        socket.to(chatId).emit('user-stop-typing', userId);
      });
      
      socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });
    
    httpServer.io = io;
  }
  
  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};