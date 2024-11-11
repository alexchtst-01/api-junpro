import userModel from "../model/usermodel.js";
import postModel from "../model/postmodel.js";

export const getPost = async (req, res) => {
  try {
    if (req.role === "admin") {
      const post = await postModel.findAll({
        attributes: ["postId", "title", "content", "userId"],
        include: [
          {
            model: userModel,
            attributes: ["userId", "username"],
          },
        ],
      });
      res.status(200).json(post);
    } else {
      const post = await postModel.findAll({
        attributes: ["postId", "title", "content", "userId"],
        include: [
          {
            model: userModel,
            attributes: ["userId", "username"],
          },
        ],
      });
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({ msg: `terjadi error ${error}` });
  }
};

export const postPost = async (req, res) => {
  try {
    console.log(req.userId);
    const { title, content } = req.body;
    await postModel.create({
      title: title,
      content: content,
      userId: req.userId,
    });
    res.status(200).json({ msg: "postingan berhasil dibuat" });
  } catch (error) {
    res.status(500).json({ msg: `terjadi error ${error}` });
  }
};

export const editPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const postexist = await postModel.findOne({
      postId: req.params.uuid,
    });
    if (!postexist)
      return res.status(404).json({ msg: "postingan tidak ditemukan" });
    if (req.role === "admin") {
      await postModel.update(
        { title, content },
        {
          where: {
            postId: postexist.postId,
          },
        }
      );
      return res.status(200).json({ msg: "postingan berhasil di update" });
    } else {
      if (req.userId !== postexist.userId)
        return res.status(403).json({
          msg: "anda tidak boleh mengakses yang bukan postingan anda",
        });
      await postModel.update(
        { title, content },
        {
          where: {
            [Op.and]: [{ postId: postexist.postId }, { userId: req.userId }],
          },
        }
      );
      return res.status(200).json({ msg: "postingan berhasil di update" });
    }
  } catch (error) {
    res.status(500).json({ msg: `terjadi error ${error}` });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postexist = await postModel.findOne({
      postId: req.params.uuid,
    });
    if (req.role === "admin") {
      await postModel.destroy({
        where: {
          postId: postexist.postId,
        },
      });
      return res.status(200).json({ msg: "psotingan berhasil dihapus" });
    } else {
      if (postexist.userId !== req.userId) {
        return res.status(403).json({ msg: "tidak memiliki akses" });
      }
      await postModel.destroy({
        where: {
          postId: postexist.postId,
        },
      });
      res.status(200).json({ msg: "postingan berhasil dihapus" });
    }
  } catch (error) {
    res.status(500).json({ msg: `terjadi error ${error}` });
  }
};
