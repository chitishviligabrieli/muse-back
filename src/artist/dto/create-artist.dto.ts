import { IsString, IsNotEmpty } from 'class-validator';


export class CreateArtistDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    biography: string;

}
