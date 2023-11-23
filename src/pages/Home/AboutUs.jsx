import about from "../../assets/aboutUs.jpg";
import Button from "../../components/shared/Button";
import Container from "../../components/shared/Container";

const AboutUs = () => {
  return (
    <div className="my-16">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="w-full lg:w-[40%]">
            <img src={about} className="w-full" alt="" />
          </div>
          <div className="w-[48%]">
            <h3 className="text-[#ff184e] font-medium text-xl">About Us</h3>
            <h2 className="text-4xl max-w-xl font-bold py-4 capitalize">
              More Than 25+ Years We Provide True News
            </h2>
            <p className="max-w-xl">
              We&lsquo;re dedicated to delivering insightful, timely, and
              engaging content that keeps you informed and inspired. Our
              platform is built on a passion for delivering top-notch
              journalism, thought-provoking analyses, and captivating stories
              that cover a spectrum of topics from current affairs and
              technology breakthroughs to lifestyle trends and cultural
              explorations.
            </p>
            <p className="max-w-xl my-5">
              We strive to be your go-to source for credible information,
              offering a blend of in-depth reporting and diverse perspectives.
              Our team of experienced writers and contributors work tirelessly
              to bring you high-quality content that resonates with your
              curiosity and interests. Join us on a journey where knowledge
              meets discovery, and together, let&lsquo;s explore the world
              through the lens of information and inspiration
            </p>
            <Button text={"Discover"}></Button>
          </div>

          <div></div>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
