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
// 1. index: retrieve all blogs from database
app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs){
      if(err) {
        console.log("ERROR!");
      } else {
        res.render("index", {blogs: blogs});
      }
  });
});

app.listen(3000, function(req, res){
    console.log("RESTful Blog App server has started!");
});
