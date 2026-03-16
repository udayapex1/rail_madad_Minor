import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (fileBuffer, mimetype) => {
  return new Promise((resolve, reject) => {

    const resourceType = mimetype.startsWith("video") ? "video"
                       : mimetype.startsWith("audio") ? "video"  // cloudinary uses "video" for audio too
                       : "image";

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder:        "rail-madad/complaints",
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url:      result.secure_url,
          publicId: result.public_id,
          type:     mimetype.startsWith("video") ? "video"
                  : mimetype.startsWith("audio") ? "audio"
                  : "image",
          format:   result.format,
          size:     result.bytes,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
};