import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/shared/Loader";
import InnerPageBanner from "../../components/shared/InnerPageBanner";
import Container from "../../components/shared/Container";

const ArticleDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: article = {}, isLoading } = useQuery({
    queryKey: ["singleArticlesDetails"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allArticles/${id}`);
      return res.data;
    },
  });

  const { title, image, publisher, tags, description, views } = article;

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <InnerPageBanner
        title={title}
        subTitle={"Service Details"}
      ></InnerPageBanner>
      <div>
        <Container>
          <div className="space-y-3 rounded-md my-10 flex flex-col lg:flex-row gap-5 lg:gap-8 items-center justify-start ">
            <div className="w-full lg:w-1/2">
              <img
                className="object-cover w-full  rounded-lg  "
                src={image}
                alt=""
              />
            </div>
            <div className="flex flex-col justify-between w-full lg:w-1/2  ms-0 md:ms-2 leading-normal">
              <h5 className="mb-2 text-2xl lg:text-4xl font-bold tracking-tight text-[#000] dark:text-white text-center md:text-start">
                {title}
              </h5>
              <p className="mb-3 text-xl lg:text-2xl font-bold text-gray-700  text-center md:text-start">
                <span className="font-bold">Publisher :</span>{" "}
                <span className="text-[#ff184e]">{publisher}</span>
              </p>
              <p className="mb-3 font-normal  text-[#4c5161] text-center md:text-start lg:text-xl text-base">
                <span className="font-bold">Summary :</span> {description}
              </p>
              <p className="mb-3 font-normal  text-gray-700 text-center md:text-start lg:text-xl text-base">
                <span className="font-bold">Tags : </span>
                {tags.map((tag, index) => (
                  <span key={index}>
                    {tag} {index !== tags.length - 1 && <span>, </span>}
                  </span>
                ))}
              </p>
              <p className="mb-3 font-normal  text-[#4c5161] text-center md:text-start lg:text-xl text-base">
                <span className="font-bold">Total Views :</span> {views}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ArticleDetails;
