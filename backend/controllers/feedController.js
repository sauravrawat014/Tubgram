import { fetchNews } from "../services/newService.js";
import { fetchreddit } from "../services/redditService.js";
import { fetchYoutube } from "../services/youtubeService.js";
import client from "../config/redis.js";

export const getFeed = async(req,res)=>{
    try{

        const {topic='Tech', filter='latest'} = req.query;

        const cacheKey = `feed:${topic}:${filter}`;

        const cacheData = await client.get(cacheKey);

        if(cacheData){
             console.log("✅ From cache");
            return res.json(JSON.parse(cacheData));
        }

       

        const [newsArticle, redditPost, youtubePost] = await Promise.all([
            fetchNews(topic,filter),
            fetchreddit(topic,filter),
            fetchYoutube(topic,filter)
        ]);

        const combined = [...newsArticle, ...redditPost, ...youtubePost];

        if(filter == 'latest'){

           combined.sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );
} else{
        combined.sort(
            (a,b)=> new Date(a.publishedAt) - new Date(b.publishedAt)
        );
    }

    const response = { success: true, articles: combined };

    await client.set(cacheKey, JSON.stringify(response),{
        EX:300
    });

     console.log("✅ From API");

    return res.json(response);
 

    } catch(error){
        console.log(error);

    }
}