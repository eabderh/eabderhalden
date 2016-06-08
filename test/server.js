var express = require("express");
var jade = require("jade");
var lessMiddleware = require("less-middleware");
//var engines = require("consolidate")

var app = express();

app.set("views", __dirname + "/public");
app.use(lessMiddleware(__dirname + "/public", ["debug"]));
app.use(express.static(__dirname + "/public"));
app.engine("jade", jade.__express);

//app.set("view engine", "jade");
//app.engine("jade", engines.jade);

app.get("/", function(request, response){
	response.render("home.jade");
	});

app.listen(4000, function() {
	console.log("listening on port 4000");
	});

//var http = require("http")
//var server = http.createServer(app);
//
//app.set("port", (process.env.PORT || 5000));
//
//app.get
//

