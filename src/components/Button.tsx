import './Button.css';

interface ButtonProps {
  className?: string;
  value: string | number;
  onClick: () => void;
}
const Button = ({ className, value, onClick }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
