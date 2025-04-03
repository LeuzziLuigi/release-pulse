export interface SubApplication {
    id?: number;
    name: string;
    pipelineUrl: string;
    serverFolderPath: string;
    healthCheckUrl: string;
    applicationId: string;
    createdTs: string;
    createdBy: string;
    updatedTs?: string;
    updatedBy?: string;
}
