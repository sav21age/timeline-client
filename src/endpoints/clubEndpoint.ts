export default class ClubEndpoint {
  static getAll() {
    return `/clubs`;
  }

  static getAreaAll() {
    return `/clubs/area`;
  }

  static getBySeasonId(seasonId: number) {
    return `/season/${seasonId}/clubs`;
  }

  static getById(clubId: number) {
    return `/club/${clubId}`;
  }
}
