const multer=require('multer')

//to store uploading content using multer


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null,"./uploads")
    },
    filename: (req, file, callback) => {
        let filename = `Image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})


const fileFilter = (req, file, callback) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        callback(null,true)
    } else {
        callback(null, false)
        return callback(new Error("only jpg,jpeg,png files are allowded"))
    }
}

const multerConfig = multer({
    storage,
    fileFilter
})

module.exports=multerConfig