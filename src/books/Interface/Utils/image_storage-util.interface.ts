export interface IImageStorageUtils {
  uploadImage(file: Express.Multer.File): Promise<unknown>;

  deleteImage(url: string): Promise<{ success: boolean; message?: string }>;
}
