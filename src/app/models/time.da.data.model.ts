import { Integrante } from './integrante.model';

export interface TimeDaData {
  id: number;
  nome: string;
  franquia: string;
  integrantes: Integrante[];
  data: string;
}
