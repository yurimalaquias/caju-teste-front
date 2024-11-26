import {StatusEnum} from "~/enums/status.ts";

export interface ICandidateData {
    "admissionDate": string,
    "email": string,
    "employeeName": string,
    "status": StatusEnum,
    "cpf": string,
    "id": string
}

export interface CandidateResponse {
    registrations: ICandidateData[]
}