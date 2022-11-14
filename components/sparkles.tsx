import { useState } from "react";

import random from "lodash/random";
import useRandomInterval from "@hooks/useRandomInterval";

interface LocationProps {
  top: string;
  left: string;
}

interface StyleProps {
  color: string;
  size: number;
  style: LocationProps;
}

interface SparkleProps extends StyleProps {
  id: string;
  createdAt: number;
}

interface SparklesProps {
  color?: string;
  isRunning?: boolean;
}

const DEFAULT_COLOR = "#FFC700";

const generateSparkle = (color: string) => {
  const sparkle: SparkleProps = {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 20),
    style: {
      top: random(0, 100) + "%",
      left: random(0, 100) + "%",
    },
  };
  return sparkle;
};

const Sparkles = ({
  color = DEFAULT_COLOR,
  isRunning = true,
}: SparklesProps) => {
  const [sparkles, setSparkles] = useState<SparkleProps[]>([]);

  useRandomInterval(
    () => {
      const sparkle = generateSparkle(color);
      const now = Date.now();
      const nextSparkles: SparkleProps[] = sparkles.filter(
        (sp: SparkleProps) => {
          const delta = now - sp.createdAt;
          return delta < 750;
        }
      );
      nextSparkles.push(sparkle);
      setSparkles(nextSparkles);
    },
    isRunning ? 20 : null,
    isRunning ? 250 : null
  );

  return (
    <>
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
    </>
  );
};

const Sparkle = ({ size, color, style }: StyleProps) => {
  const path =
    "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z";

  return (
    <span className="absolute block animate-comeInOut" style={style}>
      <svg
        className="block animate-spin"
        width={size}
        height={size}
        viewBox="0 0 68 68"
        fill="none"
      >
        <path d={path} fill={color} />
      </svg>
    </span>
  );
};

export default Sparkles;
