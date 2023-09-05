import { PubQuestion } from "./question";
import { PubSlide } from "./slide";

export type PubContentType = {
  slides?: PubSlide[];
  form?: PubQuestion[] | [PubQuestion[]];
  external?: number;
}

export class PubResource {
  id: number;
  title: string;
  description: string;
  resource_type: string;
  content: PubContentType;
}
