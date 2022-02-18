import { Body, Controller, Post, UseGuards, Request, Query, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/utils/role.enum';
import { Roles } from 'src/utils/roles.decorator';
import { getClientSupportRequestsDto } from './dto/getClientSupportRequests.dto';
import { newSupportRequestDto } from './dto/newSupportRequest.dto';
import { SupportClientService } from './support.client.service';
import { SupportEmployeeService } from './support.employee.service';
import { SupportService } from './support.service';

@Controller()
export class SupportController {
    constructor(
        private readonly supportService: SupportService,
        private readonly supportEmployeeService: SupportEmployeeService,
        private readonly supportClientService: SupportClientService
    ) { }

    @Post('/client/support-requests/')
    @Roles(Role.Client)
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    async createSupportRequest(@Body() data: newSupportRequestDto, @Request() req) {
        const { text } = data;
        const user = req.user._doc._id;
        const response = await this.supportClientService.createSupportRequest({ user, text });
        return {
            id: response._id,
            createdAt: response.createdAt,
            isActive: response.isActive,
            hasNewMessages: false
        }
    }


    @Get('/client/support-requests/')
    @Roles(Role.Client)
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    async getClientSupportRequests(@Query() data: getClientSupportRequestsDto, @Request() req) {
        const user = req.user._doc._id;
        const response = await this.getClientSupportRequests(data, user);
    }

    // для теста
    @Get('/getcount/:supportRequest')
    async getCount(@Param('supportRequest') supportRequest) {
        return await this.supportClientService.getUnreadCount(supportRequest);
    }

    @Post('/common/support-requests/:id/messages')
    @Roles(Role.Client, Role.Manager)
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    async sendMessage(
        @Param('id') supportRequest,
        @Body() data: newSupportRequestDto,
        @Request() req) {
        const author = req.user._doc._id;
        const { text } = data;
        return await this.supportService.sendMessage({ author, supportRequest, text });
    }
}
