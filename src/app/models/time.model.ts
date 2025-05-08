// team.model.ts
import { ComposicaoTime } from "./composicao-time.model";

export interface Team {
  id?: number;
  data: string;
  composicao: ComposicaoTime[];
}
