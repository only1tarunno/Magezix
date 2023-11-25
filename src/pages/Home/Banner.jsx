import { useEffect, useState } from "react";

import useAxiosPublic from "../../hooks/useAxiosPublic";
import Button from "../../components/shared/Button";
import { Link } from "react-router-dom";

const Banner = () => {
  const axiosPublic = useAxiosPublic();

  const [curentinfo, setCurrentinfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosPublic.get(`/trending`);
        const fetchedData = res.data;
        const { title, image, description, _id } = fetchedData[0];
        const bannerInfo = { title, image, description, _id };
        setCurrentinfo(bannerInfo);
        // Set other states or perform operations with the fetched data
      } catch (error) {
        // Handle errors
      }
    };

    fetchData(); // Trigger the data fetching when the component mounts
  }, [axiosPublic]);

  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${curentinfo?.image})` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content ">
        <div className="w-full px-5 lg:px-0 lg:max-w-[800px] space-y-5">
          <h1 className="font-bold text-4xl uppercase lg:text-5xl text-white">
            {curentinfo?.title}
          </h1>
          <p className="text-base lg:text-lg text-white">
            {curentinfo?.description}
          </p>
          <div>
            <Link to={"/allArticles"}>
              <Button text={"Explore"}></Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
