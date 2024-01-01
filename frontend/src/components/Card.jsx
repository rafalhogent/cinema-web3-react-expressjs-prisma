import React from "react";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const { id, title, year, image, genres, text } = props;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/movie/${id}`)}
      className="my-2 flex flex-col overflow-clip cursor-pointer"
    >
      <img className="object-cover mb-2 " src={image} />
      <div className="inline my-2">
        {genres?.map((g) => {
          return (
            <span
              key={g.id}
              className=" mr-2 text-xs p-1 sm:bg-cyan-800 text-white"
            >
              {g.naam}
            </span>
          );
        })}
      </div>
      <h3 className=" text-lg font-bold">{title}</h3>
      <h4 className="mb-2 text-right text-sm">{year}</h4>
      <p>{text?.substring(0, 100)}...</p>
    </div>
  );
};

export default Card;
