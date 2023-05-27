import { useState } from "react";

// Components
import Icon from "./Icon";

// Routings
import { NavLinks } from "../routes";

// Assests
import { Logo, Sun } from "../assets/icons";

// External Imports
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();
  return (
    <div className="text-white h-full flex flex-col justify-between items-center space-y-4">
      <Icon icon={Logo} name="home" styles="w-16 h-14 rounded-xl" />
      <div className="bg-gray w-16 p-2 h-full rounded-xl flex flex-col justify-between items-center">
        <div className="flex flex-col items-center space-y-2">
          {NavLinks.map((NavLink, index) => (
            <Icon
              key={index}
              icon={NavLink.imgUrl}
              name={NavLink.name}
              active={active}
              iconStyles="h-[22px] w-[22px]"
              onClick={() => {
                if (!NavLink.disabled) {
                  setActive(NavLink.name);
                  navigate(NavLink.link);
                }
              }}
            />
          ))}
        </div>
        <Icon name="darkmode" icon={Sun} iconStyles="h-[22px] w-[22px]" />
      </div>
    </div>
  );
};

export default Sidebar;
