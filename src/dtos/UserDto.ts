import { User } from "../entity/User";

export class UserDto {
  id: number;
  email: string;
  username: string;
  is_active: boolean;
  role: string;

  /**
   * Create a User Data Transfer Object (DTO)
   * @param {User} model - The user model
   */
  constructor(model: User) {
    /**
     * @type {number}
     */
    this.id = model.id;

    /**
     * @type {string}
     */
    this.email = model.email;

    /**
     * @type {string}
     */
    this.username = model.username;

    /**
     * @type {boolean}
     */
    this.is_active = model.is_active;

    /**
     * @type {string}
     */
    this.role = model.role;
  }
}
