/**
 * Configurations for file upload 
 *
 * @author Alexander Beers.
 */

const multer = require('multer')
const path = require('path')



//image handling: adds user post images to "public/post_images" if they are a valid data type
module.exports={
    storage: new multer.diskStorage({
    destination: path.resolve(__dirname, "../public/post_images"),
    filename: (req, file, cb) => {
        //checks for valid file types
        if (file.mimetype === 'image/jpg') {
            cb(null, file.fieldname + '-' + Date.now() + ".jpg")
        }
        else if (file.mimetype === 'image/jpeg') {
            cb(null, file.fieldname + '-' + Date.now() + ".jpeg")
        }
        else if (file.mimetype === 'image/png') {
            cb(null, file.fieldname + '-' + Date.now() + ".png")
        }
        else if (file.mimetype !== 'image/jpeg' || file.mimetype !== 'image/jpg' || file.mimetype !== 'image/png') {
            return cb(new Error('Only .png, .jpg and .jpeg format files allowed.'))
        }
    }
    })
}
