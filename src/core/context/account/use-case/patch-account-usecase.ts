import { Repository } from "typeorm";
import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "../entity/account.entity";
import { UserEntity } from "../../user";
import { AccountUpdateBalanceInputDto } from "../dto/account-update-balance-input-dto";



@Injectable()
export class PatchAccountUseCase {
   constructor(
      @InjectRepository(UserEntity)
      private readonly userRepository: Repository<UserEntity>,

      @InjectRepository(AccountEntity)
      private readonly accountRepository: Repository<AccountEntity>,
   ) { }

   async patchAccount(accountUpdateBalanceInputDto: AccountUpdateBalanceInputDto): Promise<any> {
      try {
         const account = await this.accountRepository.find({
            select: ["conta_usuario"],
            where: { conta_usuario: accountUpdateBalanceInputDto.conta_usuario }
         })
         const balance = accountUpdateBalanceInputDto.saldo
         const signal = this.verifySignal(balance)
         const [balanceCurrent] = await this.accountRepository.find({
            select: ["saldo"],
            where: { conta_usuario: accountUpdateBalanceInputDto.conta_usuario },
            order: {
               conta_usuario: "ASC",
               id: "DESC"
            }, take: 1
         });
         const balanceInput = parseInt(accountUpdateBalanceInputDto.saldo.replace(/[-+]/g,''))
         if (signal == '-') {
            if(balanceCurrent.saldo >= balanceInput){
            const remove =  balanceCurrent.saldo - balanceInput
            const accountUpdate = this.accountRepository.save(
               {
                  conta_usuario: accountUpdateBalanceInputDto.conta_usuario,
                  saldo: remove
               })
               return accountUpdate
         }
      }
         if (signal == '+') {
            const add = balanceInput + balanceCurrent.saldo
            const accountUpdate = this.accountRepository.save(
               {
                  conta_usuario: accountUpdateBalanceInputDto.conta_usuario,
                  saldo: add
               })
               return accountUpdate
         }
         throw new Error("Insufficient funds")
      } catch (error) {
         if(error.message === "Insufficient funds"){
            throw new NotAcceptableException(error, error.message)
         }
         throw new NotFoundException(error, error.message)
         
      }
   }
   verifySignal(balance) {
      const balanceString = String(balance)
      const balanceSplit = balanceString.split("");
      const signal = balanceSplit[0]
      if (signal === '-') {
         return signal
      }
      return signal
   }
}
