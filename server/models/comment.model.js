var mongoose = require('mongoose'); // 引入的是mongoose
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema; // 利用mongoose下的Schema(架构、模型)
var ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
    logId: ObjectId,
    name: String,
    date: { type: Date, default: Date.now },
    desc: String,
    star:Number,
    cateId:String,
    newsId:String
});
CommentSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Comment', CommentSchema);