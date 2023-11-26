import Chart from "react-google-charts";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/shared/Loader";

const AdminHome = () => {
  const { user } = useAuth();

  const axiosPublic = useAxiosPublic();
  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ["artcleCountbyCategory"],
    queryFn: async () => {
      const res = await axiosPublic.get("/artcleCountbyCategory");
      return res.data;
    },
  });

  console.log("result", publishers);

  if (isLoading) {
    return <Loader></Loader>;
  }

  const pieOptions = {
    title: "Pie Chart Depicting Publisher Contribution in Articles",
  };

  const barOptions = {
    chart: {
      title: "A Visual Representation of Publication Article Distribution",
      subtitle:
        "Bar Chart Illustrating Percentage Contribution of Publishers in Industry Insights",
    },
  };

  const lineOptions = {
    chart: {
      title: "Visualizing Industry Growth Over Time",
      subtitle:
        "Line Chart Illustrating Evolution of Key Metrics and Market Dynamics",
    },
  };

  return (
    <div className="pt-24 pb-10">
      <h2 className="font-semibold text-2xl md:text-3xl lg:text-5xl text-center">
        Hi, Welcome {user ? user.displayName : <span>Sir</span>}
      </h2>
      <div className="py-10">
        <Chart
          chartType="PieChart"
          data={publishers}
          options={pieOptions}
          width={"100%"}
          height={"400px"}
        />
      </div>
      <div className="flex justify-between flex-col lg:flex-row pb-10">
        <div className="w-full lg:w-[48%]">
          <Chart
            chartType="Line"
            width="100%"
            height="400px"
            data={publishers}
            options={lineOptions}
          />
        </div>
        <div className="w-full lg:w-[48%]">
          <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={publishers}
            options={barOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
