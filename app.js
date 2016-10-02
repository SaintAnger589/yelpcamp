var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
// Campground.create(
//     {
//             name: "Gaurav Srivastava", 
//             image: "http://i.huffpost.com/gen/952939/thumbs/o-GOOGLE-EARTH-NORTH-KOREA-570.jpg?1",
//             description: "It is an awesome Site."
//     },function(err,campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log(campground);
//         }
//     }
// );



//  var campgrounds = [
//         {
//             name: "Salcome Creek", image: "https://i.ytimg.com/vi/7TUXOxJVwOU/maxresdefault.jpg"
//         },
//         {
//             name: "Gaurav Srivastava", image: "http://i.huffpost.com/gen/952939/thumbs/o-GOOGLE-EARTH-NORTH-KOREA-570.jpg?1"
//         },
//         {
//             name:"Bedrooms", image:"https://s-media-cache-ak0.pinimg.com/564x/fe/5a/04/fe5a049cf4de3ba2f05d460bae7d04fd.jpg"
//         },
//                 {
//             name: "Salcome Creek", image: "https://i.ytimg.com/vi/7TUXOxJVwOU/maxresdefault.jpg"
//         },
//         {
//             name: "Gaurav Srivastava", image: "http://i.huffpost.com/gen/952939/thumbs/o-GOOGLE-EARTH-NORTH-KOREA-570.jpg?1"
//         },
//         {
//             name:"Bedrooms", image:"https://s-media-cache-ak0.pinimg.com/564x/fe/5a/04/fe5a049cf4de3ba2f05d460bae7d04fd.jpg"
//         },
//                 {
//             name: "Salcome Creek", image: "https://i.ytimg.com/vi/7TUXOxJVwOU/maxresdefault.jpg"
//         },
//         {
//             name: "Gaurav Srivastava", image: "http://i.huffpost.com/gen/952939/thumbs/o-GOOGLE-EARTH-NORTH-KOREA-570.jpg?1"
//         },
//         {
//             name:"Bedrooms", image:"https://s-media-cache-ak0.pinimg.com/564x/fe/5a/04/fe5a049cf4de3ba2f05d460bae7d04fd.jpg"
//         }
//         ];

app.use(bodyParser.urlencoded({extended: true}));


app.set("view engine", "ejs");

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campground", function(req,res){

        //res.render("campground",{campgrounds: campgrounds});
        Campground.find({},function(err,allcampgrounds){
            if(err){
                console.log(err);
            }else{
                res.render("INDEX",{campgrounds:allcampgrounds});
            }
        });
});

app.post("/campground",function(req,res){
    //res.send("You have hit the Post Request"); 
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampgnds = {name: name, image: image, description: desc};
    //Add to db
    Campground.create(newCampgnds,function(err,newcreatedcampground){
        if(err){
            console.log(err);
        }else{
            console.log(newcreatedcampground);
            res.redirect("/campground");
        }
    });
    // campgrounds.push(newCampgnds);
    //res.redirect("/campground");
});


app.get("/campground/new", function(req,res){
    res.render("new");
});

app.get("/campground/:id",function(req,res){
    Campground.findById(req.params.id,function(err,foundcampground){
    if (err){
        console.log(err);
    }
    else{
     res.render("show",{campground: foundcampground});   
    }
    })
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server is Running");
});

