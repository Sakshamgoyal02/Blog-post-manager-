const express = require("express");
const app = express();
const uuid = require("uuid");
const BlogPosts = require("./BlogPosts");

app.use(express.json());

const PORT = 3000;

app.get("/showAllBlogPosts", (req, res) => {
  res.status(200).json(BlogPosts);
} );

app.get("/showPost/:postId", (req, res) => {
  const id = parseInt(req.params.postId);
  const post = BlogPosts.filter (post => post.id === id);
 (post.length !== 0) ? res.status(200).json(post) : res.status(404).json("User not found");
});

app.post("/addPost", (req, res) => {
//  console.log(req.body)
const {title, email, author} = req.body 

BlogPosts.push ({
   id:uuid.v4(),
   title,
   email,
   author
})

 res.status(200).json(BlogPosts);
})


app.delete ("/deletePosts/:id", (req, res) => {
 const id = parseInt(req.params.id);
 const found = BlogPosts.some( post => post.id === id);

 if(found){
  const updatedPosts = BlogPosts.filter (post => post.id !== id);
  res.status(200).json(updatedPosts);
 }else{
  res.status(400).json("Post not found")
 }

})



app.listen(PORT, () => {
 console.log("This server is running on port localhost: 3000")
})