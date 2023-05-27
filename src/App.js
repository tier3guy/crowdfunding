// Components
import { Sidebar, Navbar, DialogBox } from "./components";

// Contexts
import { useStateContext } from "./contexts";

// Routes
import { Routings } from "./routes";

// External Imports
import { Route, Routes } from "react-router-dom";

const App = () => {
  const { isModalActive, modalMessage } = useStateContext();

  return (
    <>
      <DialogBox
        active={isModalActive === undefined ? false : isModalActive}
        message={modalMessage}
      />
      <div className="relative bg-dark sm:p-6 p-4 flex flex-row h-screen sm:space-x-6 space-x-2">
        <div className="hidden sm:flex flex-col items-center justify-between h-full">
          <Sidebar />
        </div>
        <div className="w-full flex flex-col space-y-4 h-full overflow-y-scroll">
          <Navbar />
          <div>
            <Routes>
              {Routings.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.element />}
                />
              ))}
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
