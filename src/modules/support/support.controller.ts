import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Query,
  Get,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/utils/role.enum';
import { Roles } from 'src/utils/roles.decorator';
import { GetSupportRequestsDto } from './dto/getSupportRequests.dto';
import { NewSupportRequestDto } from './dto/newSupportRequest.dto';
import { SupportClientService } from './support.client.service';
import { SupportEmployeeService } from './support.employee.service';
import { SupportService } from './support.service';

@ApiTags('Support')
@Controller()
export class SupportController {
  constructor(
    private readonly supportService: SupportService,
    private readonly supportEmployeeService: SupportEmployeeService,
    private readonly supportClientService: SupportClientService,
  ) { }

  @Post('/client/support-requests/')
  @Roles(Role.Client)
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @ApiBody({ type: NewSupportRequestDto })
  async createSupportRequest(
    @Body() data: NewSupportRequestDto,
    @Request() req,
  ) {
    const { text } = data;
    const user = req.user._doc._id;
    const response = await this.supportClientService.createSupportRequest({
      user,
      text,
    });
    return {
      id: response._id,
      createdAt: response.createdAt,
      isActive: response.isActive,
      hasNewMessages: false,
    };
  }

  @Get('/client/support-requests/')
  @Roles(Role.Client)
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @ApiQuery({ type: GetSupportRequestsDto })
  async getClientSupportRequests(
    @Request() req,
    @Query() data: GetSupportRequestsDto,
  ) {
    const user = req.user._doc._id;
    const response = await this.supportClientService.getClientSupportRequests(
      data,
      user,
    );
    return response;
  }

  @Post('/common/support-requests/:id/messages')
  @Roles(Role.Client, Role.Manager)
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @ApiBody({ type: NewSupportRequestDto })
  async sendMessage(
    @Param('id') supportRequest,
    @Body() data: NewSupportRequestDto,
    @Request() req,
  ) {
    const author = req.user._doc._id;
    const { text } = data;
    return await this.supportService.sendMessage({
      author,
      supportRequest,
      text,
    });
  }

  @Get('/manager/support-requests/')
  @Roles(Role.Client)
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @ApiQuery({ type: GetSupportRequestsDto })
  async getManagerSupportRequests(@Query() data: GetSupportRequestsDto) {
    const response =
      await this.supportEmployeeService.getManagerSupportRequests(data);
    return response;
  }

  @Get('/common/support-requests/:id/messages')
  @Roles(Role.Client, Role.Manager)
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  async getMessages(@Param('id') supportRequest, @Request() req) {
    const author = req.user._doc;
    return await this.supportService.getMessages(supportRequest, author);
  }

  @Post('/common/support-requests/:id/messages/read')
  @Roles(Role.Client, Role.Manager)
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  async markMessagesAsRead(@Param('id') supportRequest, @Request() req) {
    const user = req.user._doc._id;
    if (req.user._doc.role == 'manager') {
      return await this.supportEmployeeService.markMessagesAsRead({
        supportRequest,
        user,
      });
    }
    if (req.user._doc.role == 'client') {
      return await this.supportClientService.markMessagesAsRead({
        supportRequest,
        user,
      });
    }
  }
}
