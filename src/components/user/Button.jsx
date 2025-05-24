const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded bg-green-500 hover:bg-green-600 text-white font-semibold ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;