import { Body, Controller, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { newHotelDto } from './dto/newHotel.Dto';
import { newRoomDto } from './dto/newRoom.Dto';
import { searchHotelsDto } from './dto/searchHotels.Dto';
import { searchRoomsDto } from './dto/searchRooms.Dto';
import { HotelRoomsService } from './hotel.rooms.service';
import { HotelsService } from './hotels.service';

@Controller()
export class HotelsController {
  constructor(
    private readonly hotelService: HotelsService,
    private readonly hotelRoomService: HotelRoomsService
  ) { }

  @Get('/common/hotel-rooms')
  searchRooms(@Param() data: searchRoomsDto) {
    return this.hotelRoomService.search(data);
  }

  @Get('/common/hotel-rooms/:id')
  findRoom(@Param('id') id: string) {
    return this.hotelRoomService.findById(id);
  }

  @Post('/admin/hotels/')
  addNewHotel(@Body() data: newHotelDto) {
    return this.hotelService.create(data);
  }

  @Get('/admin/hotels/')
  searchHotels(@Param() data: searchHotelsDto) {
    return this.hotelService.search(data);
  }

  @Put('/admin/hotels/:id')
  updateHotel(@Param() data: newHotelDto) {
    return this.hotelService.create(data);
  }

  @Post('/admin/hotel-rooms/')
  @UseInterceptors(FilesInterceptor('files'))
  addNewRoom(
    @Body() body: newRoomDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    const { hotelId, description } = body;
    return this.hotelRoomService.create({
      hotel: hotelId,
      description,
      images: files
    })
  }
}
