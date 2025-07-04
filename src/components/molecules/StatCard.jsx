import Card from '@/components/atoms/Card';
import Stat from '@/components/atoms/Stat';

const StatCard = ({ 
  label,
  value,
  icon,
  trend,
  trendValue,
  color = 'primary',
  className = '',
  ...props 
}) => {
  return (
    <Card className={className} {...props}>
      <Stat
        label={label}
        value={value}
        icon={icon}
        trend={trend}
        trendValue={trendValue}
        color={color}
      />
    </Card>
  );
};

export default StatCard;