import { useState, useMemo } from "react";
import { IMatch } from "../../../../models/IMatch";

function useDatination(data: IMatch[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const dates = useMemo(() => {
    let tmp = [...new Set(data.map((item) => item.utcDate))];
    return tmp.map((date) => new Date(date).getTime());
  }, [data]);

  const maxPage = Math.ceil(dates.length / itemsPerPage);

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    const DATES = dates.slice(0, end);

    const maxDate = Math.max(...DATES);
    const minDate = Math.min(...DATES);

    return data.filter(
      (item) =>
        new Date(item.utcDate).getTime() >= minDate && new Date(item.utcDate).getTime() <= maxDate
    );
  }

  function jump(page: number) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  return { jump, currentData, maxPage };
}

export default useDatination;
