const Card = ({ children, className }) => (
  <div className={`bg-[#161D29] text-white shadow-xl border border-gray-800 rounded-lg lg:rounded-lg shadow ${className}`}>
    {children}
  </div>
);

export default Card;