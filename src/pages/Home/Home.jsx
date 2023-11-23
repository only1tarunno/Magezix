import AllPublisher from "./AllPublisher";
import Banner from "./Banner";
import Staticstics from "./Staticstics";
import TrendingArticle from "./TrendingArticle";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <TrendingArticle></TrendingArticle>
      <AllPublisher></AllPublisher>
      <Staticstics></Staticstics>
    </div>
  );
};

export default Home;
