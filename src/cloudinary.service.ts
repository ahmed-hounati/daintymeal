import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: "dz4pww2qv",
      api_key: "465233574941776",
      api_secret: "noUr5kfUD0upf_RRYlJIvTmCN2Y",
    });
  }

  async uploadImage(imageUrl: string ,  folderName: string): Promise<UploadApiResponse> {
    return cloudinary.uploader.upload(imageUrl, {
        folder: folderName 
      });
  }
}
