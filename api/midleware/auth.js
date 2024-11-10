import userModel from "../model/usermodel.js";

export const verifyRole = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(404).json({ msg: "anda belom login" });
  }

  const user = await userModel.findOne({
    where: {
      userId: req.session.userId,
    },
  });

  if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });
  req.userId = user.userId;
  req.role = user.role;
  next();
};

export const adminOnly = async (req, res, next) => {
  const user = await userModel.findOne({
    where: {
      userId: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (user.role !== "admin")
    return res.status(403).json({ msg: "Akses terlarang" });
  next();
};
