import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { UserEntity } from "../../entities";

export class CreateTweetDto {
    @IsString()
    @IsNotEmpty()
    readonly message: string;


    @IsObject()
    readonly user: Partial<UserEntity>
}
