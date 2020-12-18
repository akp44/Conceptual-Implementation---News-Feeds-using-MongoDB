const express = require('express')
const app = express()
const port = 8080
const {newsArticleModel} = reqire("./connector");
const onePageArticleCount = 10


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/newsFeeds", async(req,res)=>{
   res.send( await newsArticleModel.find().skip(Number(req.query.offset || 0)).limit(san(req.query.limit, 10)));
})
const san = (value,defaultValue)=>{
    if(value == null || value == undefined || Number(value))
        return defaultValue;
    else
        return Number(value);
}
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
