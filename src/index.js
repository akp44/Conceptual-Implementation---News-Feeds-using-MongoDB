const express = require('express')
const app = express()
const port = 8080
const { newsArticleModel } = require('./connector');
const onePageArticleCount = 10


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/newFeeds", async (req,res) =>  {
   res.send( 
      await newsArticleModel
      .find()
      .skip(sani(req.query.offset, 0))
       .limit(sani(req.query.limit, 10)));
});

const sani = (value,defaultValue) => {
    if(value === null || value === undefined || isNaN(Number(value))){
        return defaultValue;
    }else{
        return Number(value);
    }
}
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
