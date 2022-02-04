import loRange from "lodash/range";

import styles from "./stars.module.scss";

const starCount = loRange(50);

const Stars = () => {
  return (
    <div className={styles.stars}>
      {starCount.map((i) => (
        <div className={styles.star} key={`star-${i}`}></div>
      ))}
    </div>
  );
};

export default Stars;
