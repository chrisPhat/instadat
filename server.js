var express = require('express');
var app = express();
var mongoose = require('mongoose');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  })

var upload = multer({ storage: storage });

var Image = require('./models/Image.js');

var port = 3000;
var dbURL = 'mongodb://localhost:27017/fileUpload';

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(express.static('www'));
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res)=>{
    res.sendFile('index.html');
});

app.post('/addPhoto', upload.single('image'), function (req, res, next) {
    const { title, desc } = req.body;
    var imageUpload = new Image({
        title,
        desc,
        path: '/uploads/' + req.file.filename
    })
    imageUpload.save();
    res.redirect('/');   
})

app.get('/getImages', (req, res)=>{
    Image.find({}, (err, docs)=>{
        if (err) throw err;
        res.send(docs);
    })
})

mongoose.connect(dbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    console.log('connected to DB');
}).catch((err)=>{
    console.log(err.message);
});

app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`)
} );