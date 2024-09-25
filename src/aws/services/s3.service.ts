import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk"



@Injectable()

export class S3Service{
    private s3Client:AWS.S3;
    private bucketName:string

    constructor(){
        this.s3Client = new AWS.S3({
            accessKeyId:process.env.AWS_ACCESS_KEY,
            secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
            region:'eu-north-1',
            signatureVersion:'v4'
        })

        this.bucketName = process.env.AWS_BUCKET_NAME
    }

    async upload(file:Express.Multer.File,key:string){

        const buffer = file[0].buffer

        
        const fileKey = key 
        const params = {
            Bucket: this.bucketName,
            Key: String(fileKey),
            Body: buffer,
            ContentType: file.mimetype,
            ContentDisposition: 'inline',
            CreateBucketConfiguration: {
                LocationConstraint: 'eu-north-1',
            },
        };
        
        try {
            return await this.s3Client.upload(params).promise();
        } catch (e) {
            console.error('Error uploading file to S3:', e.message);
            throw new Error('File upload failed');
        }
        
        
    }

    async getPresignedUrl(key: string,bucket?:string): Promise<string> {
        const params = {
            Bucket: bucket || this.bucketName,
            Key: key,
            Expires: 111111111113600,
        };
    
        try {
            const url = await this.s3Client.getSignedUrlPromise('getObject', params);
            return url;
        } catch (error) {
            throw error;
        }
    }
    
}