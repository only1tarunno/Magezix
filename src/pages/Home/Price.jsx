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
              <h3 className="font-bold text-2xl">1 Minute Offer</h3>
              <div className="text-right">
                <h4 className="font-bold text-lg">$0.99</h4>
                <p className="font-semibold text-base uppercase">1 Minute</p>
              </div>
            </div>
            <ul className="text-base space-y-2 py-8 flex-grow">
              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Instant access to select premium articles
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Brief trial of ad-free browsing
              </li>

              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Quick glimpse into personalized recommendations
              </li>
            </ul>
            <div>
              <button className="rounded-full bg-[#f2f2f2] btn w-full capitalize">
                get 1 Minute Offer
              </button>
            </div>
            <p className="text-center pt-2">
              Our 1 Minute Offer grants instant access to select premium
              articles and ad-free browsing trial.
            </p>
          </div>
          <div className="rounded-lg p-8 border-2 flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-2xl">5 Days Offer</h3>
              <div className="text-right">
                <h4 className="font-bold text-lg">$4.99</h4>
                <p className="font-semibold text-base uppercase">5 days</p>
              </div>
            </div>
            <ul className="text-base space-y-2 py-8 flex-grow">
              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Full access to exclusive articles for 5 days
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Ad-free browsing throughout the duration
              </li>

              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Personalized recommendations for the trial period
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Access to premium community forums and discussions
              </li>
            </ul>
            <div>
              <button className="rounded-full bg-[#c4da4c] btn w-full capitalize">
                get 5 Days Offer
              </button>
            </div>
            <p className="text-center pt-2">
              Experience an extended, seamless ad-free browsing 5-day journey
              with our premium features.
            </p>
          </div>
          <div className="rounded-lg p-8 border-2 flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-2xl"> 10 Days Offer</h3>
              <div className="text-right">
                <h4 className="font-bold text-lg">$8.99</h4>
                <p className="font-semibold text-base uppercase">10 days</p>
              </div>
            </div>
            <ul className="text-base space-y-2 py-8 flex-grow">
              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Comprehensive access to premium content for 10 days
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Uninterrupted ad-free browsing for the entire duration
              </li>

              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Tailored recommendations and curated insights
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Exclusive access to live webinars and expert sessions
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-[5px]">
                  <FaCircle />
                </span>
                Priority support for any queries or assistance
              </li>
            </ul>
            <div>
              <button className="rounded-full bg-[#ffd700] btn w-full capitalize">
                get 10 Days Offer
              </button>
            </div>
            <p className="text-center pt-2">
              Enjoy comprehensive access, personalized insights, and delve
              deeper with exclusive live webinars.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Price;
