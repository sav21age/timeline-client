export interface Area {
    id: number;
    name: string;
    code: string;
    flag: string;
}

export interface Coach {
    id: number;
    firstName: string;
    lastName: string;
    name: string;
    dateOfBirth: Date;
    nationality: string;
}

export interface RunningCompetition {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
}

export interface Squad {
    id: number;
    name: string;
    position: string;
    dateOfBirth: Date;
    nationality: string;
}

export interface IClubDetail {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
    address: string;
    website: string;
    founded: number;
    clubColors: string;
    venue: string;
    area: Area;
    coach: Coach;
    runningCompetitions: RunningCompetition[];
    squad: Squad[];
}
