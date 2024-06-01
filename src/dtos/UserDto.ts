import { User } from "../entity/User";

export class UserDto {
  id;
  email;
  username;
  is_active;

  constructor(model: User) {
    this.id = model.id;
    this.email = model.email;
    this.username = model.username;
    this.is_active = model.is_active;
  }
}

