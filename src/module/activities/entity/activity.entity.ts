export class Activity {
    id: number;
    type: 'call' | 'email' | 'meeting' | 'deal';
    description: string;
    customerId: number;
    customer?: {
        id: number;
        name: string;
    };
    createdAt: Date;
    userId?: number;
}
