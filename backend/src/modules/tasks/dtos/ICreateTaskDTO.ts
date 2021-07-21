interface ICreateTaskDTO {
  id?: string;
  user_id: string;
  description: string;
  done?: boolean;
}

export { ICreateTaskDTO };
