const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const dashboardRoutes = require('./dashboard-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
