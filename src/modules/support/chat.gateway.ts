import { UseGuards } from '@nestjs/common';
import { Request } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/utils/role.enum';
import { Roles } from 'src/utils/roles.decorator';
import { SupportService } from './support.service';


@WebSocketGateway()
export class ChatGateway {
  constructor(private supportService: SupportService) { }
  @WebSocketServer()
  server: Server;



  @SubscribeMessage('subscribeToChat')
  @Roles(Role.Client, Role.Manager)
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  async getChatHistory(@MessageBody() supportRequest: string, @Request() req) {
    console.log(supportRequest)
    const author = req.user._doc;
    const request = await this.supportService.getMessages(supportRequest, author);
    this.server.emit('subscribeToChat', request)
  }
}
