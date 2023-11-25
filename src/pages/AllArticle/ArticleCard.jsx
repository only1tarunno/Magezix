import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";

/* eslint-disable react/prop-types */
const ArticleCard = ({ article, accessPremium }) => {
  const { _id, title, image, publisher, description, premium } = article;
  const { premiumTaken, premimiumExpire, email } = accessPremium;
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handlePremiumArticleDetails = (id) => {
    const currentDate = new Date();

    const expireDate = new Date(premimiumExpire);

    if (currentDate.getTime() <= expireDate.getTime()) {
      console.log("user premium");
      navigate(`/allArticles/${id}`);
    } else {
      console.log("user not premium");
      const userInfo = {
        premiumTaken: false,
      };
      axiosSecure.patch(`/users/${email}`, userInfo).then((res) => {
        console.log(res.data);
        queryClient.invalidateQueries({ queryKey: [email, "isUserPremium"] });
      });
    }
  };

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
            {premium === "premium" ? (
              <button
                disabled={!premiumTaken}
                onClick={() => handlePremiumArticleDetails(_id)}
                className="btn bg-[#ff184e] border-[#ff184e] rounded  hover:bg-[#4c5161] hover:border-[#4c5161] text-white font-medium uppercase"
              >
                Details
              </button>
            ) : (
              <button
                onClick={() => navigate(_id)}
                className="btn bg-[#ff184e] border-[#ff184e] rounded  hover:bg-[#4c5161] hover:border-[#4c5161] text-white font-medium uppercase"
              >
                Details
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
