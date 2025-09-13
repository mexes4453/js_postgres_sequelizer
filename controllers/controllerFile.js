const User = require("../models/file")
const path = require("path");                         /* file system path */
const multer = require("multer"); /* middleware for handling file uploads */



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
                 // define where to store uploaded files. relative path
	               cb(null, path.join(__dirname, "uploads")); 
	             },
    filename: (req, file, cb) => {
	              cb(null, file.originalname);  // use the original file name
	          }
});

const upload = multer( { storage } );


// Route to uploading files 
async function uploadFile(req, res)
{
	// store file information in the database using the sequelize model
	console.log(req.file);
	const { originalname, path } = req.file;
	File.create({ filename: originalname, path: path })
	.then( ()=>{
	    res.send("file uploaded successfully");
	})
	.catch(err => {
			res.status(500).send("Error uploading the file", err.message);
	});
}




// Route file fetching files 
async function getFileById(req, res)
{
	const fileId = req.params.id;
	File.findByPk( fileId )
	.then( file => {
			if (!file)
			{
				return res.status(404).send("File not found");
			}
			res.download(file.path); // send the file for download
	})
	.catch(err => {
			res.status(500).send("Error fetching the file", err.message);
	});
}





module.exports = {
    uploadFile,
    getFileById,
};
