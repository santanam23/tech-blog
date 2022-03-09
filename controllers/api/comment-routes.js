const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Comment Get Route
router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// Get all comments with auth id
router.get('/:id', (req, res) => {
  Comment.findAll({
          where: {
              id: req.params.id
          }
      })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      })
});
//Comment Post Route
router.post('/', withAuth, (req, res) => {
  // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
  Comment.create({
    content: req.body.content,
    user_id: req.session.user_id,
    post_id: req.body.post_id
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});
router.put('/:id', withAuth, (req, res) => {
  Comment.update({
      content: req.body.content
  }, {
      where: {
          id: req.params.id
      }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
          res.status(404).json({ message: 'No comment found with this id' });
          return;
      }
      res.json(dbCommentData);
  }).catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});
//Comment Delete Route
router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
