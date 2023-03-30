import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class PaginationDTO {

    @IsString()
    @IsOptional()
    filter: string = '{}'

    @IsNumber()
    @IsPositive()
    @IsOptional()
    skip: number = 1

    @IsNumber()
    @IsPositive()
    @IsOptional()
    take: number = 10
}