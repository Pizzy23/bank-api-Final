import { Column, Entity, PrimaryColumn } from "typeorm";
@Entity('usuario')
export class UserEntity {
    @PrimaryColumn({type: "bigint" }) 
    id: number;
    @Column({ type: "varchar" })
    nome: string;
    @Column({ type: "varchar" })
    cpf: string;
    @Column({ type: "varchar" })
    email: string;
}

