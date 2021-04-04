import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

function Rating({ value, text, color }) {
  return (
    <div className="rating">
      <span>
        <FontAwesomeIcon
          style={{ color }}
          icon={value >= 1 ? faStar : value >= 0.5 ? faStarHalf : farStar}
        />
      </span>
      <span>
        <FontAwesomeIcon
          style={{ color }}
          icon={value >= 2 ? faStar : value >= 1.5 ? faStarHalf : farStar}
        />
      </span>
      <span>
        <FontAwesomeIcon
          style={{ color }}
          icon={value >= 3 ? faStar : value >= 2.5 ? faStarHalf : farStar}
        />
      </span>
      <span>
        <FontAwesomeIcon
          style={{ color }}
          icon={value >= 4 ? faStar : value >= 3.5 ? faStarHalf : farStar}
        />
      </span>
      <span>
        <FontAwesomeIcon
          style={{ color }}
          icon={value >= 5 ? faStar : value >= 4.5 ? faStarHalf : farStar}
        />
      </span>
      {text && <span>{text}</span>}
    </div>
  );
}

export default Rating;
