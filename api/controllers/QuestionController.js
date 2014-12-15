/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	'index': function (req, res) {
		var randomIndex = (Math.random() * 10) + 1
		
		Question.findOne(1).exec(function (err, question) {
			if (err) return next(err);
			
			Question.findOne(1).populate('answers').exec(function (err, answersObj) {
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
		
	},
	
  show: function(req, res, next) {
    Question.findOne(req.param('id'), function (err, question) {
      if (err) return next(err);

			Question.findOne(req.param('id')).populate('answers').exec(function(err, answersObj) {
				if (err) {
					console.log(err);
					return;
				}
				
				var answers = answersObj.answers;
				answers.map(function (answer) {
					Answer.result(answer.id, answer);
				});
				
				setTimeout( function () {
		      res.view({
		        question: question,
						answers: answers
		      });					
				}, 500);
			})

    });
  },
	
};

