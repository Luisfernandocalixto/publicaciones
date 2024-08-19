const { Comment, Image } = require('../models');

module.exports = {
    async newest() {

        const comments = await Comment.find()
            .populate('image')  // option 1 for show data de image with relations a comment
            .limit(5)
            .sort({ timestamp: -1 });

        // option 2
        // for (const comment of comments) {
        //     // const image = await Image.findOne({ _id: comment._id });
        //     const image = await Image.findOne({ _id: comment.image_id });
        //     comment.image = image;
        // }

        return comments;

    }
}