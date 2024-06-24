// products.service.ts
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
  async update(productId: string, updateProductDto: UpdateProductDto) {
    const partialProduct: Partial<Product> = { ...updateProductDto };

    // Validar que productPrice y productQuantity sean mayores o iguales a cero
    if (updateProductDto.productPrice < 0) {
      throw new Error('Product price must be positive');
    }
    if (updateProductDto.productQuantity < 0) {
      throw new Error('Product quantity must be positive');
    }

    await this.productRepository.update(productId, partialProduct);
    return this.productRepository.findOne({ where: { productId } });
  }

  async delete(productId: string) {
    const product = await this.findOne(productId);
    await this.productRepository.remove(product);
    return `${productId} deleted`;
  }
}
