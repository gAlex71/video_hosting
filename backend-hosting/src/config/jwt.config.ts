import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

//Данные из файла .env
export const getJwtConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => ({
    secret: configService.get('JWT_SECRET')
});