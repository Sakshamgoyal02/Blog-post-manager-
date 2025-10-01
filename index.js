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
  const newPosts = BlogPosts.filter (post => post.id !== id);
  res.status(200).json(newPosts);
 }else{
  res.status(400).json("Post not found")
 }

});


app.put ("/updatePost/:id", (req, res) => {
  const uid = parseInt(req.params.id);

  const found = BlogPosts.find (post => post.id === uid);

  if(found){
      const updatePost = req.body;
       found.title = updatePost.title;
      found.email = updatePost.email;
      found.author = updatePost.author;
 res.status(200).json(BlogPosts);
  }else{
    res.status(400).json("post not found");
  }
});



app.listen(PORT, () => {
 console.log("This server is running on port localhost: 3000")
})