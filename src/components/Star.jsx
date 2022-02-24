import { FaStar } from "react-icons/fa";

export default function Star({ color = "grey", handleSelect = () => { } }) {
  return (
    <FaStar className="star-rating-star"
      color={color}
      onClick={handleSelect}
    />
  );
};

export { Star };