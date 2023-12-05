import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";
import Project from "./Project";

@Entity("messages")
export default class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  roomId: string;

  @ManyToOne(() => Project)
  @JoinColumn({ name: "roomId" })
  room: User;

  @CreateDateColumn()
  createdAt: Date;
}
