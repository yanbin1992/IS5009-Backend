import { Post } from '../post/post.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '../../utils/entity';

@Entity('account')
export class Account extends CommonEntity {
  @Column()
  public name: string;

  @Column({ unique: true, length: '300' })
  public email: string;

  @Column({ type: 'text', nullable: true })
  public permissions?: string[];

  @Column('text')
  public password: string;

  @OneToMany(
    type => Post,
    post => post.account,
  )
  public posts: Post[];
}
