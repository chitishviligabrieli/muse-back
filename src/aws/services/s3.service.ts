import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";

@Injectable()
export class S3Service {
    private s3Client: AWS.S3;
    private bucketName: string;

    constructor() {
        this.s3Client = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'eu-north-1',
            signatureVersion: 'v4'
        });

        this.bucketName = process.env.AWS_BUCKET_NAME;
    }

    async upload(file: Express.Multer.File, key: string) {
        const buffer = file.buffer;

        // Encode the file key
        const fileKey = encodeURIComponent(key);
        const params = {
            Bucket: this.bucketName,
            Key: String(fileKey),
            Body: buffer,
            ContentType: file.mimetype,
            ContentDisposition: 'inline', // Change as necessary
        };

        try {
            return await this.s3Client.upload(params).promise();
        } catch (e) {
            console.error('Error uploading file to S3:', e);
            throw new Error('File upload failed: ' + e.message);
        }
    }

    async getPresignedUrl(key: string, bucket?: string): Promise<string> {
        const params = {
            Bucket: bucket || this.bucketName,
            Key: key,
            Expires: 3600, // Set to 1 hour for example
        };

        try {
            const url = await this.s3Client.getSignedUrlPromise('getObject', params);
            return url;
        } catch (error) {
            console.error('Error generating presigned URL:', error);
            throw new Error('Failed to generate presigned URL: ' + error.message);
        }
    }
}
