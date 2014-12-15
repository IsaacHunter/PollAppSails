/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
	
	User.create({email:"email@email.com", password:"password"}).exec(function (err, user) {
		Question.create({user: user.id, title:"Is Austin the coolest city ever?"}).exec(function (err, question) {
			Answer.create({question: question.id, title:"YEEAAHH"}).exec(function (err, answer) {
				Answer.create({question: question.id, title:"Hella no! San Francisco rules!"}).exec(function (err, answer) {					
					cb();
				})
			})
		})
	})
};
