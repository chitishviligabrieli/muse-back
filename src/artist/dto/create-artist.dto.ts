import { IsArray, IsString, IsUrl, ArrayNotEmpty, IsNotEmpty } from 'class-validator';


export class CreateArtistDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;
  
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsUrl({}, { each: true })
    musics: string[];

    @IsString()
    @IsNotEmpty()
    biography: string;

}
