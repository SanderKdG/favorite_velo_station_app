import {Station} from "./Station";

export interface Network {
    company: string[]
    href: string
    id: string
    location: Location|null
    name: string
    stations: Station[]
}

export const defaultNetwork : Network = {
    company: [],
    href: "",
    id: "",
    location: null,
    name: "",
    stations: []
}
