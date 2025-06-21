export class Customer {
    id: number;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    status: 'active' | 'potential' | 'waiting';
    value?: string;
    createdAt: Date;
    updatedAt: Date;
    userId?: number;
}
