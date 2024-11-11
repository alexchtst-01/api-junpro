import userModel from "../model/usermodel.js";

export const Login = async (req, res) => {
  try {
    const user = await userModel.findOne({
      where: {
        username: req.body.username,
      },
    });
    // console.log(user.userId);
    if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });
    // ga usah ada hash hash
    const pwd = user.password;
    const match = pwd === req.body.password;
    if (!match) return res.status(400).json({ msg: "password salah" });
    const id = user.id;
    const uuid = user.userId;
    const role = user.role;
    const username = user.username;
    req.session.userId = user.userId;
    console.log(user.userId);
    return res.status(200).json({ id, uuid, username, role });
    // return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: `terjadi error ${error}` });
  }
};

export const Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res.status(400).json({ msg: "terjadi kesalahan saat logout" });
    res.status(200).json({ msg: "anda berhasil logout" });
  });
};
