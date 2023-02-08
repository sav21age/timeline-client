export interface IClubArea {
    id: number;
    name: string;
    code: string;
    flag: string;
}

export interface IClub {
    id: number;
    shortName: string;
    name: string;
    crest: string;
    area: IClubArea;
}
