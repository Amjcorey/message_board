const router = require('express').Router();
const { User, topic } = require('../models');
const withAuth = require('../utils/auth');

// GET all topics for homepage
router.get('/', async (req, res) => {
  try {
    const topicData = await topic.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const topic = topicData.map((topic) => topic.get({ plain: true }));

    res.render('homepage', {
      topic,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one Topic
router.get('/topic/:id', async (req, res) => {
  try {
    const topicData = await topic.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const post = topicData.get({ plain: true });

    res.render('topic', {
      ...topic,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: topic, include: [{model: Comment}] }],
    });

    const user = userData.get({ plain: true });
    console.log(user);

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// If the user is already logged in, redirect the request to another route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/', (req, res) => {
  res.render('homepage');
});

module.exports = router;