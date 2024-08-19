const { Schema, model } = require('mongoose');
const mongooseLeanVirtual = require('mongoose-lean-virtuals');
const Objectid = Schema.ObjectId;

const CommentSchema = new Schema({
    image_id: { type: Objectid, ref: 'Image' },
    email: { type: String },
    name: { type: String },
    gravatar: { type: String },
    comment: { type: String },
    timestamp: { type: Date, default: Date.now },

},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// CommentSchema.virtual('image')
//     .set(function (image) {
//         this._image = image;
//     })
//     .get(function () {
//         return this._image;
//     })

CommentSchema.virtual('image', {
    ref: 'Image',
    localField: 'image_id',
    foreignField: '_id',
    justOne: true
});


module.exports = model('Comment', CommentSchema);



