import Star from "./Star";
import './StarRating.css'

export default function StarRating({ setNumSelectedStars=()=>{}, numSelectedStars }) {
  const getColor = (i, numSelectedStars) => {
    return i < numSelectedStars ? "yellow" : "grey";
  };

  return (
    <div className="star-rating">
      {Array.from({ length: 5 }).map((e, i) => (
        <Star
          key={i*Date.now()*Math.random()}
          color={getColor(i, numSelectedStars)}
          handleSelect={() => setNumSelectedStars(i + 1)}
        />
      ))}
    </div>
  );
};

export { StarRating };