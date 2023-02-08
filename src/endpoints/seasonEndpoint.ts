export default class SeasonEndpoint {
  static getAll(competitionId: number) {
    return `/competition/${competitionId}/seasons`;
  }
  static getById(seasonId: number) {
    return `/season/${seasonId}`;
  }
  static getByMatchId(matchId: number) {
    return `/season/match/${matchId}`;
  }
}
