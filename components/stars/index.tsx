import loRange from "lodash/range";

// import styles from "./stars.module.scss"; // try css modules later

const starCount = loRange(50);

const Stars = () => {
  return (
    <div className="stars">
      {starCount.map((i) => (
        <div className="star" key={`star-${i}`}></div>
      ))}
    </div>
  );
};

export default Stars;
