export class CreateProductDto {}
import {
  IsString,
  MinLength,
  MaxLength,
  IsDecimal,
  Min,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(24)
  productName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(24)
  productDescription?: string;

  @IsDecimal(
    { decimal_digits: '2', force_decimal: true },
    {
      message: 'Product price must be a decimal number with two decimal places',
    },
  )
  @Min(0, { message: 'Product price must be positive' })
  productPrice: number;

  @IsNumber({}, { message: 'Product quantity must be a number' })
  @Min(0, { message: 'Product quantity must be positive' })
  productQuantity: number;
}
