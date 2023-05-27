// Internal Imports
import { useState, useContext, createContext } from "react";

// External Imports
import { useAddress, useContract, useMetamask } from "@thirdweb-dev/react";

export const StateContext = createContext();
export const useStateContext = () => useContext(StateContext);

const StateContextProvider = ({ children }) => {
  const ContractAddress = "0x5ec272C6acE6BfD313f845FE64bE988aBee9ced8";
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { contract } = useContract(ContractAddress);
  const connect = useMetamask();
  const address = useAddress();

  const SetModalMessge = (message) => {
    setModalMessage(message);
    setIsModalActive(true);

    setTimeout(() => {
      setIsModalActive(false);
    }, 3000);
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        contract,
        modalMessage,
        isModalActive,
        ContractAddress,
        setIsModalActive,
        setModalMessage: SetModalMessge,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
