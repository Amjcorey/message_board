const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
  try {
      const postData = await Post.findAll({
          include: [{ model: Comment }],
      });
      res.status(200).json(postData);
  } catch (err) {
      res.status(500).json(err);
  }
});

// get one post

router.get('/:id', async (req, res) => {
  try {
      const postData = await Post.findByPk(req.params.id, {
          include: [{ model: Comment }],
      });

      if (!postData) {
          res.status(404).json({ message: 'No post found with this id!' });
          return;
      }

      res.status(200).json(postData);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
      const newPost = await Post.create({
          ...req.body,
          user_id: req.session.user_id,
      });
      res.status(200).json(newPost);
  } catch (err) {
      res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
      const postData = await Post.destroy({
          where: {
              id: req.params.id,
              user_id: req.session.user_id,
          },
      });

      if (!postData) {
          res.status(404).json({ message: 'No post found with this id!' });
          return;
      }

      res.status(200).json(postData);
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;