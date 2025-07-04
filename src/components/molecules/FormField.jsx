import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';

const FormField = ({ 
  type = 'text',
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = false,
  className = '',
  ...props 
}) => {
  const handleChange = (e) => {
    onChange?.(name, e.target.value);
  };

  if (type === 'select') {
    return (
      <Select
        label={label}
        name={name}
        value={value}
        onChange={handleChange}
        options={options}
        error={error}
        required={required}
        className={className}
        {...props}
      />
    );
  }

  return (
    <Input
      type={type}
      label={label}
      name={name}
      value={value}
      onChange={handleChange}
      error={error}
      required={required}
      className={className}
      {...props}
    />
  );
};

export default FormField;