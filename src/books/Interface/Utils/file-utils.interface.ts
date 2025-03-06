export interface IFileUtils {
  deleteFile(filePath: string): Promise<boolean>;
}
