import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/shared/Loader";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./category.css";
import { Pagination } from "swiper/modules";
import Container from "../../components/shared/Container";
import SharedSectionTitle from "../../components/shared/SharedSectionTitle";
import { useNavigate } from "react-router-dom";

const TrendingArticle = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data: trendingArticles, isLoading } = useQuery({
    queryKey: ["Articles"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trending`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <Container>
      <div className="my-16">
        <div className="mb-10">
          <SharedSectionTitle
            heading={" Trending Articles"}
            subHeading={"Discover What's Hot: Trending Articles You Can't Miss"}
          ></SharedSectionTitle>
        </div>
        <Swiper
          spaceBetween={30}
          centeredSlides={false}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "@0.75": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "@1.00": {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            "@1.50": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "@2.00": {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className="mySwiper  my-12"
        >
          {trendingArticles.map((article) => (
            <SwiperSlide key={article._id}>
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/allArticles/${article._id}`)}
              >
                <img src={article?.image} alt="" />
                <h3 className="text-center text-xl font-bold  text-[#4c5161]">
                  Views: {article?.views}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default TrendingArticle;
