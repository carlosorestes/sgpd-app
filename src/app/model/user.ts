import { Deserializable } from '../shared/models/deserializable.model';

export class User implements Deserializable {
  _id: string;
  nome: string;
  phone: string;
  user: string;
  password: string;
  status: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
