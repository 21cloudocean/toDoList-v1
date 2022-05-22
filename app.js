const express = require("express");
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");
const app = express();
let items = ["item1","item2","item3"];
let workItems = [];
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
let day = date.getDate();

res.render("list", {listTitle: day,newListItems:items});
});

app.post("/",function(req, res){

  let item = req.body.newItem;
if (req.body.list === "Work") {
  workItems.push(item);
  res.redirect("/work");
} else {
  items.push(item);
  res.redirect("/");
};
});

app.get("/work", function(req,res){
  res.render("list",{listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req,res){
  res.render("about");
});

app.listen(3000, () => {
  console.log("listen to port 3000");
});
