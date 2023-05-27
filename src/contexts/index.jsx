// Internal Imports
import { useState, useContext, createContext, useEffect } from "react";

// External Imports
import { useAddress, useMetamask, useContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";

export const StateContext = createContext();
export const useStateContext = () => useContext(StateContext);

const StateContextProvider = ({ children }) => {
  // UI Functions
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const SetModalMessge = (message) => {
    setModalMessage(message);
    setIsModalActive(true);

    setTimeout(() => {
      setIsModalActive(false);
    }, 3000);
  };

  // Web3
  const ContractAddress = "0x21a557902fe687B340e36C2C912782C18e64BB2D";
  const { contract } = useContract(ContractAddress);
  const [allCampaign, setAllCampaigns] = useState([]);
  const connect = useMetamask();
  const address = useAddress();

  const getAllCampaigns = async () => {
    try {
      if (!contract) return;
      const res = await contract.call("getAllCampaigns", []);
      setAllCampaigns(res);
    } catch (err) {}
  };

  const createCampaign = async (
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
