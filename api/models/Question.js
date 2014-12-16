/**
* Question.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	
	connection: 'someMysqlServer',

  schema: true,

  attributes: {

  	title: {
  		type: 'string',
  		required: true
  	},
		
		user: {
			model: 'user',
			required: true
		},
		
		answers: {
			collection: 'answer',
			via: 'question'
		},
		
		ips: {
			collection: 'QuestionIp',
			via: 'question'
		},
		
	},
	
	answerChoicesIps: function (id, Obj) {
		Obj.ips = [];
		Question.find(id).populate('answers').exec( function (err, answersObj) {
			answersObj[0].answers.forEach( function (answer) {
				Answer.ips(answer.id, Obj);
			});
		});
	},
};

