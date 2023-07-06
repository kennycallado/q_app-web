import { PubQuestion } from "./question";
import { PubSlide } from "./slide";

export type PubResourceType = {
  slides?: PubSlide[];
  form?: PubQuestion[];
  external?: number;
}
export class PubResource {
  id: number;
  title: string;
  description: string;
  content: PubResourceType;
}
