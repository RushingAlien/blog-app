const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const { marked } = require('marked');

// Get all posts
router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: 'desc' });

  // Parse Markdown content to HTML before rendering
  posts.forEach(post => {
    post.content = marked(post.content);
  });

  res.render('index', { posts: posts });
});

// Create a new post
router.get('/new', (req, res) => {
  res.render('new');
});

router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  try {
    await post.save();
    res.redirect('/');
  } catch (e) {
    res.render('new', { errorMessage: `Error creating post ${e}` });
  }
});

module.exports = router;
