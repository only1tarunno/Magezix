import AboutUs from "./AboutUs";
import AllPublisher from "./AllPublisher";
import Banner from "./Banner";
import ContactUS from "./ContactUS";
import Price from "./Price";
import Staticstics from "./Staticstics";
import TrendingArticle from "./TrendingArticle";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <AboutUs></AboutUs>
      <TrendingArticle></TrendingArticle>
      <Staticstics></Staticstics>
      <AllPublisher></AllPublisher>
      <Price></Price>
      <ContactUS></ContactUS>
    </div>
  );
};

export default Home;
