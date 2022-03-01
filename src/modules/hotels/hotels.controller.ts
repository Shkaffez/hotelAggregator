import {
  Body, Controller, Get, Param, Post, Put, Query,
  UploadedFiles, UseGuards, UseInterceptors, Request
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { editFileName } from 'src/utils/file-uploading.utils';
import { imageFileFilter } from 'src/utils/imageFileFilter';
import { Role } from 'src/utils/role.enum';
import { Roles } from 'src/utils/roles.decorator';
import { newHotelDto } from './dto/newHotel.Dto';
import { newRoomDto } from './dto/newRoom.Dto';
import { searchHotelsDto } from './dto/searchHotels.Dto';
import { searchRoomsDto } from './dto/searchRooms.Dto';
import { updateRoomDto } from './dto/updateRoom.Dto';
import { HotelRoomsService } from './hotel.rooms.service';
import { HotelsService } from './hotels.service';

@Controller()
export class HotelsController {
  constructor(
    private readonly hotelService: HotelsService,
    private readonly hotelRoomService: HotelRoomsService
  ) { }

  @Get('/common/hotel-rooms')
  searchRooms(@Query() data: searchRoomsDto) {
    return this.hotelRoomService.search(data);
  }

  @Get('/common/hotel-rooms/:id')
  findRoom(@Param('id') id: string) {
    return this.hotelRoomService.findById(id);
  }

  @Post('/admin/hotels/')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  addNewHotel(@Body() data: newHotelDto) {
    return this.hotelService.create(data);
  }

  @Get('/admin/hotels/')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  searchHotels(@Query() data: searchHotelsDto) {
    return this.hotelService.search(data);
  }

  @Put('/admin/hotels/:id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  updateHotel(@Param('id') id, @Body() data: newHotelDto) {
    return this.hotelService.update(id, data);
  }

  @Post('/admin/hotel-rooms/')
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage: diskStorage({
      destination: './files',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }))
  addNewRoom(
    @Body() body: newRoomDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    const { title, hotelId, description } = body;
    let images = [];
    files.forEach(file => images.push(file.filename));
    return this.hotelRoomService.create({
      title,
      hotel: hotelId,
      description,
      images: images
    })
  }

  @Put('/admin/hotel-rooms/:id')
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage: diskStorage({
      destination: './files',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }))
  updateRoom(
    @Body() body: updateRoomDto,
    @Param('id') id,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    const { title, hotelId, description, imageFiles, isEnabled } = body;
    let images = [];
    files.forEach(file => images.push(file.filename));
    if (imageFiles.length > 0) {
      imageFiles.forEach(file => images.push(file));
    }
    return this.hotelRoomService.update(id, {
      title,
      hotel: hotelId,
      description,
      isEnabled,
      images: images
    });
  }
}
