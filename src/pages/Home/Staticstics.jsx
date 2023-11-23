import CountUp from "react-countup";
import Container from "../../components/shared/Container";
import SharedSectionTitle from "../../components/shared/SharedSectionTitle";

const Staticstics = () => {
  return (
    <div className="my-16 py-32 bg-black">
      <Container>
        <div className="mb-16 text-white">
          <SharedSectionTitle
            heading={" Statistic"}
            subHeading={"Statistical Analysis and Findings"}
          ></SharedSectionTitle>
        </div>
        <div className="grid text-white font-bold grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
          <div className="text-center space-y-3">
            <CountUp className="text-5xl" duration={10} end={1000} />
            <h2 className="text-2xl capitalize">all user</h2>
          </div>
          <div className="text-center space-y-3">
            <CountUp className="text-5xl" duration={10} end={1000} />
            <h2 className="text-2xl capitalize">basic user</h2>
          </div>
          <div className="text-center space-y-3">
            <CountUp className="text-5xl" duration={10} end={1000} />
            <h2 className="text-2xl capitalize">premium users</h2>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Staticstics;
