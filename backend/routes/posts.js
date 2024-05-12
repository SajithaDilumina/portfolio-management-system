const express = require('express');
const router = express.Router();
const Post = require('../models/Portfolio');

// Save posts
router.post('/post/save', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    return res.status(200).json({
      success: "Post saved successfully"
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
});

// Get posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('image').exec();
    return res.status(200).json({
      success: true,
      existingPosts: posts
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
});
// Get posts by userID
router.get('/posts/user/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const userPosts = await Post.find({ userID: userID }).populate('userID').populate('image');
    if (!userPosts.length) {
      return res.status(404).json({ success: false, message: "No posts found for this user" });
    }
    res.status(200).json({
      success: true,
      posts: userPosts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get a specific post
router.get("/post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate('image').exec();

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    return res.status(200).json({
      success: true,
      post
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

// Update a specific post
router.put('/post/update/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedFields = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: updatedFields },
      { new: true } // Return the updated document
    ).exec();

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      updatedPost
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

// Delete posts
router.delete('/post/delete/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id).exec();
    return res.json({
      message: "Delete successful",
      deletedPost
    });
  } catch (err) {
    return res.status(400).json({
      message: "Delete unsuccessful",
      error: err.message
    });
  }
});

router.patch('/post/update-discount/:id', async (req, res) => {
  const { id } = req.params;
  const { discountPercentage, disStartDate, disEndDate, promoCode } = req.body;

  try {
    // Construct the update object dynamically
    const updateData = {};
    if (discountPercentage !== undefined) updateData.discountPercentage = discountPercentage;
    if (disStartDate !== undefined) updateData.disStartDate = disStartDate;
    if (disEndDate !== undefined) updateData.disEndDate = disEndDate;
    if (promoCode !== undefined) updateData.promoCode = promoCode;

    // Check if any data was provided for update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ success: false, message: "No valid fields provided for update" });
    }

    // Perform the update operation
    const updatedPost = await Post.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "Discount details updated successfully",
      data: updatedPost
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating post", error: err.message });
  }
});

module.exports = router;