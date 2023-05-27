// Components
import LogoSVG from "../assets/icons/logo.svg";

const Icon = ({ icon, name, styles, iconStyles, disable, onClick, active }) => {
  return (
    <div
      className={`cursor-pointer grid place-content-center bg-gray ${
        (active === name || name === "home") && "bg-active"
      } rounded-lg h-12 w-12 ${styles} ${disable && "cursor-not-allowed"}`}
      onClick={onClick ? onClick : () => {}}
    >
      <img
        src={icon ? icon : LogoSVG}
        alt="logo"
        className={`h-8 w-8 ${iconStyles} ${
          active === name || name === "home" ? "grayscale-0" : "grayscale"
        }`}
      />
    </div>
  );
};

export default Icon;
