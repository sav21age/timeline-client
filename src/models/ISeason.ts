export interface IWinner {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
}

export interface IArea {
    id: number;
    name: string;
    countryCode: string;
    ensign: string;
}

export interface ICompetition {
    id: number;
    name: string;
    code: string;
    emblem: string;
    area: IArea;
}

export interface ISeason {
    id: number;
    startDate: Date;
    endDate: Date;
    currentMatchday: number;
    winner: IWinner;
    competition: ICompetition;
    available: boolean;
}