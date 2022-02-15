import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/utils/role.enum';
import { Roles } from 'src/utils/roles.decorator';
import { HotelRoomsService } from '../hotels/hotel.rooms.service';
import { newReservationDto } from './dto/newReservation.dto';
import { ReservationService } from './reservation.service';

@Controller()
export class ReservationController {
    constructor(
        private readonly reservationService: ReservationService,
        private readonly hotelRoomService: HotelRoomsService
    ) { }

    @Post('/client/reservations')
    @Roles(Role.Client)
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    async addReservation(@Body() data: newReservationDto, @Request() req) {
        let { hotelRoom, startDate, endDate } = data;
        const userId = req.user._doc._id;
        const dateStart = new Date(startDate);
        const dateEnd = new Date(endDate)
        const roomInfo = await this.hotelRoomService.findById(hotelRoom);
        const response = this.reservationService.addReservation({
            userId,
            hotelId: roomInfo.hotel,
            roomId: hotelRoom,
            dateStart,
            dateEnd
        });
        return response;
    }

    @Get('/client/reservations')
    @Roles(Role.Client)
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    async getCurrentUserReservations(@Request() req) {
        const userId = req.user._doc._id;
        return this.reservationService.getCurrentUserReservations(userId);
    }

    @Delete('/client/reservations/:id')
    @Roles(Role.Client)
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    async deleteCurrentUserReservations(@Param('id') id, @Request() req) {
        const userId = req.user._doc._id;
        await this.reservationService.deleteCurrentUserReservations(userId, id);
        return;
    }

    @Get('/manager/reservations/:userId')
    @Roles(Role.Manager)
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    async getUserReservations(@Param('userId') id) {
        return this.reservationService.getCurrentUserReservations(id);
    }

    @Delete('/manager/reservations/:userId/:reservationId')
    @Roles(Role.Manager)
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    async deleteUserReservations(@Param('userId') userId, @Param('reservationId') reservationId) {
        await this.reservationService.deleteCurrentUserReservations(userId, reservationId);
        return;
    }


}
