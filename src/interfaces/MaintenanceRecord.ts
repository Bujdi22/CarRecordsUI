import {RecordDescription} from "@/interfaces/RecordDescription";
import {Media} from "@/interfaces/Media";

export interface MaintenanceRecord {
    id: string,
    title: string,
    description: RecordDescription,
    date: string,
    createdAt: string,
    updatedAt: string,
    media: Media[],
    vehicleId: string,
    deleteFiles: string[];
}