import mongoose from "mongoose";


const interactionSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    },
    topic:{
        type: String,
        required: true

    },
    action:{
        type: String,
        enum: ["popup", "search", "bookmark"],
        required: true
    },
    weight:{
        type:Number,
        required: true

    }
}, {timestamps: true});

const interactionModel = mongoose.models.Interaction || new mongoose.model("Interaction", interactionSchema);
export default interactionModel;