import { IsString, IsNotEmpty, IsNumber } from 'class-validator';


export class CreateArtistDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    biography: string;
}
