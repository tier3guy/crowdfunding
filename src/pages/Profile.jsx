// Internal Imports
import { useEffect, useState } from "react";

// Components
import { CampaignCard, Button } from "../components";

// Contexts
import { useStateContext } from "../contexts";

const getTotalRevenue = (campaigns) => {
  let sum = 0;
  campaigns.map((cpn) => {
    sum += cpn.amountCollected;
  });
  return sum;
};

const Profile = () => {
  const { getAllCampaigns, allCampaign, address, connect } = useStateContext();
  const [myCampaigns, setMyCampaigns] = useState([]);

  useEffect(() => {
    getAllCampaigns();
  }, []);

  useEffect(() => {
    setMyCampaigns(
      allCampaign.filter((campaign) => campaign.owner === address)
    );
  }, [allCampaign]);

  if (!address) {
    return (
      <div className="bg-gray p-6 text-white rounded-lg w-full min-h-[65vh] md:min-h-[80vh] flex flex-col items-center justify-center">
        <h1 className="text-5xl">Oops!</h1>
        <p className="text-slate-500 mt-3 w-1/2 text-center">
          You are not connected with your Metamask Account. To visit your
          profile please connect your Metamask first.
        </p>
        <Button label={"Connect"} onClick={connect} styles={"bg-purple mt-4"} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-gray p-6 text-white rounded-lg">
        <div className="flex space-x-3 items-center">
          {/* <p className="text-xl font-semibold">Connected Account</p> */}
          <p className="px-4 py-2 bg-active rounded-3xl text-sm">
            {address?.substring(0, 5) + " ... " + address?.substring(35)}
          </p>
        </div>
        <div className="mt-10">
          <h1 className="text-3xl font-semibold">
            Total Campaigns Created : ({myCampaigns.length})
          </h1>
          <h1 className="text-xl text-slate-400 font-semibold mt-5">
            Total Revenue Generated : ({getTotalRevenue(myCampaigns)}) ETH
          </h1>
        </div>
      </div>

      <h1 className="text-white text-3xl font-semibold my-4 mt-10">
        {`Your Campaigns (${myCampaigns.length})`}
      </h1>
      {myCampaigns.length === 0 && (
        <p className="text-slate-500">You have'nt created any campaign yet.</p>
      )}
      <div className="mt-4 text-white grid grid-col-1 sm:grid-col-2 md:grid-cols-3 md:gap-4">
        {myCampaigns.map((campaign, index) => (
          <CampaignCard key={index} data={campaign} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
