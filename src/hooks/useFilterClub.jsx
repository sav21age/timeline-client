import { useMemo } from "react";

export const useFilterClub = (data, option) => {
  const filterClub = useMemo(() => {
    if (Array.isArray(data))
      if (option && option !== "SHOW_ALL") {
        return data.filter(
          (item) => item.awayTeam.id === option || item.homeTeam.id === option
        );
      }
    return data;
  }, [option, data]);

  return filterClub;
};
