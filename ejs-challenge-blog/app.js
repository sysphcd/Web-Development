//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// Load the full build.
var _ = require("lodash");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
let posts = []; // store all composed posts

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//-------------CODE STARTS HERE --------------------
//1. render the home.ejs : send from server to client
app.get("/", function(req, res){
  res.render("home", {theHomeStartingContent:homeStartingContent, allposts:posts});
  // console.log(posts);

});

//2. render about.ejs
app.get("/about", function(req,res){
  res.render("about", {theAboutStartingContent:aboutContent});
});

//3. render contact.ejs
app.get("/contact", function(req,res){
  res.render("contact", {theContactStartingContent:contactContent});
});

//4. render compose.ejs
app.get("/compose",function(req, res){
  res.render("compose");
});

//5. post compose
app.post("/compose", function(req,res){
  //javascript object
  const aPost = {
    newPostTitle : req.body.postTitle,
    newPostBody : req.body.postBody
  };
  posts.push(aPost);
  // console.log(posts);
  res.redirect("/");


});
//6. post
app.get("/posts/:postName", function(req,res){

  //use _.lowerCase from Lodash library
  const requestTitle = _.lowerCase(req.params.postName);
  // console.log(requestTitle);
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.newPostTitle);
    // console.log(storedTitle);
    if (storedTitle === requestTitle) {
      // console.log("Match found!");
      res.render("post",{postTitle:post.newPostTitle, postBody:post.newPostBody});
    };
  });


  // console.log(posts.includes(requestTitle));

  // res.render("home", {theHomeStartingContent:homeStartingContent, allposts:posts});

});





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
