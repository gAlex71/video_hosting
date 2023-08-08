import { IsString, IsNumber } from "class-validator";

export class CommentDto {
    @IsNumber()
    videoId: number;

    @IsString()
    message: string;
}