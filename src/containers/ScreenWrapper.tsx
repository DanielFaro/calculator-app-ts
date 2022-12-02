import './ScreenWrapper.css';

const ScreenWrapper = ({ children }: { children: JSX.Element[] }) => {
  return <div className="screen-wrapper">{children}</div>;
};

export default ScreenWrapper;
