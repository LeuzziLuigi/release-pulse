export interface Application {
    id?: number;
    name: string;
    isActive: string;
    projectId: string;
    repositoryId: string;
    createdTs: string;
    createdBy: string;
    updatedTs?: string;
    updatedBy?: string;
}
