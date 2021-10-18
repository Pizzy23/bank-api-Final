import { Body, Controller, Delete, Get, Header, Headers, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AccountGetInputDto } from "src/core/context/account/dto/account-get-input-dto.ts";
import { AccountUpdateBalanceInputDto } from "src/core/context/account/dto/account-update-balance-input-dto";
import { GetAccountUseCase, AddAccountUseCase, AccountInputDto, PatchAccountUseCase, DeleteAccountUseCase }
    from "../../core/context/account/";

@ApiTags('account')
@Controller('/account')
export class AccountController {
    constructor(public getAccountUseCase: GetAccountUseCase,
        public addAccountUseCase: AddAccountUseCase,
        public patchAccountUseCase: PatchAccountUseCase,
        public deleteAccountUseCase: DeleteAccountUseCase) {
    }
    @Get('/')
    getAccount(@Body() accountGetInputDto: AccountGetInputDto) {
        return this.getAccountUseCase.getAccount(accountGetInputDto);
    }
    @Post("/")
    addAccount(@Body() accountInputDto: AccountInputDto) {
        return this.addAccountUseCase.addAccount(accountInputDto);

    }
    @Patch("/")
    @ApiResponse({ status: HttpStatus.NOT_ACCEPTABLE })
    @ApiResponse({ status: HttpStatus.NOT_FOUND })
    patchAccount(
        @Body() accountUpdateBalanceInputDto: AccountUpdateBalanceInputDto,) {
        return this.patchAccountUseCase.patchAccount(accountUpdateBalanceInputDto);
    }
    @Delete(":id")
    deleteaccount(
        @Param("id") id: number) {
        return this.deleteAccountUseCase.deleteAccount(id);
    }
}