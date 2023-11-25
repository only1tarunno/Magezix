import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePremium = () => {
  const { user, loading } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data: isUserPremium = {}, status: isUserPremiumloading } = useQuery({
    queryKey: [user?.email, "isUserPremium"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/UserPremium/${user?.email}`);
      return res.data;
    },
  });

  return [isUserPremium, isUserPremiumloading];
};

export default usePremium;
