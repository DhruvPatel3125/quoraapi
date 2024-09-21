const express = require("express");
const app = express();
const port = 6060;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "dhruv kumar",
    content: "others are happy because of you",
  },
  {
    id: uuidv4(),
    username: "sujal godavariya",
    content: "hardest choice in life is to find the right person",
  },
  {
    id: uuidv4(),
    username: "mohan kumar",
    content: "vibe is more importent then your life",
  },
  {
    id:uuidv4(),
    username:"mantra lathiya",
    content:"living for other is rule of nature",
  }
];

//get all  posts

// Home route
app.get("/",(req,res)=>{
  res.end("<h1>Qoura api</h1>")
})

app.get("/posts", (req, res) => {
  try {
    res.render("index.ejs", { posts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching posts");
  }
});

//get new post
app.get("/posts/new", (req, res) => {
  try {
    res.render("view.ejs");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error rendering new post form");
  }
});

//create new posts
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

//get post by id
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

//update post
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newcontent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newcontent;
  console.log(post);
  res.redirect("/posts");
});

//get edit post form
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

//delete post
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});
