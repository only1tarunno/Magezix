import Container from "../../components/shared/Container";
import SharedSectionTitle from "../../components/shared/SharedSectionTitle";
import { FaCircle } from "react-icons/fa6";

const Price = () => {
  return (
    <div className="mt-16 py-32 bg-black text-white">
      <Container>
        <SharedSectionTitle
          heading={"Pricing"}
          subHeading={"Here is our current plan and what it includes"}
        ></SharedSectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-10 mt-10">
          <div className="rounded-lg p-8 border-2 flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-2xl">Premium Individual</h3>
              <div className="text-right">
                <h4 className="font-bold text-lg">$9.99</h4>
                <p className="font-semibold text-base uppercase">Per Month</p>
              </div>
            </div>
            <ul className="text-base space-y-2 py-8 flex-grow">
              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Full access to exclusive articles and content
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Ad-free browsing experience
              </li>

              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Access to premium archives and in-depth analyses
              </li>
            </ul>
            <div>
              <button className="rounded-full bg-[#f2f2f2] btn w-full capitalize">
                get Premium Individual
              </button>
            </div>
            <p className="text-center pt-2">
              Elevate your reading experience with our Premium Individual
              subscription.
            </p>
          </div>
          <div className="rounded-lg p-8 border-2 flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-2xl">Premium Duo</h3>
              <div className="text-right">
                <h4 className="font-bold text-lg">$16.99</h4>
                <p className="font-semibold text-base uppercase">Per Month</p>
              </div>
            </div>
            <ul className="text-base space-y-2 py-8 flex-grow">
              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                All benefits of Premium Individual for two users
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Shared access with a partner or family member
              </li>

              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Synchronized preferences and recommendations
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Access to joint subscriptions and exclusive features
              </li>
            </ul>
            <div>
              <button className="rounded-full bg-[#c4da4c] btn w-full capitalize">
                get Premium Duo
              </button>
            </div>
            <p className="text-center pt-2">
              Our Premium Duo subscription offers all the benefits of the
              individual plan for two users
            </p>
          </div>
          <div className="rounded-lg p-8 border-2 flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-2xl"> Premium Family</h3>
              <div className="text-right">
                <h4 className="font-bold text-lg">$29.99</h4>
                <p className="font-semibold text-base uppercase">per month</p>
              </div>
            </div>
            <ul className="text-base space-y-2 py-8 flex-grow">
              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Enhanced version of Premium Duo for multiple users
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Access for multiple family members
              </li>

              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Customizable profiles and preferences for each member
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Curated family-oriented content and activities
              </li>
            </ul>
            <div>
              <button className="rounded-full bg-[#ffd700] btn w-full capitalize">
                get Premium Family
              </button>
            </div>
            <p className="text-center pt-2">
              Elevate your reading experience with our Premium Individual
              subscription.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Price;
