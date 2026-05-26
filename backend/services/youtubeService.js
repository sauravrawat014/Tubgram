import axios from 'axios';

export const fetchYoutube = async(topic, filter)=>{
    try{

        const API_KEY = process.env.YOUTUBE_API_KEY;
        let order = 'relevance';

        if(filter == 'latest'){
            order = 'date';
        }

        const res = await axios.get(`https://www.googleapis.com/youtube/v3/search`,{
            params: {
                 part: "snippet",
          q: topic,
          type: "video",
          maxResults: 10,
          order: order,
          key: API_KEY
            }
        })

        const videos = res.data.items;

        return videos.map((video,index)=>({
            id: index,
            title: video.snippet.title,
            description: video.snippet.description,
            image: video.snippet.thumbnails.high.url, 
            source: "YouTube",
            publishedAt: video.snippet.publishedAt,
            url: `https://www.youtube.com/watch?v=${video.id.videoId}`
        }));

    }
    catch(error){
        console.log(error);
        res.json({success:false, error});

    }
}