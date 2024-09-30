import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateMusicDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    @Min(1)  // The minimum value for duration, assuming it's in seconds.
    @Max(600)
    duration: number;
}
