/**
 * AnswerChoiceController
 *
 * @description :: Server-side logic for managing answerchoices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	'create': function (req, res) {
		var ipVoter = req.connection.remoteAddress;
		var answerId = req.param('answerId')
		var params = {
			answer: answerId,
			ip: ipVoter
		};
		
		AnswerChoice.find({ ip: ipVoter }).exec(function (err, ansChoices) {
			console.log(ansChoices);
			if ( ansChoices.all(function (ansChoice) { return ansChoice.answer != answerId }) ) {
				AnswerChoice.create(params).exec(function (err, ansChoice) {
					if (err) {
						console.log(err);
						res.redirect('/');
						return
					}
			
					console.log("Vote accepted");
					res.redirect('/');
					return;
				});				
			} else {
				console.log('Not accepted!');
				res.redirect('/');
				return
			}
		});
		
	}
	
};

