export type UserProject = {
  id: number;
  user_id: number;
  project_id: number;
  active: boolean;
  keys: string[];
  record: Record<string, number | string>;
}

export type Role = {
  id: number;
  name: string;
}

export class User {
  id: number;
  depends_on: User;
  role: Role;
  user_token: string;
  project: UserProject;
  created_at: Date;
  updated_at: Date;
}
