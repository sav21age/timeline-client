export interface IHomeTeam {
    id: number;
    name: string;
    wins: number;
    draws: number;
    losses: number;
}

export interface IAwayTeam {
    id: number;
    name: string;
    wins: number;
    draws: number;
    losses: number;
}

export interface IHead2head {
    numberOfMatches: number;
    totalGoals: number;
    homeTeam: IHomeTeam;
    awayTeam: IAwayTeam;
}

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
    currentMatchday: number;
    winner?: any;
}

export interface IFullTime {
    homeTeam: number;
    awayTeam: number;
}

export interface IHalfTime {
    homeTeam: number;
    awayTeam: number;
}

export interface IExtraTime {
}

export interface IPenalties {
}

export interface IScore {
    winner: string;
    duration: string;
    fullTime: IFullTime;
    halfTime: IHalfTime;
    extraTime: IExtraTime;
    penalties: IPenalties;
}

export interface IHomeTeam2 {
    id: number;
    name: string;
}

export interface IAwayTeam2 {
    id: number;
    name: string;
}

export interface IMatchDetail {
    id: number;
    head2head: IHead2head;
    competition: ICompetition;
    season: ISeason;
    utcDate: Date;
    status: string;
    venue: string;
    matchday: number;
    stage: string;
    score: IScore;
    homeTeam: IHomeTeam2;
    awayTeam: IAwayTeam2;
    referees: any[];
}

