// Internal Imports
import { useState } from "react";

// Components
import SearchBar from "./SearchBar";
import Button from "./Button";
import Icon from "./Icon";

// Assets
import { Menu, Thirdweb } from "../assets/icons";

// Routings
import { NavLinks } from "../routes";

// External Imports
import { Link, useNavigate } from "react-router-dom";
import { useMetamask } from "@thirdweb-dev/react";

// Utilies
import { CapitilizeFirstLetter } from "../utils";

// Contexts
import { useStateContext } from "../contexts";

const Navbar = () => {
  const [value, setValue] = useState("");
  const [toggleMenu, setToggleMenu] = useState(true);
  const [active, setActive] = useState("dashboard");

  const { setModalMessage } = useStateContext();
  const navigate = useNavigate();
  const { __address } = useStateContext();
  const connect = useMetamask();

  const toggleMenuBar = () => {
    setToggleMenu(!toggleMenu);
  };

  const connectToWallet = async () => {
    try {
      const res = await connect();
      console.log(res);
    } catch (err) {
      if (!setModalMessage) {
        console.error(err);
        return;
      }
      setModalMessage(
        "Some ERROR has been occured while connecting to the Metamask."
      );
    }
  };

  return (
    <>
      <div className="hidden md:block w-full">
        <nav className="flex flex-row items-center justify-between">
          <SearchBar
            value={value}
            setValue={setValue}
            placeholder="Search for campaigns"
          />
          <div className="flex space-x-3 items-center">
            <Button
              label={__address ? "Create a Campaign" : "Connect"}
              styles={__address ? "bg-green" : "bg-purple"}
              onClick={
                __address
                  ? () => {
                      navigate("/create-campaign");
                    }
                  : connectToWallet
              }
            />
            <div className="h-12 w-12 rounded-full bg-active grid place-content-center">
              <img src={Thirdweb} alt="thirdweb" className="h-8 w-8" />
            </div>
          </div>
        </nav>
      </div>
      <div className="md:hidden block w-full">
        <nav className="flex flex-col items-center justify-between">
          <div className="flex space-x-3 items-center w-full justify-between">
            <div className="h-12 w-12 rounded-full bg-active grid place-content-center">
              <img src={Thirdweb} alt="thirdweb" className="h-8 w-8" />
            </div>

            <div onClick={toggleMenuBar}>
              <img src={Menu} alt="menubar" className="h-8 w-8" />
            </div>
          </div>
          <div className="w-full my-6">
            <SearchBar
              value={value}
              setValue={setValue}
              placeholder="Search for campaigns"
              styles="relative w-full"
            />
          </div>
        </nav>
        <div
          className={`fixed w-[92%] left-[50%] -translate-x-[50%] top-24 bg-gray p-4 ${
            toggleMenu ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-500 rounded-lg`}
        >
          {NavLinks.map((navlink, index) => {
            return (
              <div
                key={index}
                className="my-2"
                onClick={() => {
                  if (!navlink.disabled) {
                    setActive(navlink.name);
                    toggleMenuBar();
                    navigate(navlink.link);
                  }
                }}
              >
                <Link to={navlink.link} className="flex items-center space-x-4">
                  <Icon
                    name={navlink.name}
                    active={active}
                    icon={navlink.imgUrl}
                    iconStyles="h-[20px] w-[20px]"
                  />
                  <p
                    className={`text-lg text-white ${
                      navlink.name === active ? "text-green" : "text-white"
                    }`}
                  >
                    {CapitilizeFirstLetter(navlink.name)}
                  </p>
                </Link>
              </div>
            );
          })}
          <Button
            label={__address ? "Create a Campaign" : "Connect"}
            onClick={
              __address
                ? () => {
                    navigate("/create-campaign");
                  }
                : connectToWallet
            }
            styles={`w-full mb-4 ${__address ? "bg-green" : "bg-purple"}`}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;