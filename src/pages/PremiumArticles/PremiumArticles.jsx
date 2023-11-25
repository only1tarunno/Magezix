import { useQuery } from "@tanstack/react-query";
import InnerPageBanner from "../../components/shared/InnerPageBanner";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loader from "../../components/shared/Loader";
import usePremium from "../../hooks/usePremium";
import ArticleCard from "../AllArticle/ArticleCard";
import Container from "../../components/shared/Container";

const PremiumArticles = () => {
  const axiosPublic = useAxiosPublic();
  const [isUserPremium, isUserPremiumloading] = usePremium();

  const { data: premiumAricles, status } = useQuery({
    queryKey: ["premiumAriclesPage"],
    queryFn: async () => {
      const res = await axiosPublic.get("/premiumArticles");
      return res.data;
    },
  });

  if (status === "pending" || isUserPremiumloading === "pending") {
    return <Loader></Loader>;
  }

  return (
    <>
      <InnerPageBanner
        title="Premium Articles"
        subTitle="Premium-Articles"
      ></InnerPageBanner>
      <Container>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 my-16">
          {premiumAricles?.length > 0 ? (
            premiumAricles.map((article, index) => (
              <ArticleCard
                key={`${article._id}_${index}`}
                article={article}
                accessPremium={isUserPremium}
              ></ArticleCard>
            ))
          ) : (
            <div className="pb-14  lg:col-span-2">
              <h2 className="text-center font-bold text-4xl">
                No Service Found
              </h2>
              <p className="text-xl md:text-2xl font-medium text-center">
                Whoops...This information in not available for this moment
              </p>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default PremiumArticles;
