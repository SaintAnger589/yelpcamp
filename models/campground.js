var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
module.exports =  mongoose.model("Campground",campgroundSchema);