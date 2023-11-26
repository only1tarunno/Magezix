import { useQuery } from "@tanstack/react-query";
import Container from "../../components/shared/Container";
import SharedSectionTitle from "../../components/shared/SharedSectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

import Loader from "../../components/shared/Loader";
import TableRows from "./TableRows";
import Swal from "sweetalert2";

const MyArticles = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const {
    data: allArticles = [],
    refetch,
    status,
  } = useQuery({
    queryKey: ["myArticles"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/emalArticles/${user?.email}`);
      return res.data;
    },
  });

  if (status === "pending") {
    return <Loader></Loader>;
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/emalArticles/${id}`);
        refetch();
        if (res.data?.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Article has been deleted.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <div className="pt-36 pb-16">
      <Container>
        <SharedSectionTitle
          heading={"Post overview"}
          subHeading={"Your all post at a glance"}
        ></SharedSectionTitle>
        <div className="overflow-x-auto pt-16">
          <table className="table rounded overflow-hidden text-center">
            {/* head */}
            <thead className="bg-[#cccccc] text-black">
              <tr>
                <th>SL No.</th>
                <th>Image</th>
                <th>Title</th>
                <th>Details</th>
                <th>Status</th>
                <th>isPremium</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allArticles?.map((article, index) => (
                <TableRows
                  key={article._id}
                  article={article}
                  serial={index}
                  handleDelete={handleDelete}
                ></TableRows>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default MyArticles;
