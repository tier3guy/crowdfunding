// External Imports
import { Link } from "react-router-dom";
import { Thirdweb } from "../assets/icons";

const image =
  "https://images.unsplash.com/photo-1666919643134-d97687c1826c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80";

const CampaignCard = () => {
  return (
    <Link>
      <div className="bg-active rounded-lg overflow-hidden shadow-md mb-4 md:mb-0">
        <img
          src={image}
          alt="img-car"
          className="h-[150px] w-full object-cover rounded-b-lg shadow-sm"
        />
        <div className="p-4 text-slate-300 flex flex-col space-y-6">
          <div className="flex space-x-3 text-slate-400">
            <i className="fa-solid fa-folder-open"></i>
            <p>Education</p>
          </div>
          <h1 className="text-xl font-semibold">
            Buying a sports a car to get a GF
          </h1>
          <p className="line-clamp-2 text-sm text-slate-400">
            Once upon a time, in a world driven by technology, a group of
            passionate individuals came together with a shared vision - to
            demystify the magic behind computers and empower others to take
            control of their digital destiny. Inspired by the incredible impact
            that technology has on our lives, we set out to create an
            opportunity for everyone to experience the joy of building their
            very own computer, right from the very scratch.
          </p>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-300">0.00052</p>
              <p className="text-slate-400">Raised of 0.01 ETH</p>
            </div>
            <div>
              <p className="text-slate-300">26</p>
              <p className="text-slate-400">Days Left</p>
            </div>
          </div>
          <div className="flex space-x-3 items-center">
            <div className="h-10 w-10 rounded-full bg-slate-400 grid place-content-center">
              <img src={Thirdweb} alt="info" className="h-[20px]" />
            </div>
            <p className="text-slate-400 line-clamp-1 w-[80%]">
              By 0x15aF285 5110fF3Cb734B226C7D53631066e4B03e
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;
