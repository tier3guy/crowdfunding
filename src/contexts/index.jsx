// Internal Imports
import { useState, useContext, createContext, useEffect } from "react";

// External Imports
import { useAddress, useMetamask, useContract } from "@thirdweb-dev/react";
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
  const connect = useMetamask();
  const address = useAddress();

  const getAllCampaigns = async () => {
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
    } catch (err) {}
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
      SetModalMessge("Campaign has been created successfully.");
    } catch (err) {
      setLoading(false);
      console.log(err);
      SetModalMessge("Some ERROR has been occured.");
    }
  };

  useEffect(() => {
    getAllCampaigns();
  }, [address, contract]);

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        ContractAddress,
        modalMessage,
        setModalMessage: SetModalMessge,
        isModalActive,
        setIsModalActive,
        loading,
        setLoading,
        allCampaign,
        setAllCampaigns,
        createCampaign,
        getAllCampaigns,
        active,
        setActive,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
