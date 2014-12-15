/**
 * AnswerChoiceController
 *
 * @description :: Server-side logic for managing answerchoices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	'create': function (req, res) {
		AnswerChoice.create({answer: req.param('answerId')}).exec(function (err, ansChoice) {
			if (err) {
				console.log(err);
				res.redirect('/');
				return
			}
			
			console.log("Vote accepted");
			res.redirect('/');
			return;
		})
	}
	
};

