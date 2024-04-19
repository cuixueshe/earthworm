import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

import { OnlineService } from "../online/online.service";

@WebSocketGateway({
  cors: {
    /**
     * 允许的前端地址，这里要注意配置跨域问题
     * 线上地址怎么写
     */
    // origin: "http://localhost:3000",
    origin: "*",
  },
})
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(private readonly onlineService: OnlineService) {}

  currentOnlineUsers = 0;

  async getOnlineUsers() {
    const userCount = await this.onlineService.getOnlineUserCount();
    this.server.emit("onlineUsers", userCount);
  }

  async afterInit() {
    this.server.on("connection", () => {
      this.getOnlineUsers();
    });
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    const userId = client.handshake.headers["user-id"] as string;
    if (!userId) return;
    this.onlineService.addUser(userId);
    this.getOnlineUsers();
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const userId = client.handshake.headers["user-id"] as string;
    if (!userId) return;
    this.onlineService.removeUser(userId);
    this.getOnlineUsers();
  }
}
