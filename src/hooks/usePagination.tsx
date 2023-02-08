import { useState } from "react";
import { ICompetition } from "../models/ICompetition";

function usePagination(data: ICompetition[], perPage: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage: number = Math.ceil(data.length / perPage);

  function currentData() {
    const begin = (currentPage - 1) * perPage;
    const end = begin + perPage;
    return data.slice(begin, end);
  }

  // function next() {
  //   setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  // }

  // function prev() {
  //   setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  // }

  function jump(page: number) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  // return { next, prev, jump, currentData, currentPage, maxPage };
  return { jump, currentData, maxPage };
}

export default usePagination;
