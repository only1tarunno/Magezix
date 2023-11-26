import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import usePremium from "../../hooks/usePremium";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loader from "../../components/shared/Loader";

const Updateprofile = () => {
  const [isUserPremium, isUserPremiumloading] = usePremium();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const userInfo = {
      name: data?.name,
      image: data?.photo,
      phoneNum: data?.phoneNum,
      address: data?.address,
    };
    axiosSecure
      .patch(`/users/UserPremium/${isUserPremium?.email}`, userInfo)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Your profile is updated",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/myProfile");
      });
  };

  if (isUserPremiumloading === "pending") {
    return <Loader></Loader>;
  }
  return (
    <div className="flex w-full  justify-center items-center min-h-screen">
      <div className="flex flex-col w-full lg:w-1/2 p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Update Your Profile</h1>
          <p className="text-sm text-gray-400">Fill The Form</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                defaultValue={isUserPremium?.name}
                {...register("name")}
                required
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Profile PhotoUrl
              </label>
              <input
                type="text"
                defaultValue={isUserPremium?.image}
                {...register("photo")}
                placeholder="Enter Your Image URL"
                required
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address not editable
              </label>
              <input
                type="email"
                defaultValue={isUserPremium?.email}
                placeholder="Enter Your Email Here"
                disabled
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label className="text-sm mb-2">Phone Number</label>
              </div>
              <input
                type="text"
                {...register("phoneNum")}
                required
                defaultValue={isUserPremium?.phoneNum && isUserPremium.phoneNum}
                placeholder="017XXX-XXXXXX"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Address
                </label>
              </div>
              <input
                type="text"
                {...register("address")}
                defaultValue={isUserPremium?.address && isUserPremium.address}
                required
                placeholder="No data"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-rose-500 w-full rounded-md py-3 text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Updateprofile;
