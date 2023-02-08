export default class MatchEndpoint {

  static getAll(competitionId: number, seasonId: number) {
    return `/competition/${competitionId}/season/${seasonId}/matches`;
  }

  static getAllDates(competitionId: number, seasonId: number) {
    return `/competition/${competitionId}/season/${seasonId}/dates`;
  }

  static getById(matchId: number) {
    return `/match/${matchId}`;
  }
}
