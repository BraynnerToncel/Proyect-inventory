import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ type: 'varchar', length: 24, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  userPassword: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  role: string;
}
