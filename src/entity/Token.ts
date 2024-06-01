import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column({ length: 255, nullable: true })
  deviceId!: string;

  @Column({ length: 500, nullable: true })
  accessToken!: string;

  @Column({ length: 500, nullable: true })
  refreshToken!: string;

  @ManyToOne(() => User, user => user.tokens)
  user!: User;
}

