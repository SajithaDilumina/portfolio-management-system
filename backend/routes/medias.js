const router = require("express").Router();
const Media = require("../models/media");


router.post("/add", (req, res) => {
    const payload = req.body;
    const newMedia = new Media(payload);

    newMedia.save()
        .then(() => {
            res.json({message: 'Media added successfully', media: newMedia});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Failed to add media' });
        });
});

router.get("/", (req, res) => {
    Media.find()
        .then((medias) => {
            res.json(medias);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch media' });
        });
});

router.put("/update/:id", async (req, res) => {
    const mediaId = req.params.id; // Get the ID from the route parameter
    const payload = req.body; // Data from the client to update the media

    try {
        // Find the document to update and directly update it
        const updatedMedia = await Media.findByIdAndUpdate(mediaId, {
            $set: {
                title: payload.title,
                description: payload.description,
                type: payload.type,
                category: payload.category,
                content: payload.content
            }
        }, { new: true }); // {new: true} makes sure that the method returns the updated document

        if (!updatedMedia) {
            return res.status(404).json({ message: "Media not found" });
        }

        // Respond with the updated document
        res.status(200).json({ message: "Media updated successfully", media: updatedMedia });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Can't update data", error: err.message });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedMedia = await Media.findByIdAndDelete(req.params.id);
        if (!deletedMedia) {
            return res.status(404).json({ message: "Media not found" });
        }
        res.status(200).json({ message: "Media deleted Successfully" });
    } catch (err) {
        console.error('Error deleting media:', err);
        res.status(500).json({ error: 'Error deleting media' });
    }
});

router.get("/get/:id", async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ message: "Media not found" });
        }
        res.status(200).json({ message: "Media fetched", media });
    } catch (err) {
        console.error('Error fetching media:', err);
        res.status(500).json({ error: 'Error fetching media' });
    }
});
router.get("/report", async (req, res) => {
    try {
        // Aggregate information for each media with additional type and category breakdown
        const mediaReport = await Media.aggregate([
            {
                $project: {
                    title: 1,
                    description: 1,
                    type: 1,
                    category: 1,
                    likeCount: { $size: "$likes" },
                    dislikeCount: { $size: "$dislikes" }
                }
            }
        ]);

        // Aggregate total likes and dislikes across all media
        const totals = await Media.aggregate([
            {
                $group: {
                    _id: null,
                    totalLikes: { $sum: { $size: "$likes" } },
                    totalDislikes: { $sum: { $size: "$dislikes" } },
                    totalMedia: { $sum: 1 },
                    totalVideos: { $sum: { $cond: [{ $eq: ["$type", "Video"] }, 1, 0] } },
                    totalImages: { $sum: { $cond: [{ $eq: ["$type", "Image"] }, 1, 0] } }
                }
            },
            {
                $addFields: {
                    categoryCounts: { $arrayToObject: {
                        $filter: {
                            input: { $objectToArray: "$_id.category" },
                            as: "cat",
                            cond: { $gt: ["$$cat.v", 0] }
                        }
                    }}
                }
            }
        ]);

        // Calculate counts per category in a separate aggregation if needed
        const categoryCounts = await Media.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            success: true,
            data: {
                mediaDetails: mediaReport,
                totals: totals.length > 0 ? totals[0] : { totalLikes: 0, totalDislikes: 0, totalMedia: 0, totalVideos: 0, totalImages: 0, categoryCounts: {} },
                categoryDetails: categoryCounts
            }
        });
    } catch (err) {
        console.error('Error generating report:', err);
        res.status(500).json({ error: 'Error generating report' });
    }
});

// Toggle like with automatic dislike removal
router.patch('/toggle-like', async (req, res) => {
    const userId = req.body.userId;
    const mediaId = req.body.id;

    try {
        const media = await Media.findById(mediaId);
        if (!media) {
            return res.status(404).json({ message: "Media not found" });
        }

        let message = '';
        const likeIndex = media.likes.indexOf(userId);
        const dislikeIndex = media.dislikes.indexOf(userId);

        if (likeIndex > -1) {
            // User already liked it, so remove the like
            media.likes.splice(likeIndex, 1);
            message = 'Like removed';
        } else {
            // Add a like and remove a dislike if it exists
            media.likes.push(userId);
            if (dislikeIndex > -1) {
                media.dislikes.splice(dislikeIndex, 1);
            }
            message = 'Media liked';
        }

        await media.save();
        return res.status(200).json({ message });
    } catch (error) {
        console.error('Error toggling like:', error);
        res.status(500).json({ message: 'Error toggling like', error: error.message });
    }
});

// Toggle dislike with automatic like removal
router.patch('/toggle-dislike', async (req, res) => {
   
    const userId = req.body.userId;
    const mediaId = req.body.id;

    try {
        const media = await Media.findById(mediaId);
        if (!media) {
            return res.status(404).json({ message: "Media not found" });
        }

        let message = '';
        const likeIndex = media.likes.indexOf(userId);
        const dislikeIndex = media.dislikes.indexOf(userId);

        if (dislikeIndex > -1) {
            // User already disliked it, so remove the dislike
            media.dislikes.splice(dislikeIndex, 1);
            message = 'Dislike removed';
        } else {
            // Add a dislike and remove a like if it exists
            media.dislikes.push(userId);
            if (likeIndex > -1) {
                media.likes.splice(likeIndex, 1);
            }
            message = 'Media disliked';
        }

        await media.save();
        return res.status(200).json({ message });
    } catch (error) {
        console.error('Error toggling dislike:', error);
        res.status(500).json({ message: 'Error toggling dislike', error: error.message });
    }
});


module.exports = router;
