import { Integrante } from "./integrante.model";

export interface ComposicaoTime {
  id?: number;
  time: { id: number }; 
  integrante: Integrante;
}
