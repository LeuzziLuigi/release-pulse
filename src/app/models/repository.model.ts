export interface Repository {
    id?: number;
    name: string;
    path: string;
    sourceCd: number;
    isActive: boolean;
    createdTs: string;
    createdBy: string;
    description?: string;
    updatedTs?: string;
    updatedBy?: string;
}
