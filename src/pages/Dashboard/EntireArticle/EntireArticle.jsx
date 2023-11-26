import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/shared/Loader";

import SharedSectionTitle from "../../../components/shared/SharedSectionTitle";
import Articlebox from "./Articlebox";
import Swal from "sweetalert2";

const EntireArticle = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: entireArticles = [],
    status,
    refetch,
  } = useQuery({
    queryKey: ["EntireArticles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/entireArticle");
      return res.data;
    },
  });

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
        const res = await axiosSecure.delete(`/entireArticle/${id}`);
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

  const handleApproved = async (id) => {
    const updatingInfo = {
      Approved: "approved",
    };
    const res = await axiosSecure.patch(`/entireArticle/${id}`, updatingInfo);
    refetch();
    Swal.fire({
      title: "Approved",
      text: "Article has been Approved",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
    console.log(res.data);
  };

  if (status === "pending") {
    return <Loader></Loader>;
  }

  return (
    <div className="py-10">
      <SharedSectionTitle
        heading="Manage Articles"
        subHeading="Streamlining Your Article Management Process"
      ></SharedSectionTitle>
      <div className="overflow-x-auto py-16">
        <table className="table rounded overflow-hidden text-center">
          {/* head */}
          <thead className="bg-[#cccccc] text-black">
            <tr>
              <th>Author Image</th>
              <th>Article Title</th>
              <th>Article Author</th>
              <th>Author Email</th>
              <th>Posted Date</th>
              <th>Status</th>
              <th>Publisher</th>
              <th>Approve</th>
              <th>Premium</th>
              <th>Decline</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {entireArticles?.map((article) => (
              <Articlebox
                key={article?._id}
                handleDelete={handleDelete}
                handleApproved={handleApproved}
                article={article}
              ></Articlebox>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th colSpan="10">Name</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default EntireArticle;
