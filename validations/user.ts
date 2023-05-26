import { body } from "express-validator";
export const update = () => [
  body("fullname", "Fullname is empty").optional().trim().notEmpty(),
  body("username", "Username can't contains white space")
    .optional()
    .notEmpty()
    .not()
    .contains(" "),
  body("username", "User name must be alphanumeric")
    .optional()
    .isAlphanumeric(),
  body("username", "Username's length must between 6 and 32").isLength({
    min: 6,
    max: 32,
  }),
  body("avatar", "Avatar is empty").optional().trim().notEmpty(),
];
export const updatePassword = () => [
  body("oldPassword", "Old password is required").notEmpty(),
  body("oldPassword", "Old password cant contains white space")
    .not()
    .contains(" "),
  body("oldPassword", "Old password's length must between 6 and 32").isLength({
    min: 6,
    max: 32,
  }),

  body("newPassword", "New password is required").notEmpty(),
  body("newPassword", "New password cant contains white space")
    .not()
    .contains(" "),
  body("newPassword", "New password's length must between 6 and 32").isLength({
    min: 6,
    max: 32,
  }),
];
