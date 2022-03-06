const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Signup Route
router.post('/signup', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
User.create({
  username: req.body.username,
  email: req.body.email,
  password: req.body.password
})
  .then((newUser) => {
    res.json(newUser);
    res.send('ok');
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Loggin Route
router.post('/login', withAuth, (req, res) => {
  console.log(req.body);
try {
  const userVerify = await.User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (userVerify.length === 0) {
    res.status(400).json({ message: "Incorrect email address or password"});
    return;
  }
  const correctPassword = await userVerify.verifyPassword(req.body.password);
if (!correctPassword) {
  res.status(400).json({ message: " Incorrect email or password!"});
}

  req.session.save(() => {
    req.session.user_id = userVerify.id;
    req.session.logged_in = true;
    console.log('Logged In!');
    res.json({ user: userVerify, message: "Logged In" });
  });
} catch(err) {
  res.status(400).json(err);
}
});

//Logged Out Route
router.post('logout', withAuth, (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(400).end;
    });
  } else {
    res.status(404).end();
  }
});
// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));

      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });

      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});
module.exports = router;