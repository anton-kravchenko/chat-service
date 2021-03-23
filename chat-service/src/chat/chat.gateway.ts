import { Logger, Sse } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { getGithubNicknameFromCookie } from './utils';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ChatGateway.name);
  private readonly clientIdToNicknameMapping = new Map<string, string>();
  @WebSocketServer() server: Server;

  handleConnection(client: Socket): void {
    const nickname = getGithubNicknameFromCookie(client.handshake.headers.cookie);

    const { id: clientId } = client;

    this.clientIdToNicknameMapping.set(clientId, nickname);
    this.logger.log(`${nickname} has connected`);

    client.emit('message', {
      msg: `Welcome to the chat, ${nickname}`,
      currUserId: nickname,
    });
    client.emit('activeUsers', Array.from(this.clientIdToNicknameMapping.values()));

    client.broadcast.emit('message', {
      msg: `${nickname} has connected to the chat.`,
    });

    client.broadcast.emit('userConnected', nickname);
  }

  handleDisconnect(client: Socket): void {
    const { id: clientId } = client;
    const nickname = this.clientIdToNicknameMapping.get(clientId);

    client.broadcast.emit('message', { msg: `${nickname} has disconnected` });
    client.broadcast.emit('userDisconnected', nickname);

    this.logger.log(`${nickname} has disconnected`);
    this.clientIdToNicknameMapping.delete(clientId);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('message', {
      msg: payload,
      user: this.clientIdToNicknameMapping.get(client.id),
      time: new Date(),
    });
  }
}
