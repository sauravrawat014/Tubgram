import axios from 'axios';

export const fetchNews = async(topic, filter)=>{
     let sortBy = 'publishedAt';

     if(filter == 'latest'){
        sortBy = 'publishedAt';
     }
     
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${topic}&sortBy=${sortBy}&language=en&apiKey=${process.env.NEWS_API_KEY}`);

   let articles = response.data.articles;

   if(filter == 'oldest'){
    articles = articles.sort(
      (a,b)=> new Date(a.publishedAt) - new Date(b.publishedAt)
    );
   }


return articles.map((article,index)=>({
    id:index,
    title: article.title,
    description: article.description,
    image: article.urlToImage,
    source: article.source.name,
    publishedAt: article.publishedAt,
    url: article.url

}));

};



