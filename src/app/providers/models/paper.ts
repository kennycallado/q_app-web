import { PubAnswer } from "./answer";
import { PubResource } from "./resource";

export class PubPaper {
  id: number;
  user_id: number;
  project_id: number;
  resource_id: number;
  completed: boolean;
  resource?: PubResource;
  answers?: PubAnswer[];
}

export class PubPaperPush {
  id: number;
  user_id: number;
  user_record?: Record<string, number|string>;
  project_id: number;
  resource_id: number;
  completed: boolean;
  answers?: PubAnswer[];
}
