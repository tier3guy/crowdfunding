// Assets
import { Search } from "../assets/icons";

const SearchBar = ({ value, setValue, placeholder, styles }) => {
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
        placeholder={placeholder}
      />
      <button className="relative bg-green rounded-2xl grid place-content-center px-4 py-2">
        <img src={Search} alt="search" className="text-white" />
      </button>
    </div>
  );
};

export default SearchBar;
