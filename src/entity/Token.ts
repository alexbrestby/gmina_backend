import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity('tokens')
export class Token {
  /**
   * Primary key, auto-generated identifier for the token.
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * User ID associated with the token.
   * @type {number}
   */
  @Column()
  userId!: number;

  /**
   * Device ID associated with the token.
   * @type {string}
   * @optional
   */
  @Column({ length: 255, nullable: true })
  deviceId?: string;

  /**
   * Access token.
   * @type {string}
   * @optional
   */
  @Column({ length: 500, nullable: true })
  accessToken?: string;

  /**
   * Refresh token.
   * @type {string}
   * @optional
   */
  @Column({ length: 500, nullable: true })
  refreshToken?: string;

  /**
   * User associated with the token.
   * @type {User}
   */
  @ManyToOne(() => User, user => user.tokens)
  user!: User;
}
