export const appConfig: any = {
  HOST: `${process.env.REACT_APP_SERVER_URL}`,
  get API_URL() {
    return this.HOST + "/api";
  },
  MEDIA_ROOT: `${process.env.PUBLIC_URL}/media`,
  FALLBACK_SRC: `${process.env.PUBLIC_URL}/media/none.svg`,
  INDEX: [
    { name: "Competitions", link: "competitions", background: "ball.png", backgroundPlaceholder: "ball_placeholder.jpg" },
    { name: "Clubs", link: "clubs", background: "clubs.jpeg", backgroundPlaceholder: "clubs_placeholder.jpg" },
  ],
  BACKGROUND_IMAGE: `${process.env.PUBLIC_URL}/media/background/football_net.png`,
  availableCompetitions: [
    "BSA",
    "ELC",
    "PL",
    "FL1",
    "BL1",
    "SA",
    "DED",
    "PPL",
    "PD",
    "CL",
    "EC",
    "CLI",
    "WC",
  ],
};
