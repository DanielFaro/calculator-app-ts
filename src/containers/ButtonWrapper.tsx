import './ButtonWrapper.css';

const ButtonWrapper = ({ children }: { children: JSX.Element[] }) => {
  return <div className="buttonWrapper">{children}</div>;
};

export default ButtonWrapper;
