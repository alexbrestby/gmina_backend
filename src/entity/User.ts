import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Token } from './Token';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, unique: false })
  username!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  first_name?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  last_name?: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth?: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone_number?: string;

  @Column({ type: 'boolean', default: false })
  is_active!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  last_login?: Date;

  @Column({ type: 'varchar', length: 50, default: 'user' })
  role!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profile_picture_url?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  activation_link?: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  @OneToMany(() => Token, token => token.user)
  tokens!: Token[];
}
