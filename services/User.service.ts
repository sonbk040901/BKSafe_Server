import User, { IUser, UserDocument } from "../models/User.model";
const userService = {
  async login({ email, password }: { email: string; password: string }) {
    const user = await User.findOne({ email });
    if (!user) throw "Email not found";
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw "Password is incorrect";
    return user;
  },
  async create(body: IUser) {
    // const { username, fullname, email, phone, avatar, role, password } = body;
    const isTakenInfo = await userService.checkTakenInfo(body);
    if (isTakenInfo) throw "Email or phone is taken";
    const user = new User(body);
    await user.saveWithHashedPassword();
    return user;
  },
  async genToken(user: UserDocument, expiresIn?: string) {
    const token = await user.genToken(expiresIn);
    return token;
  },
  async findById(id: string) {
    const user = await User.findById(id);
    if (!user) {
      throw "User not found";
    }
    return user;
  },
  async update(id: string, update: IUser) {
    const { fullname, username, avatar } = update;
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        fullname,
        username,
        avatar,
      },
      { new: true }
    );
    if (!user) throw "User not found";
    return user;
  },
  async updatePassword(id: string, oldPassword: string, newPassword: string) {
    if (oldPassword === newPassword) throw "New password must be different";
    const user = await User.findById(id);
    if (!user) throw "User not found";
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) throw "Old password is incorrect";
    user.password = newPassword;
    await user.saveWithHashedPassword();
    return user;
  },
  async checkTakenInfo(info: { email: string; phone: string }) {
    const isTakenInfo = await User.isTakenInfo(info);
    return isTakenInfo;
  },
};
export default userService;
