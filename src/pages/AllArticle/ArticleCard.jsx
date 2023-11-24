import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const ArticleCard = ({ article }) => {
  const { _id, title, image, publisher, description, premium } = article;

  const navigate = useNavigate();

  return (
    <div className="">
      <div
        className={`card lg:card-side bg-base-100 shadow-xl ${
          premium === "premium" && "border-blue-300 border"
        }`}
      >
        <figure className="flex-1">
          <img
            src={image}
            className="w-full h-[292px] object-cover"
            alt={title}
          />
        </figure>
        <div className="card-body flex-1 relative overflow-hidden">
          <h2 className="card-title">{title}</h2>
          <p>Publisher: {publisher}</p>
          <p className="text-control">{description}</p>
          {premium === "premium" && (
            <div className="ribon text-white p-2 absolute">
              <h4>Premium</h4>
            </div>
          )}
          <div className="card-actions w-full">
            <button
              disabled={premium === "premium"}
              onClick={() => navigate(_id)}
              className="btn bg-[#ff184e] border-[#ff184e] rounded  hover:bg-[#4c5161] hover:border-[#4c5161] text-white font-medium uppercase"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
