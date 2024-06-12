import { Translation } from "./translation.model";

export interface Language {
    displayName: string;
    isoCode: string;
    name: Translation[];
}