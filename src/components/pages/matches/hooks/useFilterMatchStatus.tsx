import { useMemo } from "react";
import { useAppSelector } from "../../../../hooks/redux";
import { IMatch } from "../../../../models/IMatch";

export const useFilterMatchStatus = (data: IMatch[]) => {
  const state = useAppSelector((state) => state.matchReducer);

  const filterMatchStatus = useMemo(() => {
    if (Array.isArray(data))
      if (Option && state.matchStatus !== "SHOW_ALL") {
        return data.filter((item) => item.status === state.matchStatus);
      }
    return data;
  }, [state.matchStatus, data]);

  return filterMatchStatus;
};
