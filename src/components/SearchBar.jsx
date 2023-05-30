// Assets
import { Search } from "../assets/icons";

// Internal Imports
import { useEffect, useState } from "react";

// Contexts
import { useStateContext } from "../contexts";

const SearchBar = ({ placeholder, styles }) => {
  const [value, setValue] = useState("");
  const { setFilteredCampaign, allCampaign } = useStateContext();

  useEffect(() => {
    if (value === "") {
      setFilteredCampaign(allCampaign);
      return;
    }

    const filteredOnces = allCampaign.filter((cmp) => {
      return (
        cmp.name.toLowerCase().includes(value.toLowerCase()) ||
        cmp.title.toLowerCase().includes(value.toLowerCase()) ||
        cmp.owner.toLowerCase().includes(value.toLowerCase())
      );
    });

    setFilteredCampaign(filteredOnces);
  }, [value, setFilteredCampaign, allCampaign]);

  return (
    <div
      className={`relative flex items-center justify-between bg-gray p-2 rounded-3xl w-fit ${styles}`}
    >
      <input
        className={`bg-gray text-white relative px-2 outline-none`}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder={placeholder ? placeholder : "Search for campaigns"}
      />
      <button className="relative bg-green rounded-2xl grid place-content-center px-4 py-2">
        <img src={Search} alt="search" className="text-white" />
      </button>
    </div>
  );
};

export default SearchBar;
