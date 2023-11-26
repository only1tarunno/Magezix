import InnerPageBanner from "../../components/shared/InnerPageBanner";
import Container from "../../components/shared/Container";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const [totalduration, setDuration] = useState("1-min");
  const [totalPrice, setPrice] = useState(1.99);
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleDurationChange = (e) => {
    const selectedDuration = e.target.value;
    setDuration(selectedDuration);

    // Update price based on the selected duration
    if (selectedDuration === "1-min") {
      setPrice(1.99);
    } else if (selectedDuration === "5-days") {
      setPrice(14.99);
    } else if (selectedDuration === "10-days") {
      setPrice(24.99); // Change this to the appropriate price for 10 days
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/payment?price=${totalPrice}&duration=${totalduration}`);
  };

  return (
    <>
      <InnerPageBanner
        title="Join Our Exclusive Community - Subscribe Now!"
        subTitle="Subscription"
      ></InnerPageBanner>
      <Container>
        <div className="py-16 max-w-2xl mx-auto">
          <h2 className="my-3 text-4xl font-bold text-center mb-10">
            Please Choose
          </h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email}
                placeholder="Enter Your Email Here"
                disabled
                className="w-full px-3 py-2 border rounded-md border-[#BB9CC0] focus:outline-[#BB9CC0] bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div className="py-3">
              <label className="label">
                <span className="label-text">Duration</span>
              </label>
              <select
                className="select select-bordered w-full uppercase"
                required
                value={totalduration}
                onChange={handleDurationChange}
                name="duration"
              >
                <option value="1-min">1 min</option>
                <option value="5-days">5 days</option>
                <option value="10-days">10 days</option>
              </select>
            </div>
            <div>
              <p className="font-bold text-xl py-3">Total: ${totalPrice}</p>
            </div>
            <button
              type="submit"
              className="btn w-full bg-[#BB9CC0] border-[#BB9CC0] rounded  hover:bg-[#4c5161] hover:border-[#4c5161] text-white font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Subscription;
