import { useEffect, useState } from "react";
import AboutUs from "./AboutUs";
import AllPublisher from "./AllPublisher";
import Banner from "./Banner";
import ContactUS from "./ContactUS";
import Price from "./Price";
import Staticstics from "./Staticstics";
import TrendingArticle from "./TrendingArticle";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaCcAmazonPay } from "react-icons/fa";
import subs from "../../assets/subscribe.png";

const Home = () => {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenAlert = localStorage.getItem("hasSeenAlert");

    if (!hasSeenAlert) {
      const timer = setTimeout(() => {
        setShowAlert(true);
        localStorage.setItem("hasSeenAlert", "true");
      }, 10000);
      // Clean up the timer on component unmount
      return () => clearTimeout(timer);
    }
  }, []);

  // removing data from localstrorage
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("hasSeenAlert");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (showAlert) {
      Swal.fire({
        title: "Would you like to take subscription?",
        iconHtml: `<img src=${subs} />`,
        customClass: {
          icon: "no-border",
        },
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Take Subscription",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/subscription");
        }
      });
    }
  }, [showAlert, navigate]);
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
