import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/data/entity/api/product/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { IProduct } from 'src/data/interface/api/product/product.interface';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(limit?: number, offset?: number): Promise<IProduct[]> {
    const query = this.productRepository.createQueryBuilder('product');

    if (limit) {
      query.limit(limit);
    }

    if (offset) {
      query.offset(offset);
    }

    return query.getMany();
  }

  async findOne(productId: string): Promise<IProduct> {
    const product = await this.productRepository.findOne({
      where: { productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findOneByName(productName: string): Promise<IProduct> {
    const product = await this.productRepository.findOne({
      where: { productName },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<IProduct> {
    const { productPrice, productQuantity } = createProductDto;

    if (productPrice < 0) {
      throw new Error('Product price must be positive');
    }
    if (productQuantity < 0) {
      throw new Error('Product quantity must be positive');
    }

    const newProduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
  }

  async update(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<IProduct> {
    const partialProduct: Partial<Product> = { ...updateProductDto };

    if (updateProductDto.productPrice < 0) {
      throw new Error('Product price must be positive');
    }
    if (updateProductDto.productQuantity < 0) {
      throw new Error('Product quantity must be positive');
    }

    await this.productRepository.update(productId, partialProduct);
    return this.productRepository.findOne({ where: { productId } });
  }

  async delete(productId: string): Promise<string> {
    const product = await this.findOne(productId);
    await this.productRepository.remove(product);
    return `${productId} deleted`;
  }
}
