import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { SearchAddress } from './dto/search-address.dto';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.create(createHotelDto);
  }

  @Get()
  findAll() {
    return this.hotelsService.findAll();
  }

  @Get('/address/:p_addr_line')
  address(@Param('p_addr_line') searchAddress: SearchAddress) {
    return this.hotelsService.address(searchAddress);
  }

  @Get('/pagination/:offset/')
  getUsersPagination(@Param('offset', ParseIntPipe) offset: number) {
    return this.hotelsService.getHotelsPagination(offset);
  }

  @Post('/create-address')
  createAddress(@Body() newAddress) {
    return this.hotelsService.createAddres(newAddress);
  }

  @Get('/pagination/:offset/:hotelname')
  getUsersPaginationByHotelName(
    @Param('offset', ParseIntPipe) offset: number,
    @Param('hotelname') hotelname: string,
  ) {
    return this.hotelsService.getHotelsPagination(offset, hotelname);
  }

  @Get('/provinces')
  findProv() {
    return this.hotelsService.getProvinces();
  }

  @Get('/location/:provid')
  getLocationCity(@Param('provid') provId: number) {
    return this.hotelsService.getCityandDistrict(provId);
  }

  @Get('/location/:provid/:cityid')
  getLocationCityDistrict(
    @Param('provid') provId: number,
    @Param('cityid') cityId: number,
  ) {
    return this.hotelsService.getCityandDistrict(provId, cityId);
  }

  @Get('addressinfo/:addr_id')
  getAddressInfo(@Param('addr_id', ParseIntPipe) addr_id: number) {
    return this.hotelsService.addressInfo(addr_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    console.log(updateHotelDto);
    return this.hotelsService.update(+id, updateHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelsService.remove(+id);
  }
}
