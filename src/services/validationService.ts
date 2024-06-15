// services/validationService.ts
import Joi from 'joi';

/**
 * Joi schema for user registration validation.
 * @type {Object}
 * @property {string} username - The username, must be between 3 and 30 characters
 * @property {string} email - The email address, must be a valid email
 * @property {string} password - The password, must be at least 6 characters
 */
export const userRegisterSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

/**
 * Joi schema for user login validation.
 * @type {Object}
 * @property {string} email - The email address, must be a valid email
 * @property {string} password - The password, must be at least 6 characters
 */
export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
