const { Post } = require('../models');

const postData = [
  {
    title: 'Object Oriented Mapping.',
    content: 'I love ORMs. They help simplify SQL',
    user_id: 3
  },
  {
    title: 'What is MVC in programming?',
    content: 'MVC (Model-View-Controller) is a pattern in software design commonly used to implement user interfaces, data, and controlling logic.',
    user_id: 2
  },
  {
    title: 'CRUD operations in SQL Server',
    content: 'https://www.sqlshack.com/crud-operations-in-sql-server/',
    user_id: 1
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;