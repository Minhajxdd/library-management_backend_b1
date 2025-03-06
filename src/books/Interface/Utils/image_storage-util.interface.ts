export interface IImageStorageUtils {
  uploadImage(file: Express.Multer.File);

  deleteImage(url: string): Promise<{ success: boolean; message?: string }>;
}
