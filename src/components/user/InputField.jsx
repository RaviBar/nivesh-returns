const InputField = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder,
  as: Component = "input",
  className = "",
  ...props 
}) => (
  <div className="mb-4">
    {label && <label className="block text-sm text-[#F1F2FF] mb-2">{label}</label>}
    <Component
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border border-[#2C333F] rounded-lg bg-[#2C333F] text-[#F1F2FF] 
                 focus:outline-none focus:ring-2 focus:ring-[#52BD94] transition-all 
                 placeholder-[#999DAA] ${className}`}
      {...props}
    />
  </div>
);

export default InputField;