import axios from 'axios';

export const fetchreddit = async(topic, filter)=>{

    let sort = 'relevancy';

    if(filter == 'latest'){
        sort='new';
    }

       const res = await axios.get(`https://www.reddit.com/search.json?q=${topic}&sort=${sort}&limit=10&include_over_18=0`);
    
    const posts = res.data.data.children.filter(post => !post.data.over_18);
      

      return posts.map((post,index)=>({
        id: `reddit-${index}`,
        title: post.data.title,
         description: post.data.selftext || "",
   image: post.data.preview?.images?.[0]?.source?.url 
            ? post.data.preview.images[0].source.url.replace(/&amp;/g, '&')  // Unescape if needed
            : (post.data.thumbnail?.startsWith('http') ? post.data.thumbnail : null),
    source: "Reddit",
    publishedAt: new Date(post.data.created_utc * 1000).toISOString(),
    url: `https://reddit.com${post.data.permalink}`,

      }));


};