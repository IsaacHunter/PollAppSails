/**
* Answer.js
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
		
		question: {
			model: 'question',
			required: true
		},
		
		answerChoices: {
			collection: 'answerChoice',
			via: 'answer'
		},
		
	},
	
	result: function (id, obj) {
		Answer.find(id).populate('answerChoices').exec(function (err, ansChoicesObj) {
			obj.result = ansChoicesObj[0].answerChoices.length;
		});
	},
	
	ips: function (id, Obj) {
		var ips = [];
		Answer.find(id).populate('answerChoices').exec(function (err, ansChoicesObj) {
			ansChoicesObj[0].answerChoices.forEach( function (answerChoice) {
				ips.push(answerChoice.ip);
			});
			Obj.ips = Obj.ips.concat(ips);
		});
	}
	
};

