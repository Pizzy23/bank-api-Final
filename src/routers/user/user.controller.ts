import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DeleteUserUseCase } from "src/core/context/user/use-case/delete-user-usecase";
import { PatchUserUseCase } from "src/core/context/user/use-case/patch-user-usecase";
import { GetUserUseCase, AddUserUseCase, UserInputDto } from "../../core/context/user";


@ApiTags('user')
@Controller('/user')
export class UserController {
    constructor(public getUserUseCase: GetUserUseCase,
        public addUserUseCase: AddUserUseCase,
        public patchUserUseCase: PatchUserUseCase,
        public deleteUserUseCase: DeleteUserUseCase) {
    }
    @Get('/')
    getUser() {
        return this.getUserUseCase.getUser();
    }
    @Post("/")
    addUser(@Body() userInputDto: UserInputDto) {
        return this.addUserUseCase.addUser(userInputDto);

    }
    @Patch(":id")
    patchUser(
        @Body() userInputDto: UserInputDto,
        @Param("id") id: number) {
        return this.patchUserUseCase.patchUser(userInputDto, id);
    }
    @Delete(":id")
    deleteUser(
        @Param("id") id: number) {
        return this.deleteUserUseCase.deleteUser(id);
    }
}