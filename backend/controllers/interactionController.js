import interactionModel from "../models/interactionModel.js";


const getTop = async(req,res)=>{

    try{
          const userId = req.user.id;

    const interaction = await interactionModel.find({user: userId});

    if(interaction.length == 0){
        return res.json({
            success:true,
            hasIntraction:false,
            post:null
        });
    }
    const score = {};

    interaction.forEach(interaction=>{
        if(!score[interaction.topic]){
            score[interaction.topic] = 0;
        }
        score[interaction.topic] += interaction.weight;
    });

    const topTopic = Object.entries(score).sort((a,b)=> b[1]-a[1])[0][0];

    res.json({
        success:true,
        hasInteraction:true,
        topic:topTopic
    });


    }catch(error){
        res.json({success:false, error});
        console.log(error.message);
    }
}

const saveInteraction = async(req,res)=>{
    try{
        const{topic,action} = req.body;

        const actionMap = {
            "popup":1,
            "search":2,
            "bookmark":3

        };

        await interactionModel.create({
            user:req.user.id,
            topic,
            action,
            weight:actionMap[action]
        });

        res.json({success:true});

    }
    catch(error){
        res.json({success:false,error});
        console.log(error.message);
    }
}

export {getTop, saveInteraction};