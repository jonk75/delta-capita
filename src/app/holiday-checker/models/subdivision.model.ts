import { Translation } from "../../models/translation.model"

export interface Subdivide {
    code: string;
    shortName: string;
}

export interface Subdivision extends Subdivide {
    category: Translation[];
    displayName: string;
    name: Translation[];
    officialLanguages: string;
}