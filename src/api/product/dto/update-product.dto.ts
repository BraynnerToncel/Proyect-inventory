import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {
  IsDecimal,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @MinLength(3)
  @MaxLength(24)
  productName?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(24)
  productDescription?: string;

  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  @Min(0)
  productPrice?: number;

  @IsNumber({}, { message: 'Product quantity must be a number' })
  @Min(0, { message: 'Product quantity must be positive' })
  productQuantity?: number;
}
