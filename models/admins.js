var mongoose=require('./mongoose'),
    Schema=mongoose.Schema;
var adminsSchema=new Schema({
    name: {type: String},
    phone: {type: String},
    password: {type: String},
    created_at: {type: Date,default: Date.now},
    updated_at: {type: Date,default: Date.now},
});
module.exports=mongoose.model('admins',adminsSchema);