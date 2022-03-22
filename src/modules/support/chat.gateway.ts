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
import { AuthWSGuard } from 'src/guards/authWS.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/utils/role.enum';
import { Roles } from 'src/utils/roles.decorator';
import { SendMessageWSdto } from './dto/sendMessage.WS.dto';
import { SupportService } from './support.service';

@WebSocketGateway()
export class ChatGateway {
  constructor(private supportService: SupportService) { }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('subscribeToChat')
  @Roles(Role.Client, Role.Manager)
  @UseGuards(RolesGuard)
  @UseGuards(AuthWSGuard)
  async getChatHistory(@MessageBody() supportRequest: string, @Request() req) {
    const author = req.user._doc;
    const request = await this.supportService.getMessages(
      supportRequest,
      author,
    );
    this.server.emit('subscribeToChat', request);
  }

  @SubscribeMessage('sendMessage')
  @Roles(Role.Client, Role.Manager)
  @UseGuards(RolesGuard)
  @UseGuards(AuthWSGuard)
  async sendMessage(@MessageBody() data: SendMessageWSdto, @Request() req) {
    const { supportRequest, text } = data;
    const author = req.user._doc;
    const response = this.supportService.sendMessage({
      author,
      supportRequest,
      text,
    });
    this.server.emit('sendMessage', response);
  }
}
