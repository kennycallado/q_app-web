export type PubUserProject = {
  id: number;
  user_id: number;
  project_id: number;
  active: boolean;
  keys: string[];
  record: Record<string, number | string>;
}

export type PubRole = {
  id: number;
  name: string;
}

export class PubUser {
  id: number;
  depends_on: PubUser;
  role: PubRole;
  user_token: string;
  project: PubUserProject;
  created_at: Date;
  updated_at: Date;
}
