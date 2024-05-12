const feedbackModel = require('../models/feedbackSchema');
const postModel = require('../models/Portfolio');
const mongoose = require('mongoose');
// POST method to add feedback
const AddFeedback = async (req, res) => {
    try {
      const { postID, feedbackDetails } = req.body;
  
      let feedback = await feedbackModel.findOne({ postID });
  
      if (!feedback) {
        feedback = new feedbackModel({
            postID,
            feedbackDetails: feedbackDetails.map(detail => ({
                ...detail,
                createdAt: new Date() // Set createdAt timestamp for new feedback details
            }))
        });
    } else {
        feedback.feedbackDetails.push(...feedbackDetails.map(detail => ({
            ...detail,
            createdAt: new Date() // Set createdAt timestamp for new feedback details
        })));
    }
  
      await feedback.save();
      res.status(201).send({ message: "Feedback added successfully!", feedback });
    } catch (error) {
      res.status(400).send({ message: "Failed to add feedback", error: error.message });
    }
  }
  
  
  // GET method to retrieve all feedbacks
const getALlFeedBack= async (req, res) => {
    try {
      const feedbacks = await feedbackModel.find().populate({
        path: 'postID',
        select: '_id portfolio_name category email'
    })
    .exec();
      res.status(200).send(feedbacks);
    } catch (error) {
      res.status(500).send({ message: "Failed to get feedback", error: error.message });
    }
}

// PATCH method to update a specific feedback detail
const updateSpecificFeedback = async (req, res) => {
    const feedbackId = req.query.feedbackId; // Get feedback document ID from query parameters
    const detailId = req.query.detailId; // Get feedback detail ID from query parameters
    const updates = req.body;

    try {
        // Find the document that contains the feedback detail
        const feedback = await feedbackModel.findById(feedbackId);
        if (!feedback) {
            return res.status(404).send({ message: "Feedback not found" });
        }

        // Find the index of the specific feedback detail
        const detailIndex = feedback.feedbackDetails.findIndex(detail => detail._id.toString() === detailId);
        if (detailIndex === -1) {
            return res.status(404).send({ message: "Feedback detail not found" });
        }

        // Update the specific feedback detail
        Object.keys(updates).forEach(updateKey => {
            feedback.feedbackDetails[detailIndex][updateKey] = updates[updateKey];
        });

        await feedback.save();
        res.status(200).send({ message: "Feedback detail updated successfully", feedback });
    } catch (error) {
        res.status(400).send({ message: "Failed to update feedback", error: error.message });
    }
}


// DELETE method to remove a specific feedback detail using query parameters
const deleteSpecificFeedback = async (req, res) => {
    const feedbackId = req.query.feedbackId; // Get feedback document ID from query parameters
    const detailId = req.query.detailId; // Get feedback detail ID from query parameters

    try {
        const feedback = await feedbackModel.findById(feedbackId);
        if (!feedback) {
            return res.status(404).send({ message: "Feedback not found" });
        }

        // Find and remove the specific feedback detail
        const detailIndex = feedback.feedbackDetails.findIndex(detail => detail._id.toString() === detailId);
        if (detailIndex === -1) {
            return res.status(404).send({ message: "Feedback detail not found" });
        }

        feedback.feedbackDetails.splice(detailIndex, 1);
        await feedback.save();
        res.status(200).send({ message: "Feedback detail deleted successfully", feedback });
    } catch (error) {
        res.status(400).send({ message: "Failed to delete feedback", error: error.message });
    }
}


const generateFeedbackReport = async (req, res) => {
    try {
        const [feedbacks, postCounts] = await Promise.all([
            feedbackModel.aggregate([
                {
                    $lookup: {
                        from: "posts",
                        localField: "postID",
                        foreignField: "_id",
                        as: "postDetails"
                    }
                },
                {
                    $unwind: "$postDetails"
                },
                {
                    $unwind: "$feedbackDetails"
                },
                {
                    $group: {
                        _id: "$postID",
                        portfolioName: { $first: "$postDetails.portfolio_name" },
                        averageResponsibility: { $avg: "$feedbackDetails.responsibility" },
                        averageFriendliness: { $avg: "$feedbackDetails.friendliness" },
                        averageCreativity: { $avg: "$feedbackDetails.creativity" },
                        averageReliability: { $avg: "$feedbackDetails.reliability" },
                        averageOverallSatisfaction: { $avg: "$feedbackDetails.overallSatisfaction" },
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        portfolioName: 1,
                        averageResponsibility: 1,
                        averageFriendliness: 1,
                        averageCreativity: 1,
                        averageReliability: 1,
                        averageOverallSatisfaction: 1,
                        count: 1
                    }
                }
            ]),
            postModel.countDocuments()
        ]);

        if (!feedbacks.length) {
            return res.status(404).json({ message: "No feedback found." });
        }

        const totalPosts = postCounts;
        const postWithFeedback = feedbacks.length;
        res.status(200).json({
            feedbacks,
            postWithFeedback,
            totalPosts
        });
    } catch (error) {
        res.status(500).json({ message: "Error generating report", error: error.message });
    }
};

const getAverageRatingsForPost = async (req, res) => {
    const postID = req.query.postID;  // Get postID from query parameters

    try {
        const averages = await feedbackModel.aggregate([
            {
                $match: { "postID": new mongoose.Types.ObjectId(postID) } // Corrected usage of ObjectId
            },
            {
                $unwind: "$feedbackDetails"
            },
            {
                $group: {
                    _id: null, // Group all documents together
                    averageResponsibility: { $avg: "$feedbackDetails.responsibility" },
                    averageFriendliness: { $avg: "$feedbackDetails.friendliness" },
                    averageCreativity: { $avg: "$feedbackDetails.creativity" },
                    averageReliability: { $avg: "$feedbackDetails.reliability" },
                    averageOverallSatisfaction: { $avg: "$feedbackDetails.overallSatisfaction" }
                }
            },
            {
                $project: {
                    _id: 0, // Exclude the _id field
                    averageResponsibility: 1,
                    averageFriendliness: 1,
                    averageCreativity: 1,
                    averageReliability: 1,
                    averageOverallSatisfaction: 1
                }
            }
        ]);

        if (averages.length === 0) {
            return res.status(404).send({ message: "No feedback data available for this post to calculate averages" });
        }

        res.status(200).send(averages[0]); // Send the averages object
    } catch (error) {
        res.status(500).send({ message: "Failed to calculate average ratings for the post", error: error.message });
    }
};


const getPostDetailsAndFeedback = async (req, res) => {
    try {
        const postID = req.query.postID;
        const post = await postModel.findById(postID);
        const feedbacks = await feedbackModel.find({ postID: postID });

        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        res.status(200).send({ post, feedbacks });
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
}

// const feedbacksByLoginUser = async (req, res) => {
    
//     try {
//         const  userId  = req.query.userId;
//         const feedbacks = await feedbackModel.find({ "feedbackDetails.FeedBackedUserID": userId }).populate({
//             path: 'postID',
//             select: '_id portfolio_name category email'
//         })
//         .exec();;

//         if (feedbacks.length === 0) {
//             return res.status(404).json({ message: "No feedback found for this user." });
//         }

//         res.status(200).json(feedbacks);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// }

const feedbacksByLoginUser = async (req, res) => {
    try {
        const userId = req.query.userId;
        const objectIdUserId = new mongoose.Types.ObjectId(userId);

        // Use MongoDB aggregation to filter subdocuments in the feedbackDetails array
        const feedbacks = await feedbackModel.aggregate([
            {
                $unwind: "$feedbackDetails"  // Deconstructs the feedbackDetails array
            },
            {
                $match: {
                    "feedbackDetails.FeedBackedUserID": objectIdUserId  // Match feedbackDetails where FeedBackedUserID is the userId
                }
            },
            {
                $group: {
                    _id: '$_id',  // Group back by the original document ID
                    postID: { $first: '$postID' },  // Use $first to take the first occurrence of these fields since they are unchanged
                    feedbackDetails: { $push: '$feedbackDetails' }  // Push matched feedbackDetails back into an array
                }
            },
            {
                $lookup: {  // Repopulate the postID details as required
                    from: 'posts',
                    localField: 'postID',
                    foreignField: '_id',
                    as: 'postDetails'
                }
            }
        ]);

        if (!feedbacks.length) {
            return res.status(404).json({ message: "No feedback found for this user." });
        }

        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


const getSpecificFeedbackDetail = async (req, res) => {
    const { feedbackId, detailId } = req.query;  // Extract parameters from the URL

    try {
        const feedback = await feedbackModel.findById(feedbackId);  // Find the feedback document
        if (!feedback) {
            return res.status(404).send({ message: "Feedback not found" });
        }

        // Find the specific feedback detail by detailId
        const detail = feedback.feedbackDetails.find(d => d._id.toString() === detailId);
        if (!detail) {
            return res.status(404).send({ message: "Feedback detail not found" });
        }

        // Send the specific feedback detail
        res.status(200).send(detail);
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
};

module.exports = { getALlFeedBack ,AddFeedback,updateSpecificFeedback,deleteSpecificFeedback,generateFeedbackReport,getAverageRatingsForPost,getPostDetailsAndFeedback,
    feedbacksByLoginUser,
    getSpecificFeedbackDetail
};