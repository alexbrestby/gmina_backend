/**
 * Interface representing the body of a user request.
 * @interface UserBody
 * @property {string} id - The ID of the user
 * @property {string} username - The username of the user
 * @property {string} email - The email of the user
 * @property {string} password - The password of the user
 * @property {string} first_name - The first name of the user
 * @property {string} role - The role of the user
 * @property {boolean} is_active - The activation status of the user
 * @property {string} activation_link - The activation link for the user
 */
export interface UserBody {
  id: string;
  username: string;
  email: string;
  password: string;
  first_name: string;
  role: string;
  is_active: boolean;
  activation_link: string;
}
