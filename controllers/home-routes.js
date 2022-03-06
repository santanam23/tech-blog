const router = require('express').Router();
const { Post, User, Comment } = require('../models');

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
router.post('/login', (req, res) => {
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
router.post('logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(400).end;
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;