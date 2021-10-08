import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entity/user.entity";
import { UserInputDto } from "../dto/user-input-dto";

@Injectable()
export class AddUserUseCase {
    constructor(@InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    ){}
    
    async addUser(userInputDto:UserInputDto){
        return this.userRepository.save(userInputDto);
    }
}