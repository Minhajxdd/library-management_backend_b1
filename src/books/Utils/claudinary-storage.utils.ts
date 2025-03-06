import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class ClaudinaryStorageUtils {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(file: Express.Multer.File) {
    const filePath = file.path;
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        filePath,
        { folder: 'TeamBase/Profiles/' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
    });
  }

  async deleteImage(
    url: string,
  ): Promise<{ success: boolean; message?: string }> {
    const publicId = this.extractPublicId(url);

    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject({ success: false, message: error.message });
        if (result.result !== 'ok')
          return resolve({ success: false, message: 'Image not found' });

        resolve({ success: true, message: 'Image deleted successfully' });
      });
    });
  }

  private extractPublicId(imageUrl: string) {
    const urlParts = imageUrl.split('/');
    const filename = urlParts[urlParts.length - 1];
    const folderPath = urlParts
      .slice(urlParts.indexOf('upload') + 2, -1)
      .join('/');

    return folderPath
      ? `${folderPath}/${filename.split('.')[0]}`
      : filename.split('.')[0];
  }
}
