import { useState } from 'react';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const SearchBar = ({ 
  placeholder = "Search...",
  onSearch,
  className = '',
  ...props 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch?.('');
  };

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <div className="flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon="Search"
          iconPosition="left"
          {...props}
        />
      </div>
      {searchTerm && (
        <Button
          type="button"
          variant="ghost"
          onClick={handleClear}
          icon="X"
          size="md"
        />
      )}
    </form>
  );
};

export default SearchBar;