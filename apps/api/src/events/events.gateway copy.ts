import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

import { OnlineService } from "../online/online.service";

type OnlineUser = {
  userId: string;
};

@WebSocketGateway({
  cors: {
    origin: "*", // 允许的前端地址，这里要注意配置跨域问题
  },
})
export class EventGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly onlineService: OnlineService) {
    this.getOnlineUsers();
  }

  @SubscribeMessage("join")
  async handleJoin(@MessageBody() body: OnlineUser, @ConnectedSocket() client: Socket) {
    this.onlineService.addUser(body.userId);
    this.getOnlineUsers();
  }

  @SubscribeMessage("leave")
  handleLeave(@MessageBody() body: OnlineUser, @ConnectedSocket() client: Socket) {
    this.onlineService.removeUser(body.userId);
    this.getOnlineUsers();
  }

  async getOnlineUsers() {
    const userCount = await this.onlineService.getOnlineUserCount();
    console.log(111111111111, userCount);
    this.server.emit("onlineUsers", userCount);
  }
}
