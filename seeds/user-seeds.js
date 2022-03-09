const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = [
  {
    username: 'oprahwinfrey',
    email: 'oprahwinfrey@gmail.com',
    password: 'password123'
  },
  {
    username: 'willsmith',
    email: 'willsmith@gmail.com',
    password: 'password123'
  },
  {
    username: 'barackobama',
    email: 'barackobama@gmail.com',
    password: 'password123'
  },
  {
    username: 'jenniferlopez',
    email: 'jenniferlopez@gmail.com',
    password: 'password123'
  },
  {
    username: 'tomhanks',
    email: 'tomhanks@gmail.com',
    password: 'password123'
  },
  {
    username: 'selenagomez',
    email: 'selenagomez@gmail.com',
    password: 'password123'
  },
  {
    username: 'amywinehouse',
    email: 'amywinehouse@gmail.com',
    password: 'password123'
  },
  {
    username: 'emmawatson',
    email: 'emmawatson@gmail.com',
    password: 'password123'
  },
  {
    username: 'britneyspears',
    email: 'britneyspears@gmail.com',
    password: 'password123'
  },
  {
    username: 'bobdylan',
    email: 'bobdylan@gmail.com',
    password: 'password123'
  }
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;