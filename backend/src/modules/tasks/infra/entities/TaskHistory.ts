import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Users } from "@modules/users/infra/typeorm/entities/Users";

import { Tasks } from "./Tasks";

@Entity("TaskHistory")
class TaskHistory {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: Users;

  @Column()
  task_id: string;

  @ManyToOne(() => Tasks, (task) => task.id)
  @JoinColumn({ name: "task_id" })
  task: Users;

  @Column()
  done: boolean;

  @CreateDateColumn()
  occurrence: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { TaskHistory };
