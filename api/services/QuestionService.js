var get_ip = require('ipware')().get_ip;

module.exports = {
	showIndex: function (req, res) {
		var userIp = get_ip(req).clientIp;
		
		function renderQuestion (err, questions) {
			var num_questions = questions.length;
			var randomIndex = parseInt((Math.random() * questions.length) + 1);
		
			Question.findOne(randomIndex).exec(function (err, question) {
				if (err) return next(err);
							
				Question.findOne(randomIndex).populate('answers').exec(function (err, answersObj) {
					res.view({
						question: question,
						answers: answersObj.answers
					});				
				})
			});
		}
		
		QuestionIp.find({ ip: userIp }).exec( function (err, questionIps) {
			var respondedIds = [];
			// questionIps.forEach( function (questionIp) {
			// 	respondedIds.push(questionIp.question);
			// });
			Question.find().exec(function (err, questions) {
			var num_questions = questions.length;
			var randomIndex = parseInt((Math.random() * questions.length) + 1);
			
			//while (respondedIds.some(function (id) { return id == randomIndex })) {
			//	if (num_questions === respondedIds.length) {
				console.log(req.cookies);
				if (req.cookies.voted === "w" + sails.config.gt.week) {
					res.view({
						question: {},
						answers: {}
					});
					return;
				}
				//randomIndex = parseInt((Math.random() * questions.length) + 1);
			//}
		
			Question.findOne(randomIndex).exec(function (err, question) {
				if (err) return next(err);
							
				Question.findOne(randomIndex).populate('answers').exec(function (err, answersObj) {
					res.view({
						question: question,
						answers: answersObj.answers
					});				
				})
			});
		});			
		});
		
	}
};
