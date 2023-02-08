export interface IArea {
    name: string;
    countryCode: string;
    ensign: string;
}

export interface ICompetition {
    id: number;
    name: string;
    area: IArea;
}

export interface ISeason {
    id: number;
    startDate: Date;
    endDate: Date;
}

export interface IFullTime {
    homeTeam: number;
    awayTeam: number;
}

export interface IScore {
    winner: string;
    fullTime: IFullTime;
}

export interface IHomeTeam {
    id: number;
    name: string;
}

export interface IAwayTeam {
    id: number;
    name: string;
}

export interface IMatch {
    id: number;
    competition: ICompetition;
    season: ISeason;
    utcDate: Date;
    status: string;
    matchday: number;
    score: IScore;
    homeTeam: IHomeTeam;
    awayTeam: IAwayTeam;
}


