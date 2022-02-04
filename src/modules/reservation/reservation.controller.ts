import { Body, Controller, Post, Request } from '@nestjs/common';
import { HotelRoomsService } from '../hotels/hotel.rooms.service';
import { newReservationDto } from './dto/newReservation.dto';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
    constructor(
        private readonly reservationService: ReservationService,
        private readonly hotelRoomService: HotelRoomsService
    ) { }

    @Post('/client/reservations')
    async addReservation(@Body() data: newReservationDto, @Request() req) {
        let { hotelRoom, startDate, endDate } = data;
        const userId = req.user._id;
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

        //  дописать, когда будет видно, что вернет запрос
        return {
            // startDate: response,
            // "endDate": string,
            // "hotelRoom": {
            //     "title": string,
            //     "description": string,
            //     "images": [string]
            // },
            // "hotel": {
            //     "title": string,
            //     "description": string
            // }
        }

    }

}
