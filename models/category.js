var mongoose=require('./mongoose'),
    Schema=mongoose.Schema;
var categorySchema=new Schema({
    name : { type: String }
});
module.exports=mongoose.model('category',categorySchema);
