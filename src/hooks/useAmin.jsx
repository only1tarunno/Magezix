import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useAuth();
  console.log(loading);
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isPending: isAdminloading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      console.log("before init", user?.email);
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      return res.data?.admin;
    },
  });

  return [isAdmin, isAdminloading];
};

export default useAdmin;
