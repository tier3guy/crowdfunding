// Contexts
import { useStateContext } from "../contexts";

// External Imports
import { useParams } from "react-router-dom";

// Components
import { Button } from "../components";

const CampaignDetails = () => {
  const { allCampaign } = useStateContext();
  const { id } = useParams();

  const campaign = allCampaign[id];

  const donateToCampaign = () => {};

  if (!campaign) {
    return <h1>Campaign not found</h1>;
  }
  return (
    <div className="bg-gray rounded-lg text-white">
      <img
        src={campaign.image}
        className="w-full h-[250px] object-cover rounded-lg shadow-md"
      />
      <div className="p-10">
        <div className="w-full flex flex-col">
          <h1 className="text-white font-semibold text-3xl mb-3">
            {campaign.title}
          </h1>
          <p className="text-slate-400">{campaign.name}</p>
          <h2 className="text-2xl mt-8 mb-3">Description</h2>
          <p className="text-slate-400">{campaign.description}</p>
        </div>
        <div className=" flex space-x-10 my-10">
          <div className="flex flex-col">
            <h1 className="text-[3em] font-semibold">
              {campaign.amountCollected}
            </h1>
            <p>Raised of {campaign.target} ETH</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[3em] font-semibold">{campaign.daysLeft}</h1>
            <p>Days Left</p>
          </div>
        </div>
        <Button
          label={"Donate"}
          onClick={donateToCampaign}
          styles={"w-full py-3 text-xl font-semibold"}
        />
      </div>
    </div>
  );
};

export default CampaignDetails;
