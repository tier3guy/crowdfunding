// Internal Imports
import { useState, useContext, createContext, useEffect } from "react";

// External Imports
import {
  useAddress,
  useMetamask,
  useContract,
  useLogout,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

// Utils
import { CalculateDaysFromToday } from "../utils";

export const StateContext = createContext();
export const useStateContext = () => useContext(StateContext);

const StateContextProvider = ({ children }) => {
  // UI Functions
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [isLogoutModalOn, setIsLogoutModalOn] = useState(false);

  const SetModalMessge = (message) => {
    setModalMessage(message);
    setIsModalActive(true);

    setTimeout(() => {
      setIsModalActive(false);
    }, 3000);
  };

  // Web3
  const ContractAddress = "0xc8408560b640D35Af1e635cbbCDDFe9B239151B1";
  const WEI_VALUE = "1000000000000000000";
  const { contract } = useContract(ContractAddress);
  const [allCampaign, setAllCampaigns] = useState([]);
  const [filteredCampaign, setFilteredCampaign] = useState([]);
  const { logout, isLoading } = useLogout();
  const connect = useMetamask();
  const address = useAddress();

  const connectToMetamask = async () => {
    try {
      await connect();
    } catch (err) {
      SetModalMessge(
        "Some ERROR has been occured. While connecting to the Metamask"
      );
    }
  };

  const getAllCampaigns = async () => {
    setLoading(true);
    try {
      if (!contract) return;
      const res = await contract.call("getAllCampaigns", []);

      const campaigns = res.map((cpn, idx) => {
        return {
          id: idx,
          owner: cpn[0],
          name: cpn[1],
          title: cpn[2],
          description: cpn[3],
          image: cpn[4],
          target: ethers.utils.formatUnits(cpn[5]),
          amountCollected: ethers.utils.formatUnits(cpn[6]),
          dealine: new Date(
            ethers.utils.formatUnits(cpn[7]) * WEI_VALUE
          ).getDate(),
          donations: cpn[8].map((donation) =>
            ethers.utils.formatUnits(donation)
          ),
          donars: cpn[9],
          daysLeft: CalculateDaysFromToday(
            new Date(ethers.utils.formatUnits(cpn[7]) * WEI_VALUE)
          ),
        };
      });
      setAllCampaigns(campaigns);
      setFilteredCampaign(campaigns);
      setLoading(false);
    } catch (err) {
      SetModalMessge(
        "Some Error has been occured while fetching the Campaigns data."
      );
      setLoading(false);
    }
  };

  const createCampaign = async (
    name,
    title,
    description,
    image,
    target,
    deadline
  ) => {
    if (!address) return;
    if (!contract) return;
    setLoading(true);
    try {
      await contract.call("createCampaign", [
        address,
        name,
        title,
        description,
        image,
        ethers.utils.parseUnits(target, 18),
        new Date(deadline).getTime(),
      ]);
      setLoading(false);
      await getAllCampaigns();
      SetModalMessge("Campaign has been created successfully.");
    } catch (err) {
      setLoading(false);
      console.log(err);
      SetModalMessge("Some ERROR has been occured.");
    }
  };

  const donateToCampaign = async (_id, _value) => {
    setLoading(true);
    try {
      const res = await contract.call("donateToCampaign", [_id], {
        value: ethers.utils.parseEther(_value),
      });
      console.log(res);
      setLoading(false);
      await getAllCampaigns();
      SetModalMessge(
        "Congratulations! You Funds have been securely transfered."
      );
    } catch (err) {
      console.log(err);
      SetModalMessge("Transaction Failed. Please try again later.");
      setLoading(false);
    }
  };

  const logoutFunc = async () => {
    setLoading(true);
    try {
      const res = await logout();
      console.log(res);
      setIsLogoutModalOn(false);
      // SetModalMessge("Logged out successfully.");
      SetModalMessge(
        "Some ERROR has been occured. While logging out from yout Metamask account."
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
      setIsLogoutModalOn(false);
      SetModalMessge(
        "Some ERROR has been occured. While logging out from yout Metamask account."
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCampaigns();
  }, [address, contract]);

  return (
    <StateContext.Provider
      value={{
        address,
        connect: connectToMetamask,
        ContractAddress,
        modalMessage,
        setModalMessage: SetModalMessge,
        isModalActive,
        setIsModalActive,
        loading,
        setLoading,
        allCampaign,
        setAllCampaigns,
        filteredCampaign,
        setFilteredCampaign,
        createCampaign,
        getAllCampaigns,
        donateToCampaign,
        active,
        setActive,
        isLogoutModalOn,
        setIsLogoutModalOn,
        logout: logoutFunc,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
