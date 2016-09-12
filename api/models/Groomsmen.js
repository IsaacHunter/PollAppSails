/**
* Groomsmen.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	connection: 'someMysqlServer',

  schema: true,
	
  attributes: {
		
		name: {
			type: 'string',
			required: true
		},
		
		response: {
			type: 'string',
			required: true
		}
  },
	
	
};

