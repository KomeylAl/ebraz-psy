import { InferType } from "yup";
import { resourceSchema } from "../../validations";

export type resourceType = InferType<typeof resourceSchema>;

export interface resourceApiType {
  id: string;
  title: string;
  type: string;
  description: string;
  link: string;
  file: string;
}
