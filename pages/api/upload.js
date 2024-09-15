// /pages/api/upload.js
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import nextConnect from 'next-connect';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Initialize Multer
const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry, something went wrong! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.single('avatar')); // 'avatar' is the field name for the image

apiRoute.post(async (req, res) => {
    try {
        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload_stream(
            { folder: 'avatars' }, // optional: upload to a folder
            (error, result) => {
                if (error) {
                    return res.status(500).json({ message: 'Cloudinary upload failed', error });
                }
                res.status(200).json({ message: 'File uploaded successfully', url: result.secure_url });
            }
        ).end(req.file.buffer); // Pass the file buffer to Cloudinary
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'File upload failed', error: error.message });
    }
});

export const config = {
    api: {
        bodyParser: false, // Important: Disabling body parsing to handle multipart form data
    },
};

export default apiRoute;
