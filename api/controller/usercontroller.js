import userModel from "../model/usermodel.js";

export const postUser = async (req, res) => {
  const data = req.body;
  try {
    const existuser = await userModel.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (existuser)
      return res.status(200).json({ mg: "maaf username sudah ada" });
    const usercreated = await userModel.create(data);
    res.status(200).json(usercreated);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await userModel.findAll({
      attributes: ["userId", "username", "role"],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const getUserbyUUID = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await userModel.findOne({
      where: { userId: uuid },
      attributes: ["userId", "username", "role"],
    });
    if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};


export const editUser = async (req, res) => {};

export const deleteUser = async (req, res) => {};
