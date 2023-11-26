import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddPublisher = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const publisherInfo = {
      name: data?.name,
      image: data?.photo,
    };

    const res = await axiosSecure.post(`/publisher`, publisherInfo);

    if (res.data._id) {
      Swal.fire({
        icon: "success",
        title: "Publisher has been added",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
    }
  };

  return (
    <div className="flex w-full  justify-center items-center min-h-screen">
      <div className="flex flex-col w-full lg:w-1/2 p-6 rounded-md sm:p-10 border border-[#BB9CC0]">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Add Publisher</h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Publisher Name
              </label>
              <input
                type="text"
                {...register("name")}
                required
                placeholder="Publisher Name"
                className="w-full px-3 py-2 border rounded-md border-[#BB9CC0] focus:outline-[#BB9CC0] bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Publisher Logo URL
              </label>
              <input
                type="url"
                {...register("photo")}
                placeholder="Publisher Logo URL"
                required
                className="w-full px-3 py-2 border rounded-md border-[#BB9CC0] focus:outline-[#BB9CC0] bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-[#BB9CC0] w-32 rounded-md py-3 text-white"
            >
              Add Publisher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPublisher;
