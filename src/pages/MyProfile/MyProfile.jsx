import { Link } from "react-router-dom";
import Container from "../../components/shared/Container";
import usePremium from "../../hooks/usePremium";
import Button from "../../components/shared/Button";
import Loader from "../../components/shared/Loader";
import SharedSectionTitle from "../../components/shared/SharedSectionTitle";

const MyProfile = () => {
  const [isUserPremium, isUserPremiumloading] = usePremium();
  const { name, email, image } = isUserPremium;

  if (isUserPremiumloading === "pending") {
    return <Loader></Loader>;
  }
  return (
    <div className="pt-24">
      <SharedSectionTitle
        heading="Manage Profile "
        subHeading="Welcome to your profile page"
      ></SharedSectionTitle>
      <Container>
        <div className="flex flex-col lg:flex-row gap-5 py-16 justify-center">
          <div className="order-2 self-center lg:order-1 w-full lg:max-w-sm space-y-3">
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
              <Link to="/dashboard/updateProfile">
                <Button text={"Update profile"}></Button>
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2 w-full lg:max-w-sm">
            <img
              src={image}
              className=" h-48 w-48 rounded-[50%] object-cover"
              alt=""
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MyProfile;
