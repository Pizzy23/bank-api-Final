import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString} from "class-validator";

@Injectable()
export class AccountUpdateBalanceInputDto{
    @ApiProperty()
    @IsNumber()
    conta_usuario: number;

    @ApiProperty()
    @IsString()
    saldo:string;
}