var mongoose = require('mongoose')
const crypto = require ('crypto')
const uuidv1 = require('uuid/v1')
var Schema = mongoose.Schema

var user_schema = new Schema({
    name:{
        type: String,
        required: true,
        maxlength: 40,
        trim: true
    },
    lastname:{
        type: String,
        maxlength: 40,
        trim: true
    },
    email:{
        type: String,
        required: true,
        maxlength: 40,
        trim: true,
        unique:true
    },
    userinfo:{
        type:String,
        trim:true
    },
    encrypted_password:{
        type: String,
        required: true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchase: {
        type: Array,
        default:[]
    }
}, {timestamps: true})

user_schema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv1()
        this.encrypted_password = this.getSecurePassword(password)
    })
    .get(function(){
        return this._password
    })

user_schema.method = {

    getSecurePassword: function(userpassword){
        if(!password) return ""
        try {
            return crypto.createHmac('sha256', this,salt)
            .update(userpassword)
            .digest('hex')
        } catch (error) {
            return ""
        }
    },
    authenticate: function(userpassword){
        return this.getSecurePassword(userpassword) === this.encrypted_password
    }
}

module.exports = mongoose.model("user",user_schema)
