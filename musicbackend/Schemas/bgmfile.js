const mongoose = require('mongoose')

const BgmFile = new mongoose.Schema({
    songname: String,
    filename: String,
    path: String,
    tags:[String]

});

const Audio=mongoose.model('Audio',BgmFile);
module.exports=Audio;