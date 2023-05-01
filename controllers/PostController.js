import PostModel from '../models/Post.js';

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      ...req.body,
      user: req.userId
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать статью'
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи'
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOneAndUpdate(
      {
        _id: postId
      },
      {
        $inc: { viewsCount: 1 }
      },
      {
        returnDocument: 'after'
      }
    )
      .populate('user')
      .exec();

    if (!post) {
      return res.status(404).json({
        message: 'Статья не найдена'
      });
    }

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статью'
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOneAndDelete({
      _id: postId
    });

    if (!post) {
      console.log(err);
      res.status(500).json({
        message: 'Статья не найдена'
      });
    }

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить статью'
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOneAndUpdate(
      {
        _id: postId
      },
      {
        ...req.body,
        user: req.userId
      }
    );

    if (!post) {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось обновить статью'
      });
    }
    res.json({
      success: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить статью'
    });
  }
};
