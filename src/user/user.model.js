import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        default: "José Soto"
    },
    email: {
        type:String,
        default: "jsoto@company.org"
    },
    password: {
        type: String,
        default: "123456"
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: true
    }
});

UserSchema.methods.toJSON = function(){
    const { __v, password, _id, status, google, ...user} = this.toObject();
    user.uid = _id;
    return user
}
export default mongoose.model('User', UserSchema);