import CountUp from "react-countup";
import Container from "../../components/shared/Container";
import SharedSectionTitle from "../../components/shared/SharedSectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loader from "../../components/shared/Loader";

const Staticstics = () => {
  const axiosPublic = useAxiosPublic();

  const { data = {}, status } = useQuery({
    queryKey: ["userCountAnalytics"],
    queryFn: async () => {
      const res = await axiosPublic.get("/usersCount");
      return res.data;
    },
  });
  if (status === "pending") {
    return <Loader></Loader>;
  }

  const { allusers, basicUser, premiumUser } = data;

  return (
    <div className="my-16 py-32 bg-black">
      <Container>
        <div className="mb-16 text-white">
          <SharedSectionTitle
            heading={" Statistic"}
            subHeading={"Statistical Analysis and Findings"}
          ></SharedSectionTitle>
        </div>
        <div className="grid text-white font-bold grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          <div className="text-center space-y-3">
            <CountUp className="text-5xl" duration={10} end={allusers} />
            <h2 className="text-2xl capitalize">all user</h2>
          </div>
          <div className="text-center space-y-3">
            <CountUp className="text-5xl" duration={10} end={basicUser} />
            <h2 className="text-2xl capitalize">basic user</h2>
          </div>
          <div className="text-center space-y-3">
            <CountUp className="text-5xl" duration={10} end={premiumUser} />
            <h2 className="text-2xl capitalize">premium user</h2>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Staticstics;
