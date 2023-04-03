import {Lock} from "./Lock";

export interface Station {
    empty_slots: number
    extra: Lock
    free_bikes: number
    id: string
    latitude: number
    longitude: number
    name: string
    timestamp: string
}
