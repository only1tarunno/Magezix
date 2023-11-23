import AllPublisher from "./AllPublisher";
import Banner from "./Banner";
import TrendingArticle from "./TrendingArticle";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <TrendingArticle></TrendingArticle>
      <AllPublisher></AllPublisher>
    </div>
  );
};

export default Home;
