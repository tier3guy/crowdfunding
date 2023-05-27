// Contexts
import { useStateContext } from "../contexts";

// External Imports
import { useLogout } from "@thirdweb-dev/react";

const LogoutModal = () => {
  const { isLogoutModalOn, setIsLogoutModalOn } = useStateContext();
  const { logout } = useLogout();

  return (
    <div
      className={`${
        !isLogoutModalOn && "hidden"
      } w-screen h-screen absolute top-0 left-0 backdrop-blur-sm grid place-content-center z-[1000000]`}
    >
      <div className="bg-active rounded-xl px-8 py-6 shadow-lg w-[300px] md:w-[500px]">
        <p className="text-center text-xl text-white">
          Are you sure you want to Logout?
        </p>
        <div className="flex space-x-3 items-center justify-between mt-4">
          <button
            onClick={() => {
              setIsLogoutModalOn(false);
            }}
            className="bg-gray text-white p-4 w-1/2 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              return;
              try {
                logout();
              } catch (err) {
                console.log(err);
              }
            }}
            className="bg-green text-white p-4 w-1/2 rounded-xl cursor-not-allowed"
          >
            Yes, Sure
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
