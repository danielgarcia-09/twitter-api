import { IsString } from "class-validator";

export class UpdateTweetDto {
    @IsString()
    readonly message: string;
}