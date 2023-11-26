import { Link } from "react-router-dom";

import usePremium from "../../hooks/usePremium";
import Button from "../../components/shared/Button";
import Loader from "../../components/shared/Loader";
import Container from "../../components/shared/Container";
import InnerPageBanner from "../../components/shared/InnerPageBanner";

const MyProfile = () => {
  const [isUserPremium, isUserPremiumloading] = usePremium();
  const { name, email, image } = isUserPremium;

  if (isUserPremiumloading === "pending") {
    return <Loader></Loader>;
  }
  return (
    <>
      <InnerPageBanner
        title="Manage Profile "
        subTitle="Profile"
      ></InnerPageBanner>
      <div className="py-16">
        <Container>
          <div className="flex flex-col lg:flex-row gap-5 py-16 justify-center">
            <div className="order-2 self-center text-center lg:text-start lg:order-1 w-full lg:max-w-sm space-y-3">
              <h2 className="font-bold text-2xl">Name: {name}</h2>
              <h3 className="font-bold text-lg">Email: {email}</h3>
              <p>
                Phone Number :{" "}
                {isUserPremium.phoneNum
                  ? isUserPremium.phoneNum
                  : "017XXX-XXXXXX"}
              </p>
              <p>
                Address :{" "}
                {isUserPremium.address ? isUserPremium.address : "No Data"}
              </p>
              <div>
                <Link to="/updateProfile">
                  <Button text={"Update profile"}></Button>
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 w-full lg:max-w-sm">
              <img
                src={image}
                className=" h-48 w-48 rounded-[50%] mx-auto lg:mr-auto object-cover"
                alt=""
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default MyProfile;
