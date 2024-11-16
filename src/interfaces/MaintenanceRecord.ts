import {RecordDescription} from "@/interfaces/RecordDescription";

export interface MaintenanceRecord {
    id: number,
    title: string,
    description: RecordDescription,
    date: string,
    createdAt: string,
    updatedAt: string,
    media: array,
    vehicleId: number,
}