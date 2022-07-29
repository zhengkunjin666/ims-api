var mongoose=require('./mongoose'),
    Schema=mongoose.Schema;
var usersSchema=new Schema({
    phone: {type: String},
    password: {type: String},
    created_at: {type: Date,default: Date.now},
    updated_at: {type: Date,default: Date.now},
});
module.exports=mongoose.model('users',usersSchema);