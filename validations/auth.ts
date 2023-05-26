import { body } from "express-validator";
export const login = () => [
  body("email", "Email is required").notEmpty(),
  body("email").isEmail(),
  body("password", "Password is required").notEmpty(),
  body("password", "Password cant contains white space").not().contains(" "),
  body("password", "Password's length must between 6 and 32").isLength({
    min: 6,
    max: 32,
  }),
];

export const signup = () => [
  body("username", "username is required").notEmpty(),
  body("username", "User name must be alphanumeric").isAlphanumeric(),
  body("username", "Username can't contains white space").not().contains(" "),
  body("username", "Username's length must between 6 and 32").isLength({
    min: 6,
    max: 32,
  }),
  body("password", "Password is required").notEmpty(),
  body("password", "Password cant contains white space").not().contains(" "),
  body("password", "Password's length must between 6 and 32").isLength({
    min: 6,
    max: 32,
  }),
  body("email", "Email is required").notEmpty(),
  body("email").isEmail(),
  body("fullname", "Fullname is required").trim().notEmpty(),
  body("phone", "Phone is required").notEmpty(),
  body("phone").isMobilePhone("vi-VN"),
  body("role", "Role is invalid, must be in [admin, user, driver]")
    .default("user")
    .isIn(["admin", "user", "driver"]),
];
