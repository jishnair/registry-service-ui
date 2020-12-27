export interface MicroserviceDTO {

    name: string,
    id: number,
    isEntrypoint: boolean,
    replicas: number,
    dependencies: [string]

}