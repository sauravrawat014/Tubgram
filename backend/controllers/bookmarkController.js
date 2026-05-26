import bookmarkModel from "../models/bookmarkModel.js";

const addBookmark = async(req,res)=>{
    try{

        const userId = req.user.id;

        const exist = await bookmarkModel.findOne({
            user:userId,
            "post.url": req.body.url
        });

        if(exist){
            return res.json({message: "Already Saved"});
        }

        const newBookmark = new bookmarkModel({
            user:userId,
            post:req.body
        });

        await newBookmark.save();

        res.json({
  success: true,
  message: "Bookmark added"
});

    } catch(error){
        console.log(error);
        res.json({success:false, message:error.message});

    }
}

const deleteBookmark = async(req,res)=>{
    try{
        const userId = req.user.id;
        const {url} = req.body;

        const deleted =  await bookmarkModel.findOneAndDelete({
            user:userId,
            "post.url":url,

        });

        if(!deleted){
            return res.json({success:false, message:"Bookmark Not Found"});
        }

        res.json({success:true, message:"Bookmark Removed"});

    } catch(error){
        console.log(error.message);
        res.json({success:false, message:error.message});

    }
}

const getBookmark = async(req,res)=>{
    try{
        const userId = req.user.id;

        const bookmarkPost = await bookmarkModel.find({user:userId});

        if(!bookmarkPost){
            return res.json({success:false, message:"Bookmark doesn't exist"});
        }

        res.json({success:true, bookmarkPost});

    } catch(error){
        console.log(error);
        res.json({success:false, message:error.message});

    }
}

export {addBookmark, deleteBookmark, getBookmark};