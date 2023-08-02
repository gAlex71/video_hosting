//data transfer object

import { IsEmail, MinLength, IsString } from "class-validator";

//Валидация данных
export class AuthDto {
    @IsEmail()
    email: string;

    @MinLength(6, {
        message: 'Не менее 6 символов'
    })
    @IsString()
    password: string;
}