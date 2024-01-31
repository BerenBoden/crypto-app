import { useCurrentPage } from "../../hooks/utility";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";

const PaginateChevron = () => {
  const currentPage = useCurrentPage();
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="flex text-xs font-bold items-center">
        <div className="flex text-xs font-bold items-center">
          <Link to={`/dashboard`}>
            <p>Dashboard</p>
          </Link>
          <BiChevronRight fill="" />
          <p className="capitalize">{currentPage}</p>
        </div>
      </div>
    </div>
  );
};

export default PaginateChevron;
