const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const multer = require('multer');
const path = require('path');
const Audio = require('./Schemas/bgmfile'); 
const mongoose = require('mongoose');
const cors = require('cors');

const fs = require('fs');
app.use(cors());

mongoose.connect('mongodb+srv://root:root@cluster0.5rykmd2.mongodb.net/Music', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Mongodb established");
}).catch(err => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../musicbase/src/pages');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('audio/')) {
            cb(null, true);
        } else {
            cb(new Error('Only audio files are allowed.'));
        }
    }
});

app.post('/upload', upload.single('audio'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }

    
    const { filename, songname, tags } = req.body;

    
    const fileData = {
        filename: filename || req.file.filename,
        songname: songname, 
        path: req.file.path,
        tags: tags ? tags.split('#').map(tag => tag.trim()) : [] 
    };

    try {
        const audio = await Audio.create(fileData);
        res.send('Audio file uploaded successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/bgms',async(req,res)=>{
    try{
        const info=await Audio.find();
        res.json(info);
    }
    catch(err){
        console.error(err);
        res.sendStatus(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
