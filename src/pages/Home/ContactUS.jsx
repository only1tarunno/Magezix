import contact from "../../assets/contactUs.jpg";
import Container from "../../components/shared/Container";
import SharedSectionTitle from "../../components/shared/SharedSectionTitle";

const ContactUS = () => {
  return (
    <div className="my-16">
      {" "}
      <Container>
        <SharedSectionTitle
          heading={"Cpntact us"}
          subHeading={"Feel free to reach us "}
        ></SharedSectionTitle>
        <div className="flex flex-col md:flex-row items-center justify-between my-16">
          <div className="w-full md:w-[40%]">
            <img src={contact} className="w-full md:w-[350px] ml-auto" alt="" />
          </div>
          <form className="w-full mx-auto md:w-[48%]">
            <input
              type="text"
              placeholder="Name"
              className="w-full my-4 p-3 focus:outline-none border"
            />
            <div className="flex flex-col lg:flex-row justify-between gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 my-4 p-3 focus:outline-none border"
              />
              <input
                type="text"
                placeholder="Phone"
                className="flex-1 my-4 p-3 focus:outline-none border"
              />
            </div>

            <textarea
              className="w-full my-4 p-3 focus:outline-none border"
              placeholder="Message"
              rows="4"
            ></textarea>
            <input
              type="submit"
              value="Submit"
              className="btn bg-[#ff184e] border-[#ff184e] rounded  hover:bg-[#4c5161] hover:border-[#4c5161] text-white font-medium uppercase"
            />
          </form>
        </div>
      </Container>
    </div>
  );
};

export default ContactUS;
