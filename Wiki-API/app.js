//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs'); // templating engine with ejs
//post request
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


//connect to database
mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true});

//create article schema
const articlesSchema = {
  title : String,
  content:String
};
//create model: collection name
const Article = mongoose.model("Article", articlesSchema);

//chainable route handlers for get(), post() and delete() using Express
app.route("/articles")
//GET : Fetches all the articles
.get(function(req,res){
  Article.find(function(err, foundArticles){
    // console.log(foundArticles);
    if (!err){
      res.send(foundArticles);
    } else {
      res.send(err);
    }

  });
})
 //POST : create one new article
.post(function(req, res){

  const newArticle = new Article({
    title: req.body.title,
    content :req.body.content
  });
//this will be added into Mongodb (can be seen in Robo 3T)
  newArticle.save(function(err){
    //check mongoose docs
    if (!err) {
      res.send("Successfully added a new article.");
    } else {
      res.send(err);
    }
  });

})
.delete(function(req,res){
  // mongoose doc : deleteMany(conditions, callback )
  Article.deleteMany(function(err){
    if (!err) {
      res.send("Successfully deleted all articles.");
    } else {
      res.send(err);
    }
  });
});


// ---------request targeting a specific article-------

app.route("/articles/:articleTitle")
.get(function(req,res){

  Article.findOne({title:req.params.articleTitle}, function(err,foundAcritle){
    if (!err){
      res.send(foundAcritle);
    } else {
      res.send("No articles matching that title was found.");
    }
  })
})
//put will entire replace/update the document
.put(function(req,res){
  Article.findOneAndUpdate(
  { title: req.params.articleTitle},
  { title: req.body.title, content: req.body.content},
  { overwrite: true},
  function(err) {
    if (!err) {
      res.send("Successfully updated Article.");
    } else {
      res.send(err);
    }
  });
})

.patch(function(req,res){
  Article.findOneAndUpdate(
    {title: req.params.articleTitle},
    {$set:req.body},
    function(err){
      if (!err){
        res.send("Successfully updated Article.");
      }else {
        res.send(err);
      }
    }
  );
})
.delete(function(req,res){
  Article.deleteOne(
    {title:req.params.articleTitle},
    function(err){
      if (!err) {
        res.send("Successfully deleted the corresponding Article.");
      } else {
        res.send(err);
      }
    }
  );
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
