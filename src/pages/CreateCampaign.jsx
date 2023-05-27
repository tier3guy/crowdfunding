// Internal Imports
import { useState } from "react";

// Assets
import { Money } from "../assets/icons";

// Components
import { Button } from "../components";

// Contexts
import { useStateContext } from "../contexts";

const CreateCampaign = () => {
  const { createCampaign } = useStateContext();

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    image: "",
    target: "",
    deadline: "",
  });
  const label = {
    name: "Your Name *",
    title: "Campaign Title *",
    description: "Story",
    image: "Campaign Image *",
    target: "Goal *",
    deadline: "End Date *",
  };
  const placeholder = {
    name: "John Doe",
    title: "Write Title",
    description: "Write your Story",
    image: "Place image url of your new Campaign",
    target: "ETH 0.5",
    deadline: "End Date *",
  };

  return (
    <div className="bg-gray w-full text-white px-4 py-8 md:p-16 flex items-center justify-center flex-col rounded-xl">
      <h1 className="text-center text-3xl mb-6 font-bold">
        Start a new Campaign 🚀
      </h1>
      <div className="w-full md:w-2/3">
        {Object.keys(formData).map((key, index) => {
          return (
            <div key={index} className="flex flex-col space-y-3 my-4 w-full">
              <label htmlFor={key} className="text-slate-500">
                {label[key]}
              </label>
              {key !== "description" ? (
                <input
                  type={key === "deadline" ? "date" : "text"}
                  name={key}
                  id={key}
                  value={formData[key]}
                  placeholder={placeholder[key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  className="bg-transparent border border-active outline-none px-4 py-3 rounded-md"
                />
              ) : (
                <>
                  <textarea
                    name={key}
                    id={key}
                    value={formData[key]}
                    placeholder={placeholder[key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                    className="min-h-[200px] bg-transparent border border-active outline-none px-4 py-3 rounded-md"
                  />
                  <div className="flex items-center justify-center p-8 bg-purple rounded-md">
                    <img
                      src={Money}
                      className="hidden md:block h-[80px] mr-4"
                      alt="money"
                    />
                    <h1 className="text-3xl font-bold">
                      You will get 100% of your raised fund
                    </h1>
                  </div>
                </>
              )}
            </div>
          );
        })}
        <Button
          label={"Start a new Campaign"}
          onClick={() => {
            createCampaign(
              formData.title,
              formData.description,
              formData.image,
              formData.target,
              formData.deadline
            );
          }}
          styles="w-full p-[20px]"
        />
      </div>
    </div>
  );
};

export default CreateCampaign;
