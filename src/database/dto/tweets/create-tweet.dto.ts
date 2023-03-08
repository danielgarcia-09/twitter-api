import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTweetDto {
    @IsString()
    @IsNotEmpty()
    readonly message: string;


    @IsNumber()
    readonly userId: number
}
