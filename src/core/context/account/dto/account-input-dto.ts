import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString} from "class-validator";

@Injectable()
export class AccountInputDto{
    @IsOptional()
    @IsNumber()
    id?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    saldo: number;

    @ApiProperty()
    @IsNumber()
    conta_usuario: number;
}