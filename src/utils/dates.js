export const getYear = (date) => {
  return new Date(Date.parse(date)).toLocaleDateString("en-GB", {
    year: "numeric",
  });
};

export const getSeason = (dateStart, dateEnd) => {
  return `${getYear(dateStart)}/${getYear(dateEnd).slice(-2)}`;
};

export const getDate = (date) => {
  return new Date(Date.parse(date)).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const getShortDate = (date) => {
  if (date) {
    return new Date(Date.parse(date)).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } else {
    return "-";
  }
};

export const subtractTimeZoneOffset = (date) => {
  return new Date(date.valueOf() - date.getTimezoneOffset() * 60 * 1000);
};
