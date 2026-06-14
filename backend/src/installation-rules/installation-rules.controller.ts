import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { InstallationRulesService } from './installation-rules.service';
import { CreateInstallationRuleDto } from './dto/create-installation-rule.dto';
import { UpdateInstallationRuleDto } from './dto/update-installation-rule.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@ApiTags('Installation Rules')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('installation-rules')
export class InstallationRulesController {
  constructor(private installationRulesService: InstallationRulesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all installation rules' })
  findAll() {
    return this.installationRulesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create installation rule' })
  create(@Body() dto: CreateInstallationRuleDto, @CurrentUser('id') userId: number) {
    return this.installationRulesService.create(dto, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update installation rule' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateInstallationRuleDto, @CurrentUser('id') userId: number) {
    return this.installationRulesService.update(id, dto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete installation rule' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.installationRulesService.remove(id);
  }
}
