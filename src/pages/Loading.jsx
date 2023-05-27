import LoadingImg from "../assets/icons/loader.svg";

const Loading = () => {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 backdrop-blur-sm grid place-content-center z-[1000000]">
      <div className="bg-transparent">
        <img src={LoadingImg} alt="loading" />
      </div>
    </div>
  );
};

export default Loading;
