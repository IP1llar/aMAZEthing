import express from 'express';
const router = express.Router();



const { requiresAuth } = require('express-openid-connect');

const users = require('./controllers/user');


// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });






//protected route
router.get('/profile', requiresAuth(), users.getUserData);
router.post('/updateProfile',requiresAuth(), users.updateUsername);
router.post('/updateLearning',requiresAuth(), users.updateLearning)
//update game
//router.post('/updateGame',requiresAuth(), users.updateGameStats)



export {router};