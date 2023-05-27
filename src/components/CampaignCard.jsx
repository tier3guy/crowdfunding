// External Imports
import { useNavigate } from "react-router-dom";
import { Thirdweb } from "../assets/icons";

const CampaignCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-active rounded-lg overflow-hidden shadow-md mb-4 md:mb-0 cursor-pointer"
      onClick={() => {
        navigate(`/campaign-details/${data.id}`);
      }}
    >
      <img
        src={data?.image}
        alt="img-car"
        className="h-[150px] w-full object-cover rounded-b-lg shadow-sm"
      />
      <div className="p-4 text-slate-300 flex flex-col space-y-4">
        {/* <div className="flex space-x-3 text-slate-400">
            <i className="fa-solid fa-folder-open"></i>
            <p>Education</p>
          </div> */}
        <h1 className="text-2xl font-semibold line-clamp-1">{data?.title}</h1>
        <p className="line-clamp-2 text-sm text-slate-400 h-[40px]">
          {data?.description}
        </p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-300  text-xl font-semibold">
              {data?.amountCollected}
            </p>
            <p className="text-slate-400">{`Raised of ${parseFloat(
              data?.target
            ).toFixed(5)} ETH`}</p>
          </div>
          <div>
            <p className="text-slate-300 text-xl font-semibold">
              {data?.daysLeft}
            </p>
            <p className="text-slate-400">Days Left</p>
          </div>
        </div>
        <div className="flex space-x-3 items-center">
          <div className="h-10 w-10 rounded-full bg-slate-400 grid place-content-center">
            <img src={Thirdweb} alt="info" className="h-[20px]" />
          </div>
          <p className="text-slate-400 line-clamp-1 w-[80%]">
            By{" "}
            {data?.owner?.substring(0, 6) +
              " ... " +
              data?.owner?.substring(35)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
