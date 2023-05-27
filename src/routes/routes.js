import { Home, Profile, CreateCampaign, CampaignDetails } from "../pages";

const Routes = [
  {
    exact: true,
    path: "/",
    element: Home,
  },
  {
    exact: true,
    path: "/profile",
    element: Profile,
  },
  {
    exact: true,
    path: "/create-campaign",
    element: CreateCampaign,
  },
  {
    exact: true,
    path: "/campaign-details/:id",
    element: CampaignDetails,
  },
];

export default Routes;
