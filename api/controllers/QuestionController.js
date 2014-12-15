/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	'index': function (req, res) {
		Question.findOne(2).exec(function (err, question) {
			if (err) return next(err);
			
			Question.findOne(2).populate('answers').exec(function (err, answersObj) {
				res.view({
					question: question,
					answers: answersObj.answers
				});				
			})

		});
	},
	
	'new': function (req, res) {
		res.view({
			user: req.session.User
		});
	},
	
	'create': function (req, res) {
		if (!req.session.User) {
			res.redirect('/');
			return;
		}
		console.log("hello in the create action!");
		console.log(req.param('question').title);
		console.log(req.param('answer').title);
		Question.create({ title: req.param('question').title, user: req.param('question').user }).exec(function (err, question) {
			if (err) {
				console.log(err);
				res.redirect('/');
				return;
			}
			
			req.param('answer').title.forEach( function (title) {
				question.answers.add({ title: title});
			})
			res.redirect('/user/show/' + req.session.User.id);
		});
		
	}
	
};

