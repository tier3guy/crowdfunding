// Components
import { CampaignCard } from "../components";

// Contexts
import { useStateContext } from "../contexts";

const Home = () => {
  const { allCampaign } = useStateContext();

  console.log(allCampaign);

  return (
    <div className="w-full ">
      <h1 className="text-white text-3xl font-semibold my-4">
        {`All Campaigns (${allCampaign.length})`}
      </h1>
      {allCampaign.length === 0 && (
        <p className="text-slate-500">No Campaigns to show.</p>
      )}
      <div className="mt-4 text-white grid grid-col-1 sm:grid-col-2 md:grid-cols-3 md:gap-4">
        {allCampaign.map((campaign, index) => (
          <CampaignCard key={index} data={campaign} />
        ))}
      </div>
    </div>
  );
};

export default Home;
