import {
  CreateCampaign,
  Dashboard,
  Logout,
  Payment,
  Profile,
  Withdraw,
} from "../assets/icons";

const Navlinks = [
  {
    name: "dashboard",
    imgUrl: Dashboard,
    link: "/",
    disabled: false,
  },
  {
    name: "campaigns",
    imgUrl: CreateCampaign,
    link: "/create-campaign",
    disabled: false,
  },
  {
    name: "payment",
    imgUrl: Payment,
    link: "/",
    disabled: true,
  },
  {
    name: "withdraw",
    imgUrl: Withdraw,
    link: "/",
    disabled: true,
  },
  {
    name: "profile",
    imgUrl: Profile,
    link: "/profile",
    disabled: false,
  },
  {
    name: "logout",
    imgUrl: Logout,
    link: "/",
    disabled: true,
  },
];

export default Navlinks;
