import './Screen.css';

const Screen = ({ value }: { value: string | number }) => {
  return <div className="screen">{value}</div>;
};

export default Screen;
