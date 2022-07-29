var mongoose=require('./mongoose'),
    Schema=mongoose.Schema;
var commentSchema=new Schema({
    name: {type: String},
    targetName: {type: String},
    content: {type: String},
    created_at: {type: Date,default: Date.now},
    article_id: {type: Schema.Types.ObjectId,ref: 'article'}
});
module.exports=mongoose.model('comment',commentSchema);