import { Body, Controller, Delete, Get, Header, Headers, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AccountGetInputDto } from "src/core/context/account/dto/account-get-input-dto";
import { AccountUpdateBalanceInputDto } from "src/core/context/account/dto/account-update-balance-input-dto";
import { TransferBalanceInputDto } from "src/core/context/account/dto/transfer-balance-input-dto";
import { GetAccountUseCase, EditAccountUseCase, AccountInputDto,  DeleteAccountUseCase, TransferAccountUseCase }
    from "../../core/context/account/";

@ApiTags('account')
@Controller('/account')
export class AccountController {
    constructor(public getAccountUseCase: GetAccountUseCase,
        public editAccountUseCase: EditAccountUseCase,
        public transferAccountUseCase: TransferAccountUseCase,
        public deleteAccountUseCase: DeleteAccountUseCase) {
    }
    @Get('/')
    getAccount(@Body() accountGetInputDto: AccountGetInputDto) {
        return this.getAccountUseCase.getAccount(accountGetInputDto);
    }
    @Post("/")
    @ApiResponse({ status: HttpStatus.NOT_ACCEPTABLE })
    @ApiResponse({ status: HttpStatus.NOT_FOUND })
    addAccount(@Body() accountUpdateBalanceInputDto: AccountUpdateBalanceInputDto) {
        return this.editAccountUseCase.patchAccount(accountUpdateBalanceInputDto);

    }
    @Patch("/")
    @ApiResponse({ status: HttpStatus.NOT_ACCEPTABLE })
    @ApiResponse({ status: HttpStatus.NOT_FOUND })
    patchAccount(
        @Body() transferBalanceInputDto: TransferBalanceInputDto,) {
        return this.transferAccountUseCase.transferAccount(transferBalanceInputDto);
    }
    @Delete(":id")
    deleteaccount(
        @Param("id") id: number) {
        return this.deleteAccountUseCase.deleteAccount(id);
    }
}