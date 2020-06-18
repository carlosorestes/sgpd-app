import { Vehicle } from './vehicle.model';
import { User } from './user';
import { Client } from '../client/client';

export interface Dispatch {

  id: string;
  dataCriacao: string;
  dataEntradaOrgao: string;
  dataPronto: string;
  dataEntrega: string;
  dataAtualizacao: string;
  recommendation: string;
  note: string;
  listVeiculo: Vehicle[];
  user: User;
  client: Client;

}