import { Vehicle } from '../model/vehicle.model';

export class Client {
    constructor(
      _id: string,
      nome: string,
      cpf: string,
      telefone1: string,
      telefone2: string,
      vehicleList: Vehicle[]
      ) {}
    }