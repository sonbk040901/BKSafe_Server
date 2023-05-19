import validator from "validator";
const userValidator = {
  username: async (v?: string) => {
    if (!v) return "Username is required";
    if (!/^[a-zA-Z0-9]+$/.test(v)) return "Username is not valid";
    if (validator.isLength(v, { min: 6, max: 32 }))
      return "Username must be between 6 and 32 characters";
    return false;
  },
  fullname: async (v?: string) => {
    if (!v) return "Fullname is required";
    return false;
  },
  email: async (v?: string) => {
    if (!v) return "Email is required";
    if (!validator.isEmail(v)) return "Email is not valid";
    return false;
  },
  phone: async (v?: string) => {
    if (!v) return "Phone is required";
    if (!validator.isMobilePhone(v, "vi-VN"))
      return "Phone is not valid (ex: 0987654321)";
    return false;
  },
  password: async (v?: string) => {
    if (!v) return "Password is required";
    if (!validator.isLength(v, { min: 6, max: 32 }))
      return "Password must be between 6 and 32 characters";
    return false;
  },
  role: async (v?: string) => {
    if (v && !["admin", "user", "driver"].includes(v))
      return "Role must be admin, user or driver. Default is user";
    return false;
  },
};

export async function validateUser(
  payload: any,
  paths: (keyof typeof userValidator)[]
) {
  for (const path of paths) {
    const error = await userValidator[path](payload[path]);
    if (error) return error;
  }
  return false;
}
