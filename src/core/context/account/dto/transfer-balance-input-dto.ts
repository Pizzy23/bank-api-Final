import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber} from "class-validator";

@Injectable()
export class TransferBalanceInputDto{
    @ApiProperty()
    @IsNumber()
    conta_usuario_enviar: number;

    @ApiProperty()
    @IsNumber()
    saldo:number;

    @ApiProperty()
    @IsNumber()
    conta_usuario_receber: number;
}