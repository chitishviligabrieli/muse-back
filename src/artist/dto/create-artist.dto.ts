import { IsArray, IsString, IsUrl, ArrayNotEmpty, IsNotEmpty } from 'class-validator';


export class CreateArtistDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    biography: string;

    @IsString()
    image: string;

    @IsString()
    cover: string;
}
