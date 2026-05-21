import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@ApiTags('Regions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('regions')
export class RegionsController {
  constructor(private regionsService: RegionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all regions' })
  findAll() {
    return this.regionsService.findAll();
  }

  @Get('map-markers')
  @ApiOperation({ summary: 'Get region map markers' })
  getMapMarkers() {
    return this.regionsService.getMapMarkers();
  }

  @Get('analytics')
  @ApiOperation({ summary: 'Get region analytics' })
  getAnalytics() {
    return this.regionsService.getAnalytics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get region by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.regionsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create region' })
  create(@Body() dto: CreateRegionDto, @CurrentUser('id') userId: number) {
    return this.regionsService.create(dto, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update region' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRegionDto, @CurrentUser('id') userId: number) {
    return this.regionsService.update(id, dto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete region' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.regionsService.remove(id);
  }
}
