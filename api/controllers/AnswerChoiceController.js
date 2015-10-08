/**
 * AnswerChoiceController
 *
 * @description :: Server-side logic for managing answerchoices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 var get_ip = require('ipware')().get_ip;

module.exports = {
	
	'create': function (req, res) {
		var ipVoter  = get_ip(req).clientIp;
		var answerId = req.param('answerId');
		var paramsAnsChoice = {
			answer: answerId,
			ip: ipVoter
		};
		
		Answer.findOne(answerId).populate('question').exec( function (err, questionObj) {
			if (err) {
				console.log(err);
				res.redirect('/');
				return
			}
			var questionId = questionObj.question.id
			
			var paramsQuIp = {
				question: questionId,
				ip: ipVoter
			};
			
			QuestionIp.find({ ip: ipVoter }).exec(function (err, questionIps) {
				
				var responded = questionIps.some(function (questionIp) {
					return questionIp.question === questionId;
				});
			
				if (responded) {
					console.log("Vote NOT accepted");
					res.redirect('/');
				} else {
					QuestionIp.create(paramsQuIp).exec(function (err, questionIp) {
						AnswerChoice.create(paramsAnsChoice).exec(function (err, ansChoice) {
							console.log('Vote accepted');
							res.redirect('/voted');
						})
					});
				}
			});
		});
	}
	
};

