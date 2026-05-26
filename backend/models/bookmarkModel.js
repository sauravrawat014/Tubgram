import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    post: {
        url: String,
        title: String,
        image: String,
        description: String,
        source: String,
        publishedAt: String,
    },
});

const bookmarkModel = mongoose.models.Bookmark || mongoose.model("Bookmark", bookmarkSchema);

export default bookmarkModel;