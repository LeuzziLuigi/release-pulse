export interface Environment {
    id?: number;
    name: string;
    isActive: string;
    description: string;
    branchName: string;
    createdTs: string;
    createdBy: string;
    updatedTs?: string;
    updatedBy?: string;
}
