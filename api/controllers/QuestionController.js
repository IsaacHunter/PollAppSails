/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	'index': function (req, res) {
		Question.findOne(1).exec(function (err, question) {
			if (err) return next(err);
			
			Question.findOne(1).populate('answers').exec(function (err, answersObj) {
				res.view({
					question: question,
					answers: answersObj.answers
				});				
			})

		});
	}
	
};

