export class ModDefinition {
    Status: ModStatusType;
    ID: string;
    Name: string;
    Author: string;
    InfoUrl: string;
    Description: string;
    Category: ModCategory;
    TargetBeatSaberVersion: string;
    Version: string;
    CoverImageFilename: string;
    Porter: string;
}

export enum ModStatusType {
    NotInstalled = 'NotInstalled',
    Installed = 'Installed',
}

export enum ModCategory {
    Saber = 'Saber',
    Gameplay = 'Gameplay',
    Note = 'Note',
    Library = 'Library',
    Other = 'Other',
}
