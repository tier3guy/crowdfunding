// Contexts
import { useStateContext } from "../contexts";

// External Imports
import { useParams } from "react-router-dom";

// Components
import { Button } from "../components";
import { Logo } from "../assets/icons";

// Internal Imports
import { useState } from "react";

const CountBox = ({ count, label }) => {
  return (
    <div className="flex flex-col bg-active  rounded-lg items-center w-full md:w-[180px]">
      <h1 className="text-[3em] font-semibold p-3 pb-0">{count}</h1>
      <p className="bg-[#28282e] p-4 rounded-lg w-full text-center">{label}</p>
    </div>
  );
};

const RefactorAddress = (address) => {
  return address.substring(0, 5) + " ... " + address.substring(35);
};

const CampaignDetails = () => {
  const { allCampaign, donateToCampaign } = useStateContext();
  const { id } = useParams();
  const [seeAllDonors, setSeeAllDonars] = useState(false);
  const [fundValue, setFundValue] = useState("");

  const campaign = allCampaign[id];

  if (!campaign) {
    return (
      <h1 className="text-slate-500 text-2xl font-semibold">
        Campaign not found.
      </h1>
    );
  }
  return (
    <div className="bg-gray rounded-lg text-white">
      <img
        src={campaign.image}
        className="w-full h-[250px] object-cover rounded-lg shadow-md"
      />
      <div className="p-5 pt-10 md:p-10">
        <div className="w-full flex flex-col">
          <h1 className="text-white font-semibold text-4xl mb-3">
            {campaign.title}
          </h1>
          <div className="mt-8">
            <h2 className="text-2xl my-5 uppercase font-semibold">Creator</h2>
            <div className="flex space-x-0 md:space-x-4  items-center">
              <div className="hidden md:grid place-content-center w-[50px] h-[50px] bg-active rounded-full">
                <img src={Logo} />
              </div>
              <div className="flex flex-col spaace-y-2">
                <p className="font-semibold overflow-hidden w-[95%]">
                  {campaign.owner}
                </p>
                <p className="text-slate-500">{campaign.name}</p>
              </div>
            </div>
          </div>
          <h2 className="text-2xl mt-8 mb-3 uppercase font-semibold">
            Description
          </h2>
          <p className="text-slate-400">{campaign.description}</p>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 my-10">
          <CountBox
            count={campaign.amountCollected}
            label={`Raised of ${campaign.target} ETH`}
          />
          <CountBox count={campaign.daysLeft} label={`Days Left`} />
          <CountBox count={campaign?.donars?.length} label={`Total Bakers`} />
        </div>
        <div className="my-5">
          <h2 className="text-2xl mt-8 mb-3 uppercase font-semibold">Donors</h2>
          <div className="flex flex-col md:items-center md:flex-row md:flex-wrap md:space-x-2">
            {campaign?.donars.length === 0 && (
              <p className="text-slate-500">No Donor yet. Be the first one.</p>
            )}
            {campaign?.donars?.map((donor, index) => {
              if (!seeAllDonors && index >= 3) return null;
              return (
                <p className="text-slate-500 bg-active rounded-3xl p-2 px-4 mb-2">
                  {RefactorAddress(donor)}
                </p>
              );
            })}
            {campaign?.donars.length > 3 && (
              <p
                className="text-slate-500 underline cursor-pointer"
                onClick={() => {
                  setSeeAllDonars(!seeAllDonors);
                }}
              >
                {seeAllDonors ? "Wrap" : "See All"}
              </p>
            )}
          </div>
        </div>
        <div className="my-5">
          <h2 className="text-2xl mt-8 mb-3 uppercase font-semibold">Fund</h2>
          <div className="flex flex-col items-center space-y-4 bg-active rounded-lg p-5">
            <h1 className="text-slate-500">Fund the Campaign</h1>
            <input
              className="w-full outline-none focus:border-slate-300 bg-active p-4 rounded-lg border border-slate-500"
              placeholder="ETH 0.1"
              value={fundValue}
              onChange={(e) => {
                setFundValue(e.target.value);
              }}
            />
            <p className="text-slate-500 bg-gray rounded-md p-4">
              Be a catalyst of change. Your generosity holds the power to
              transform lives, ignite dreams, and uplift communities. Join us in
              our crowdfunding campaign and make a difference today. Together,
              let's create a ripple of compassion, inspiring hope and paving the
              way for a brighter and more inclusive future.
            </p>
            <Button
              label={"Donate"}
              onClick={() => donateToCampaign(id, fundValue)}
              styles={"py-3 w-full bg-green mt-10"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
