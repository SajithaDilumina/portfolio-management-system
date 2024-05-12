//validations of inserting file

const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, 'uploads/') //file will be save in this location
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now()+ext)
    }
})

var upload = multer ({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "video/mp4" ||
            file.mimetype == "document/pdf"
        ){
            callback(null, true)
        } else{
            console.log('Invalid data type!')
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 4 //only 4mb
    }
})

module.exports = upload;