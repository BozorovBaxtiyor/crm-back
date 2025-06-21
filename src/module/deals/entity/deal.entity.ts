export class Deal {
    id: number;
    title: string;
    description?: string;
    value?: number;
    status: 'new' | 'in_progress' | 'completed' | 'cancelled';
    customerId: number;
    customer?: {
        id: number;
        name: string;
        company?: string;
    };
    createdAt: Date;
    updatedAt: Date;
    userId?: number;
}
