var mongoose=require('./mongoose'),
    Schema=mongoose.Schema;
var articleSchema=new Schema({
    name: {type: String},
    description: {type: String},
    content: {type: String},
    created_at: {type: Date,default: Date.now},
    updated_at: {type: Date,default: Date.now},
    category_id: {type: Schema.Types.ObjectId,ref: 'category'},
    visits: {type: Number}
});
module.exports=mongoose.model('article',articleSchema);