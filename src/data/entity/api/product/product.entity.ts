import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column({ type: 'varchar', length: 32, nullable: false })
  productName: string;

  @Column({ type: 'varchar', length: 32 })
  productDescription: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  productPrice: number;

  @Column({ type: 'integer', nullable: false })
  productQuantity: number;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  creation_date: Date;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  update_date: Date;
}
