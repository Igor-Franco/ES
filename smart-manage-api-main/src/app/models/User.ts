import bcrypt from "bcrypt";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Project from "./Project";

export const UserRoles = [
  "frontend",
  "backend",
  "fullstack",
  "manager",
  "productOwner",
] as const;

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: UserRoles,
    default: "fullstack",
  })
  role: (typeof UserRoles)[number];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @ManyToMany(() => Project, (project) => project.members)
  projects: Project[];
}
