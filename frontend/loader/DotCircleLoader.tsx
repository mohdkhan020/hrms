import "./Loader.css";

export default function DotCircleLoader() {
  return (
    <div className="loader">
      <div className="circle">
        <div className="dot"></div>
        <div className="outline"></div>
      </div>
      <div className="circle">
        <div className="dot"></div>
        <div className="outline"></div>
      </div>
      <div className="circle">
        <div className="dot"></div>
        <div className="outline"></div>
      </div>
      <div className="circle">
        <div className="dot"></div>
        <div className="outline"></div>
      </div>
    </div>
  );
}
