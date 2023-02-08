export default class CompetitionEndpoint {
  static getAll() {
    return "/competitions";
  }
  static getById(competitionId: number) {
    return `/competition/${competitionId}`;
  }
}
