import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Token } from './Token';

@Entity('users')
export class User {
  /**
   * Primary key, auto-generated identifier for the user.
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Username of the user.
   * @type {string}
   */
  @Column({ type: 'varchar', length: 50, unique: false })
  username!: string;

  /**
   * Password of the user.
   * @type {string}
   */
  @Column({ type: 'varchar', length: 255 })
  password!: string;

  /**
   * Email address of the user.
   * @type {string}
   */
  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  /**
   * First name of the user.
   * @type {string}
   * @optional
   */
  @Column({ type: 'varchar', length: 100, nullable: true })
  first_name?: string;

  /**
   * Last name of the user.
   * @type {string}
   * @optional
   */
  @Column({ type: 'varchar', length: 100, nullable: true })
  last_name?: string;

  /**
   * Date of birth of the user.
   * @type {string}
   * @optional
   */
  @Column({ type: 'date', nullable: true })
  date_of_birth?: string;

  /**
   * Phone number of the user.
   * @type {string}
   * @optional
   */
  @Column({ type: 'varchar', length: 15, nullable: true })
  phone_number?: string;

  /**
   * Activation status of the user.
   * @type {boolean}
   */
  @Column({ type: 'boolean', default: false })
  is_active!: boolean;

  /**
   * Last login timestamp of the user.
   * @type {Date}
   * @optional
   */
  @Column({ type: 'timestamp', nullable: true })
  last_login?: Date;

  /**
   * Role of the user (e.g., user, admin).
   * @type {string}
   */
  @Column({ type: 'varchar', length: 50, default: 'user' })
  role!: string;

  /**
   * URL of the user's profile picture.
   * @type {string}
   * @optional
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  profile_picture_url?: string;

  /**
   * Activation link for the user's account.
   * @type {string}
   * @optional
   */
  @Column({ type: 'varchar', length: 500, nullable: true })
  activation_link?: string;

  /**
   * Timestamp when the user record was created.
   * @type {Date}
   */
  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  /**
   * Timestamp when the user record was last updated.
   * @type {Date}
   */
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  /**
   * Tokens associated with the user.
   * @type {Token[]}
   */
  @OneToMany(() => Token, token => token.user)
  tokens!: Token[];
}
