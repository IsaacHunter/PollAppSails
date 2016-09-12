/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	'index': function (req, res) {
		QuestionService.showIndex(req, res);		
	},


	'voted': function (req, res) {
		QuestionService.showIndex(req, res);		
	},

	'list': function (req, res) {
		res.view('question/list', {message: 'Isaacs List!', layout: null});
	},

	'ask': function (req, res) {
		var map = new Object(); // or var map = {};
		title = "Groomsman"
		map['l'] = 'Landon';
		map['a'] = 'Austin';
		map['r'] = 'Ricky';
		map['b'] = 'Braeden';
		map['p'] = 'Pete';
		map['e'] = 'Evan';
		if (req.param('id') == 'l') {
			title = "Best Man"
		}
		res.view('question/ask', {name: map[req.param('id')], title: title, id: req.param('id')});
	},

	'yes': function (req, res) {
		var map = new Object(); // or var map = {};
		title = "Groomsman"
		map['l'] = 'Landon';
		map['a'] = 'Austin';
		map['r'] = 'Ricky';
		map['b'] = 'Braeden';
		map['p'] = 'Pete';
		map['e'] = 'Evan';
		if (req.param('id') == 'l') {
			title = "Best Man"
		}
		var reply = {
			name: map[req.param('id')],
			response: 'yes'
		};

		Groomsmen.create(reply).exec(function (err, ansChoice) {
			res.view('question/yes', {name: map[req.param('id')], title: title, id: req.param('id')});
		});
	},

	'no': function (req, res) {
		var map = new Object(); // or var map = {};
		title = "Groomsman"
		map['l'] = 'Landon';
		map['a'] = 'Austin';
		map['r'] = 'Ricky';
		map['b'] = 'Braeden';
		map['p'] = 'Pete';
		map['e'] = 'Evan';
		if (req.param('id') == 'l') {
			title = "Best Man"
		}
		res.view('question/no', {name: map[req.param('id')], title: title, id: req.param('id')});
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
				Answer.create({ title: title, question: question.id }).exec(function (err, answer) {
					console.log(answer);
				});
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

