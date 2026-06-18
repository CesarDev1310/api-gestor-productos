import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('productos')
export class Producto{

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({type:'varchar', length:150})
    nombre?: string;

    @Column({type:'decimal'})
    precio?:number;

    @Column({type:'date', default: new Date})
    fechaCreacion?: Date;

    @Column({type:'boolean', default:true})
    enStock?: boolean
}