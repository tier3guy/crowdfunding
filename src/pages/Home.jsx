// Components
import { CampaignCard } from "../components";

// Contexts
import { useStateContext } from "../contexts";

const Home = () => {
  const { filteredCampaign } = useStateContext();

  console.log(filteredCampaign);

  return (
    <div className="w-full">
      <h1 className="text-white text-3xl font-semibold my-4">
        {`All Campaigns (${filteredCampaign.length})`}
      </h1>
      {filteredCampaign.length === 0 && (
        <p className="text-slate-500">No Campaigns to show.</p>
      )}
      <div className="mt-4 text-white grid grid-col-1 sm:grid-col-2 md:grid-cols-3 md:gap-4">
        {filteredCampaign.map((campaign, index) => (
          <CampaignCard key={index} data={campaign} />
        ))}
      </div>
    </div>
  );
};

export default Home;
