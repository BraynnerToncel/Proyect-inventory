import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from 'src/data/interface/api/product/product.interface';
import { Roles } from 'src/data/decorator/role-decorator/role.decorator';
import { Role } from 'src/data/constants/roles-constants/roles.constants';
import { AuthGuard } from 'src/data/guards/auth/auth.guard';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('list')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  async findAll(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.productsService.findAll(limit, offset);
  }

  @Get('id/:id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get('name/:name')
  async findOneByName(@Param('name') name: string) {
    return this.productsService.findOneByName(name);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<IProduct> {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<IProduct> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
