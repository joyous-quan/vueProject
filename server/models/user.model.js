var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	name: String,
	password: String,
	mail: String,
	city: String,
	date: { type: Date },
	gender: String,
	interest: [],
	desc: String
})
UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User',UserSchema);