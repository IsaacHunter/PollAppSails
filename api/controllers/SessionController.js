/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcrypt');

module.exports = {
	
  'create': function(req, res) {
    if (!req.param('email') || !req.param('password')) {
      var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message: 'You must enter both a username and password.'}];
			console.log("usernamePasswordRequiredError");
      res.redirect('/');
      return;
    }

    User.findOneByEmail(req.param('email')).exec(function(err, user) {
      if (err) return next(err);

      if (!user) {
				console.log('Not user with this email');
        res.redirect('/');
        return;
      }

      bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
        if (err) return next(err);

        if (!valid) {
					console.log('password not valid');
          res.redirect('/');
          return;
        }

        req.session.authenticated = true;
        req.session.User = user;

        user.save(function(err, user) {
          if (err) return next(err);

          res.redirect('/user/show/' + user.id);
        });
      });
    });
  },

  destroy: function(req, res, next) {
		console.log("in the destroy action");
    req.session.destroy();
		console.log(req.session)
    res.redirect('/');
	}
};

