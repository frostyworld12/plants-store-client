import { useState, useEffect } from "react";
import Icon from "../Icon/Icon";

const Pagination = ({ totalCount = 0, pageSize = 0, onPageClick = () => {} }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [ranges, setRanges] = useState({});
  const [currentRange, setCurrentRange] = useState(0);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    onPageClick(pageNumber - 1);
  };

  const handlePrevNextClick = (isPrev) => {
    let pageNumber = currentPage - (isPrev ? 1 : -1);
    if ((isPrev && pageNumber <= 0) ||
      (!isPrev && pageNumber > totalPages)
    ) {
      pageNumber = currentPage;
    }

    if (!isPrev && pageNumber > ranges[currentRange][ranges[currentRange].length - 1]) {
      setCurrentRange(currentRange + 1);
    } else if (isPrev && pageNumber < ranges[currentRange][0]) {
      setCurrentRange(currentRange - 1);
    }

    setCurrentPage(pageNumber);
    onPageClick(pageNumber - 1);
  }

  useEffect(() => {
    const totalPages = Math.ceil(totalCount / pageSize);
    setTotalPages(totalPages);
    const pagesArray = Array(totalPages).fill(0).map((page, index) => page = index + 1);
    const pageRanges = {};
    let fisrtPage = 0;
    let lastPage = 5;
    for (let i = 0; i < Math.ceil(pagesArray.length / 5); i++) {
      pageRanges[i + 1] = pagesArray.slice(fisrtPage, lastPage);
      fisrtPage = lastPage;
      lastPage = fisrtPage + lastPage;
    }

    setRanges(pageRanges);
    setCurrentRange(1);
    setCurrentPage(1);
  }, [totalCount]);

  return (
    <div>
      <ul className="inline-flex border border-zinc-200 rounded-lg divide-x cursor-pointer">
        <li className="select-none p-2 w-10 flex items-center justify-center transition-all duration-300 hover:bg-zinc-50 rounded-l-lg" onClick={() => handlePrevNextClick(true)}>
          <Icon iconName="ChevronLeftIcon" iconClassName="text-zinc-500 w-6" type="solid" />
        </li>
        {
          ranges[currentRange] && ranges[currentRange].map((page, i) => {
            return <li
              key={i}
              className={"select-none	p-2 w-10 text-center text-zinc-800 hover:bg-zinc-50 transition-all duration-300 " + (currentPage === page ? "bg-zinc-50" : "")}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </li>
          })
        }
        <li className="select-none p-2 w-10 flex items-center justify-center transition-all duration-300 hover:bg-zinc-50 rounded-r-lg" onClick={() => handlePrevNextClick(false)}>
          <Icon iconName="ChevronRightIcon" iconClassName="text-zinc-500 w-6" type="solid" />
        </li>
      </ul>
    </div>
  )
}

export default Pagination;