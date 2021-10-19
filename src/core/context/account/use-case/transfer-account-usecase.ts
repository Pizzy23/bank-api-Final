import { Repository } from "typeorm";
import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "../entity/account.entity";
import { TransferBalanceInputDto } from "../dto/transfer-balance-input-dto";

@Injectable()
export class TransferAccountUseCase {
  accountSend: any
  accountReceive: any
  balanceCurrentSend: any
  balanceCurrentReceive: any

  constructor(@InjectRepository(AccountEntity)
  private readonly accountRepository: Repository<AccountEntity>,
  ) { }

  async transferAccount(transferBalanceInputDto: TransferBalanceInputDto) {
    try {
      await this.getAccount(transferBalanceInputDto)
      await this.getBalance(transferBalanceInputDto);
      if (this.accountReceive) {
        if (this.accountSend) {
          if (this.balanceCurrentSend.saldo >= transferBalanceInputDto.saldo) {
            const remove = this.balanceCurrentSend.saldo - transferBalanceInputDto.saldo;
            const accountUpdateSend = this.accountRepository.save(
              {
                conta_usuario: transferBalanceInputDto.conta_usuario_enviar,
                saldo: remove,
              },
            )
            const add = this.balanceCurrentReceive.saldo + transferBalanceInputDto.saldo;
            const accountUpdateReceive = this.accountRepository.save(
              {
                conta_usuario: transferBalanceInputDto.conta_usuario_receber,
                saldo: add,
              },
            )
            return accountUpdateReceive;
          }
          throw new Error("Invalid Money")
        }
      }
    } catch (error) {
      if (error.message === "Invalid Money") {
        throw new NotAcceptableException(error, error.message)
      }
      
      throw new NotFoundException(error)
    }
  }

  async getAccount(transferBalanceInputDto) {
    try {
      this.accountSend = await this.accountRepository.find({
        select: ["conta_usuario"],
        where: { conta_usuario: transferBalanceInputDto.conta_usuario_enviar },
        order: {
          conta_usuario: "ASC",
          id: "DESC"
        }, take: 1
      });
      this.accountReceive = await this.accountRepository.find({
        select: ["conta_usuario"],
        where: { conta_usuario: transferBalanceInputDto.conta_usuario_receber },
        order: {
          conta_usuario: "ASC",
          id: "DESC"
        }, take: 1
      });

      return;

    } catch (error) {
      throw new NotAcceptableException(error)
    }
  }
  async getBalance(transferBalanceInputDto) {
    [this.balanceCurrentSend] = await this.accountRepository.find({
      select: ["saldo"],
      where: { conta_usuario: transferBalanceInputDto.conta_usuario_enviar },
      order: {
        conta_usuario: "ASC",
        id: "DESC"
      }, take: 1
    });
    [this.balanceCurrentReceive] = await this.accountRepository.find({
      select: ["saldo"],
      where: { conta_usuario: transferBalanceInputDto.conta_usuario_receber },
      order: {
        conta_usuario: "ASC",
        id: "DESC"
      }, take: 1
    });
    return
  }
}