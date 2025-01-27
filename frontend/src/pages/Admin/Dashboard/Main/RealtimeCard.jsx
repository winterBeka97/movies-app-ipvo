import { useGetUsersQuery } from "../../../../redux/api/users";
import PrimaryCard from "./PrimaryCard";

const RealTimeCard = () => {
  const { data: visitors } = useGetUsersQuery();

    return (
    <div className="w-[22rem] mt-10 mr-[2rem] bg-[#282828] text-[#fff] rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-2">Realtime</h2>
      <div className="border-t border-[#666] my-3"></div>
      <h2 className="text-2xl p-3 pl-6 font-bold mb-2">{visitors?.length}</h2>
            <hr />

      <PrimaryCard />
    </div>
  );
};

export default RealTimeCard;