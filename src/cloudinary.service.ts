import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Readable } from 'stream';
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

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
  async uploadSVG(file: string ,folderName: string): Promise<UploadApiResponse> {
    try {
      if (file) {
    
        return cloudinary.uploader.upload(file, {
          folder: folderName,
          resource_type: 'image',
        });
      }
    } catch (error) {
      throw new Error(`Failed to upload SVG: ${error.message}`);
    }
  }
}
