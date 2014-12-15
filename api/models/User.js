/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	
	connection: 'someMysqlServer',

  schema: true,

  attributes: {

  	email: {
  		type: 'string',
  		email: true,
  		required: true,
  		unique: true
  	},

  	encryptedPassword: {
  		type: 'string'
  	},
		
    admin: {
      type: 'boolean',
      defaultsTo: false
    },
		
		questions: {
			collection: 'question',
			via: 'user'
		}
		
	},
	
  beforeCreate: function(values, next) {
    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      next();
    });
  }
};

