import File from '../models/file.js';
import dotenv from 'dotenv';

dotenv.config();

export const uploadImage = async (request, response) => {
    const fileObj = {
        path: request.file.path,
        name: request.file.originalname,
    }
    
    try {
        const file = await File.create(fileObj);
        const host = request.get('host');
        const downloadUrl = `http://${host}/file/${file._id}`;
        console.log('Generated download URL:', downloadUrl);
        response.status(200).json({ path: downloadUrl });
    } catch (error) {
        console.error('Error uploading image:', error);
        response.status(500).json({ error: 'Failed to upload image' });
    }
}

export const getImage = async (request, response) => {
    try {   
        const file = await File.findById(request.params.fileId);
        
        file.downloadCount++;

        await file.save();

        response.download(file.path, file.name);
    } catch (error) {
        console.error('Error downloading image:', error);
        response.status(500).json({ msg: 'Failed to download image' });
    }
}
