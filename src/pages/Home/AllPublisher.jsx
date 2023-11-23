import Container from "../../components/shared/Container";
import SharedSectionTitle from "../../components/shared/SharedSectionTitle";
import Marquee from "react-fast-marquee";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/shared/Loader";

const AllPublisher = () => {
  const axiosPublic = useAxiosPublic();
  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/publisher");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <Container>
      <SharedSectionTitle
        heading={"All Publisher"}
        subHeading={"Articles Curated by Different Publishers"}
      ></SharedSectionTitle>
      <div className="pt-12">
        <Marquee>
          {publishers.map((item) => (
            <div key={item._id}>
              <img
                src={item?.image}
                alt=""
                className="mx-10 h-44  object-cover"
              />
              <h2 className="pt-1 uppercase text-center">{item?.name}</h2>
            </div>
          ))}
        </Marquee>
      </div>
    </Container>
  );
};

export default AllPublisher;
