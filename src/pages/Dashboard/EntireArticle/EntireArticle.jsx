import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/shared/Loader";

import SharedSectionTitle from "../../../components/shared/SharedSectionTitle";
import Articlebox from "./Articlebox";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const EntireArticle = () => {
  const axiosSecure = useAxiosSecure();
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentpage] = useState(0);
  const [spin, setSpin] = useState(false);
  const numberOfpages = Math.ceil(count / 6);
  const pages = [...Array(numberOfpages).keys()];
  const {
    data: entireArticles = [],
    status,
    refetch,
  } = useQuery({
    queryKey: ["EntireArticles"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/entireArticle?page=${currentPage}&size=6`
      );
      return res.data;
    },
  });

  // pagination
  useEffect(() => {
    axiosSecure
      .get("/entireArticlesCount")
      .then((res) => setCount(res.data.count));
  }, [axiosSecure]);

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
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        title: "Article has been Approved",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handlePremium = async (id) => {
    const updatingInfo = {
      premium: "premium",
    };
    const res = await axiosSecure.patch(`/entireArticle/${id}`, updatingInfo);

    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        title: "Article is premium now",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDecline = async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const updatingInfo = {
      Approved: "denied",
      premium: "basic",
      reason: e.target.reason.value,
    };
    const res = await axiosSecure.patch(`/entireArticle/${id}`, updatingInfo);

    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        title: "Article is declined",
        icon: "success",
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleItem = async (page) => {
    setSpin(true);
    setCurrentpage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      await refetch();
      setSpin(false);
    };

    fetchData();
  }, [currentPage, refetch]);

  if (status === "pending" || spin) {
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
                handlePremium={handlePremium}
                handleDecline={handleDecline}
                article={article}
              ></Articlebox>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th colSpan="10">
                {pages?.map((page) => (
                  <button
                    className={`mx-2 text-center btn btn-sm w-[33px]  rounded-[50%] ${
                      currentPage === page ? "bg-[#bb9cc0]" : "bg-gray-200"
                    }`}
                    onClick={() => handleItem(page)}
                    key={page}
                  >
                    {page + 1}
                  </button>
                ))}
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default EntireArticle;
