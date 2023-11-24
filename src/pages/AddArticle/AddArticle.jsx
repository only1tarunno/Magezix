import { useForm } from "react-hook-form";
import InnerPageBanner from "../../components/shared/InnerPageBanner";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/shared/Container";
import { useEffect, useState } from "react";
import Select from "react-select";

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
  const { register, handleSubmit } = useForm();
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
        title: data.title,
        image: res.data.data.display_url,
        publisher: data.publisher,
        tags: selectedOption.map(({ value }) => value),
        description: data.description,
        Approved: "pending",
        premium: "basic",
        views: 0,
      };

      const menuRes = await axiosSecure.post("/allArticles", articleInfo);
      console.log(menuRes.data);
    }
  };
  return (
    <div>
      <InnerPageBanner
        title="Add A Article"
        subTitle="addArticle"
      ></InnerPageBanner>
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
                </label>
                <select
                  className="select select-bordered w-full uppercase"
                  required
                  {...register("publisher")}
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
              className="btn bg-rose-500 w-full rounded-md py-3 text-white"
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
