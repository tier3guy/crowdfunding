const Button = ({ label, onClick, styles }) => {
  return (
    <button
      onClick={onClick ? onClick : () => {}}
      className={`bg-green rounded-2xl flex justify-center items-center px-4 py-2 ${styles}`}
    >
      <p className="text-white">{label}</p>
    </button>
  );
};

export default Button;
