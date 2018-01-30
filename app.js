var bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    express    = require("express"),
        app    = express();

// APP CONGIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);



//RESTFUL ROUTES

app.get("/", function(req, res) {
    res.redirect("/blogs");
});
// 1. Index ROUTE: retrieve all blogs from database
app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs){
      if(err) {
        console.log("ERROR!");
      } else {
        res.render("index", {blogs: blogs});
      }
  });
});

//2. New ROUTE
app.get("/blogs/new", function(req,res) {
  res.render("new");
});
//3. Create ROUTE
app.post("/blogs", function(req, res){
    //create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err) {
          res.render("new");
        } else {
              //then, redirect to the index
          res.redirect("/blogs");
        }
    });
});
app.listen(3000, function(req, res){
    console.log("RESTful Blog App server has started!");
});
