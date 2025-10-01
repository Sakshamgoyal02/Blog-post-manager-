const express = require("express");
const app = express();

const PORT = 3000;

const BlogPosts = [
     {
        id: 1,
        "title": "Heroes",
        "email": "Heroes@gmail.com",
        "author": "Ironman"
     },
    
      {  id: 2,
        "title": "Villains",
        "email": "Villains@gmail.com",
        "author": "Thanos"
     },

      { id: 3,
        "title": "Civilians",
        "email": "Civilians@gmail.com",
        "author": "NewYork Times"
     }
]

app.get("/showAllBlogPosts", (req, res) => {
  res.status(200).json(BlogPosts);
} );

app.get("/showPost/:postId", (req, res) => {
  const id = parseInt(req.params.postId);
  const post = BlogPosts.filter (post => post.id === id);
 (post.length !== 0) ? res.status(200).json(post) : res.status(404).json("User not found");
});




app.listen(PORT, () => {
 console.log("This server is running on port localhost: 3000")
})