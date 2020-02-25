var express    = require("express"),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//APP config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//mongoose config
var blogSchema = new mongoose.Schema({
	title : String ,
	image : String ,
	body : String,
	created : {type:Date , default:Date.now}
});

var Blog = mongoose.model("Blog" , blogSchema);

// Blog.create(
// {
// 	title : "My camp story",
// 	image : "https://images.unsplash.com/photo-1494545261862-dadfb7e1c13d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
// 	body : "away from city lights, a perfect place to spaceout with your loves one and have a quality time"
// },function(err,campground){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log("Just Created a new blog");
// 		console.log(campground);
// 	}
// });

//RESTful routes
app.get("/",function(req,res){
	res.redirect("/blogs");
});
// INDEX route 

app.get("/blogs",function(req,res){
	Blog.find({},function(err,blogs){
		if(err){
			console.log(err)
		}else{
			res.render("index",{blogs:blogs});
		}
	});
	
});

//NEW route
app.get("/blogs/new",function(req,res){
	res.render("new")
});

//CREATE route:
app.post("/blogs",function(req,res){
	Blog.create(req.body.blog,function(err,newBlog){
		if(err){
			console.log("err")
			res.render("new");
		}else{
			res.redirect("/blogs");
		}
	});
});



app.listen(3000, function() { 
  console.log('BlogApp server started\n'); 
});