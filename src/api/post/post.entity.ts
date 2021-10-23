import { Account } from '../account/account.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../utils/entity';

@Entity('post')
export class Post extends CommonEntity {
  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column({ nullable: false, default: false })
  public checkbox: boolean;

  @Column({ nullable: true })
  public attachment?: string;

  @ManyToOne(
    type => Account,
    account => account.posts,
    { nullable: false },
  )
  public account: Account;
}
