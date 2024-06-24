// products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/data/entity/api/product/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from 'src/data/interface/api/product/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<IProduct[]> {
    return this.productRepository.find();
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

  async create(createProductDto: CreateProductDto): Promise<IProduct> {
    const newProduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
  }

  async update(productId: string, updateProductDto: UpdateProductDto) {
    const partialProduct: Partial<Product> = { ...updateProductDto };

    await this.productRepository.update(productId, partialProduct);

    return this.productRepository.findOne({ where: { productId } });
  }

  async delete(productId: string) {
    const product = await this.findOne(productId);
    await this.productRepository.remove(product);
    return `${productId} deleted`;
  }
}
