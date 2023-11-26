import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/shared/Container";
import { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import SharedSectionTitle from "../../components/shared/SharedSectionTitle";

// imgbb
const imgbb_key = import.meta.env.VITE_imgbb_key;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;

const options = [
  { value: "technology", label: "technology" },
  { value: "health", label: "health" },
  { value: "environment", label: "environment" },
  { value: "space", label: "space" },
  { value: "AI", label: "AI" },
  { value: "fashion", label: "fashion" },
  { value: "cuisine", label: "cuisine" },
  { value: "education", label: "education" },
  { value: "empowerment", label: "empowerment" },
];

const AddArticle = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [publishers, setpublisher] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    axiosPublic.get("/publisher").then((res) => {
      setpublisher(res.data);
    });
  }, [axiosPublic, setpublisher]);

  const onSubmit = async (data) => {
    const imgfile = { image: data.image[0] };
    const res = await axiosPublic.post(img_hosting_api, imgfile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the data in server

      const articleInfo = {
        title: data?.title,
        image: res?.data?.data?.display_url,
        publisher: data?.publisher,
        tags: selectedOption?.map(({ value }) => value),
        description: data?.description,
        Approved: "pending",
        premium: "basic",
        authorEmail: user?.email,
        authorPhoto: user?.photoURL,
        postedTime: new Date(),
        views: 0,
      };

      await axiosSecure.post("/allArticles", articleInfo);
      Swal.fire({
        icon: "success",
        title: "Article is Pendind",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
    }
  };
  return (
    <div className="pt-16">
      <SharedSectionTitle
        heading={"Add a article"}
        subHeading={"Fill the form with necessary information"}
      ></SharedSectionTitle>
      <div className="py-10">
        <Container>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 w-full lg:w-2/3 mx-auto"
          >
            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered w-full"
                required
                {...register("title")}
              />
            </div>
            <div className="flex items-center flex-col md:flex-row justify-between w-full">
              <div className="form-control w-full md:w-[49%]">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                <input
                  type="file"
                  required
                  {...register("image")}
                  className="file-input file-input-bordered w-full"
                />
              </div>
              <div className="w-full md:w-[49%]">
                <label className="label">
                  <span className="label-text">Publisher</span>
                  {errors.publisher && (
                    <span className="text-red-600">Select a Publisher</span>
                  )}
                </label>
                <select
                  className="select select-bordered w-full uppercase"
                  required
                  defaultValue={"SMASHBANG"}
                  {...register("publisher", { required: true })}
                >
                  {publishers.map((publisher) => (
                    <option key={publisher._id} value={publisher.name}>
                      {publisher.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Tags</span>
              </label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                isMulti
                required
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Description"
                required
                {...register("description")}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn w-full bg-[#ff184e] border-[#ff184e] rounded  hover:bg-[#4c5161] hover:border-[#4c5161] text-white font-medium"
            >
              Add Article
            </button>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default AddArticle;
