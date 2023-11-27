import { useEffect, useState } from "react";
import SharedSectionTitle from "../../../components/shared/SharedSectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/shared/Loader";
import Swal from "sweetalert2";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentpage] = useState(0);
  const [spin, setSpin] = useState(false);
  const numberOfpages = Math.ceil(count / 5);
  const pages = [...Array(numberOfpages).keys()];
  const {
    data: everyUsers = [],
    status,
    refetch,
  } = useQuery({
    queryKey: ["everyUsersForDashBoard"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/everyUsers?page=${currentPage}&size=5`
      );
      return res.data;
    },
  });

  // pagination
  useEffect(() => {
    axiosSecure.get("/everyUsersCount").then((res) => setCount(res.data.count));
  }, [axiosSecure]);

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

  const handlemakeAdmin = async (user) => {
    const userInfo = {
      role: "admin",
    };

    const res = await axiosSecure.patch(
      `/users/UserPremium/${user?.email}`,
      userInfo
    );
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        title: `${user?.name} is Admin`,
        icon: "success",

        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (status === "pending" || spin) {
    return <Loader></Loader>;
  }

  return (
    <div className="py-16">
      <SharedSectionTitle
        heading={"User Directory"}
        subHeading={"Explore All Users in One Place"}
      ></SharedSectionTitle>
      <div className="overflow-x-auto py-16">
        <table className="table rounded overflow-hidden text-center">
          {/* head */}
          <thead className="bg-[#cccccc] text-black">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {everyUsers?.map((user) => (
              <tr key={user?._id}>
                <td>
                  <div className="flex justify-center items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user?.image} alt="" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>
                  {user?.role === "admin" ? (
                    <span className="font-bold text-green-400">Admin</span>
                  ) : (
                    <button
                      onClick={() => handlemakeAdmin(user)}
                      className="btn btn-sm rounded"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th colSpan="4">
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

export default AllUser;
