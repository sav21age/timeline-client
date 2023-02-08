import { useMemo } from "react";
import { subtractTimeZoneOffset } from "../../../../utils/dates";
import { useAppSelector } from "../../../../hooks/redux";
import { IMatch } from "../../../../models/IMatch";

export const useFilterMatchday = (data: IMatch[]) => {
  const state = useAppSelector((state) => state.matchReducer);

  const filterMatchday = useMemo(() => {
    if (Array.isArray(data))
      if (state.matchdayDate) {
        return data.filter(
          (item) =>
            new Date(item.utcDate).toISOString().substring(0, 10) ===
            subtractTimeZoneOffset(state.matchdayDate)
              .toISOString()
              .substring(0, 10)
        );
      }
    return data;
  }, [state.matchdayDate, data]);

  return filterMatchday;
};
