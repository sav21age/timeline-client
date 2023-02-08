export interface ICompetitionArea {
    id: number;
    name: string;
    countryCode: string;
    ensign: string;
}

export interface ICompetitionSeason {
    id: number;
    startDate: Date;
    endDate: Date;
    currentMatchday: number;
    winner?: any;
}

export interface ICompetition {
    id: number;
    name: string;
    code: string;
    emblem: string;
    area: ICompetitionArea;
    season: ICompetitionSeason;
}


