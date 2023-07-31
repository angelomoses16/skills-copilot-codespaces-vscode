// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

// Create express application
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Get comments by post id
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create comment
app.post('/posts/:id/comments', (req, res) => {
  // Create random id for comment
  const commentId = randomBytes(4).toString('hex');

  // Get comment content from body
  const { content } = req.body;

  // Get comments for post id
  const comments = commentsByPostId[req.params.id] || [];

  // Add new comment to comments
  comments.push({ id: commentId, content });

  // Add comments to commentsByPostId
  commentsByPostId[req.params.id] = comments;

  // Send response
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});