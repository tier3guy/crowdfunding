// Components
import { CampaignCard } from "../components";

const Home = () => {
  return (
    <div className="w-full">
      <h1 className="text-white text-3xl font-semibold my-4">
        All Campaigns (5)
      </h1>
      {/* <p className="text-slate-500">No Campaigns to show.</p> */}
      <div className=" text-white grid grid-col-1 sm:grid-col-2 md:grid-cols-3 md:gap-4">
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
      </div>
    </div>
  );
};

export default Home;
