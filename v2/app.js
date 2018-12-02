var express 		= require("express"),
	app 			= express(),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose");

mongoose.connect("mongodb://localhost/yelpCamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// Schema Setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Sokolec", 
// 		image: "https://images.pexels.com/photos/939723/pexels-photo-939723.jpeg?auto=compress&cs=tinysrgb&h=350",
// 		description: "Big Hill"
	
// 	}, function(err, campground){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("Nearly created Campground: ");
// 			console.log(campground);
// 		}
// 	});

	// var campgrounds = [
	// 	{name: "Babia Góra", image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"},
	// 	{name: "Rysy", image: "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?auto=compress&cs=tinysrgb&h=350"},
	// 	{name: "Małpia Góra", image: "https://images.pexels.com/photos/939723/pexels-photo-939723.jpeg?auto=compress&cs=tinysrgb&h=350"},
	// 	{name: "Kozica", image: "https://images.pexels.com/photos/1239460/pexels-photo-1239460.jpeg?auto=compress&cs=tinysrgb&h=350"},
	// 	{name: "Budka", image: "https://images.pexels.com/photos/1309587/pexels-photo-1309587.jpeg?auto=compress&cs=tinysrgb&h=350"},
	// 	{name: "Ognisko", image: "https://images.pexels.com/photos/5921/wood-holiday-vacation-garden.jpg?auto=compress&cs=tinysrgb&h=350"}
	// ]

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	//Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index", {campgrounds: allCampgrounds});
		}
	});
});

app.post("/campgrounds", function(req, res){
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	//campgrounds.push(newCampground); - changed after DB would be created
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

app.get("/campgrounds/new", function(req, res){
	res.render("new");	
});

//sHOW -  more info about Campgrounds
app.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
				res.render("show", {campground: foundCampground});
		}
	});
});


app.listen(3000, function(){
	console.log("The YelpCamp server has started")
});