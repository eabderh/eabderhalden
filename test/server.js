var express = require("express");
var app = express();

//app.set("views", __dirname + "/public");
app.use(express.static(__dirname + "/public"));

app.get("/", function(request, response){
	response.render("/public/index.html");
	});

app.listen(4000, function() {
	console.log("listening on port 4000");
	});

