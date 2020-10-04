import { Client } from './client';

export class Message {
    clients: Client[];
    totalPages: number;
    pageNumber: number;
    pageSize: number;
}
