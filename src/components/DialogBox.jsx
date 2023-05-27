const DialogBox = ({ message, active }) => {
  return (
    <div
      className={`absolute bg-active bottom-5 z-50 right-5 p-4 min-h-[80px] flex items-center rounded-lg w-[90%] md:w-[300px] border-r-4 transition-all duration-300 border-green ${
        active ? "translate-x-0" : "-translate-x-[100vw]"
      }`}
    >
      <p className="text-white">{message}</p>
    </div>
  );
};

export default DialogBox;
