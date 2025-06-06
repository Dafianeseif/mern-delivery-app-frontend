import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};
const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-centre lg:flex-row">
      <span>
        {total} restaurants found in {city}
        <Link
          to="/"
          className="ml-1 tesxt-sm font-semibold underline cursor-pointer text-yellow-500"
        >
          Change Location
        </Link>
      </span>
      insert sort dropdown here

    </div>
  );
};

export default SearchResultInfo;
