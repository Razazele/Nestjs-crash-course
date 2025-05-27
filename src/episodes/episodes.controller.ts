import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('episodes')
export class EpisodesController {
  @Get()
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    console.log(sort);
    return 'All episodes';
  }

  @Get('featured')
  findFeatured() {
    return 'Featured Episodes';
  }
  @Get(':id')
  findOne(@Param() id: string) {
    console.log(id);
    return 'new Episode';
  }

  @Post()
  create(@Body() input: any) {
    console.log(input);
    return 'New Episode';
  }

  @Put(':id')
  update(@Param('id') id: 'string', @Body() fields: any) {
    console.log(fields);
    return 'Editado';
  }
  @Delete(':id')
  remove(@Param('id') id: 'string') {
    return `Elminado episode ${id}`;
  }
}
