const router = require('express').Router();
// Import the Project model from the models folder
const { Post } = require('../../models');

// If a POST request is made to /api/projects, a new project is created. If there is an error, the function returns with a 400 error. 
router.post('/', async (req, res) => {
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


router.get('/:id', async (req, res) => {
  try {

    const topictData = await Topic.get({

      
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!PostData) {
      res.status(404).json({ message: 'No Topic found with this id!' });
      return;
    }

    res.status(200).json(PostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
