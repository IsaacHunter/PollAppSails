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
		}
		
	}
};

