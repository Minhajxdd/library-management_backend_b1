import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import { promises as fs } from 'fs';
import { IFileUtils } from '../Interface/Utils/file-utils.interface';

@Injectable()
export class FileUtils implements IFileUtils {
  private logger: Logger = new Logger('File Utils');

  async deleteFile(filePath: string): Promise<boolean> {
    try {
      const fullPath = path.resolve(__dirname, '../../../..', filePath);

      await fs.unlink(fullPath);
      return true;
    } catch (err) {
      this.logger.log(err.message);
      return false;
    }
  }
}
