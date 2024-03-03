import mongoose, { Schema } from "mongoose";

const BusinessSchema = mongoose.Schema({
    businessName:{
        type: String,
        require: [true, "Required field"]
    },
    impactLevel:{
        type: String,
        require: [true, "Required field"]
    },
    category:{
        type: String,
        require: [true, "Required field"]
    },
    years:{
        type: Number,
        require: [true, "Required field"]
    },
    status:{
        type: Boolean,
        default: true
    }
})

BusinessSchema.methods.toJSON = function(){
    const { __v, _id, status, ...business } = this.toObject();
    business.uid = _id;
    return business;
}

export default mongoose.model('Business', BusinessSchema);