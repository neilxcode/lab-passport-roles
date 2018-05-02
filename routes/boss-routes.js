const express     = require("express");
const router      = express.Router();
const passport    = require("passport");
const User        = require("../models/user");
const Boss        = require("../models/boss");


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {

    res.redirect('/login')
  }
}


router.get('/boss/new', (req, res, next) => {
  res.render('boss/new')
});


router.post('/boss/create', ensureAuthenticated, (req, res, next) => {
  const newBoss = new Boss ({
    name:  req.body.bossName,
    pass:  req.body.bossPass,
    // owner: req.user._id   // <-- we add the user ID
  });

  newBoss.save ((err) => {
    if (err) { return next(err); }
    else {
      res.redirect('/boss');
    }
  })
});


router.get('/boss', ensureAuthenticated, (req, res, next) => {

  Boss.find({owner: req.user._id}, (err, myRooms) => {
    if (err) { return next(err); }
    else{ 
      res.render('boss/index');
    }
  });

});




module.exports = router;