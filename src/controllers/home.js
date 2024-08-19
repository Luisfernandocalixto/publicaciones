//imports
const ctrl = {};
const { Image } = require('../models');
const path = require('path');
const sidebar = require('../helpers/sidebar.js');



ctrl.index = async (req, res) => {
    const imagesHome = await Image.find().sort({ timestamp: -1 })
    // .lean();  // add lean() to write the images

    let images = imagesHome.map((img) => {
        //  have filename without
        let filenameSort = img.filename.replace(path.extname(img.filename), '');

        return {
            _id: img._id,
            title: img.title,
            description: img.description,
            filenameId: filenameSort,
            filename: img.filename,
            views: img.views,
            timestamp: img.timestamp,
            __v: img.__v
        }
    });


    let viewModel = { images: [] };
    viewModel.images = images;
    viewModel = await sidebar(viewModel);
    // console.log('image', viewModel.sidebar.comments[0].image);
    // console.log(viewModel.images);



    res.render('index', viewModel);
}

module.exports = ctrl;

