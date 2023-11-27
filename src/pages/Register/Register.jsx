import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/shared/SocialLogin";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa6";
import InnerPageBanner from "../../components/shared/InnerPageBanner";
import Container from "../../components/shared/Container";
import { useState } from "react";

const Register = () => {
  const [spin, setspin] = useState(false);
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    const pass = data?.password;
    if (pass.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Please Enter Atleast 6 Character",
      });
      return;
    } else if (!/(?=.*[A-Z])/.test(pass)) {
      Swal.fire({
        icon: "error",
        title: "Please Enter Atleast One Capital Letter",
      });
      return;
    } else if (!/(?=.*[0-9])/.test(pass)) {
      Swal.fire({
        icon: "error",
        title: "Please Enter Atleast One Numeric Number",
      });
      return;
    } else if (!/^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/.test(pass)) {
      Swal.fire({
        icon: "error",
        title: "Please Enter Atleast One Special Character",
      });
      return;
    }
    setspin(true);
    createUser(data?.email, pass)
      .then(() => {
        console.log();
        updateUserProfile(data?.name, data?.photo).then(() => {
          // create user in data base
          const userInfo = {
            name: data?.name,
            email: data?.email,
            image: data?.photo,
            premiumTaken: false,
            role: "user",
          };
          axiosPublic.post("/users", userInfo).then(() => {
            Swal.fire({
              icon: "success",
              title: "User created successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            reset();
            navigate(from, { replace: true });
            setspin(false);
          });
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: err.message,
        });
        setspin(false);
      });
  };

  return (
    <>
      <InnerPageBanner title="Join Us Now" subTitle="signup"></InnerPageBanner>
      <Container>
        <div className=" py-10">
          <div className="mx-auto max-w-xl p-6 rounded-md sm:p-10 border-[#BB9CC0] border text-black">
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
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
                    {...register("name")}
                    required
                    placeholder="Enter Your Name Here"
                    className="w-full px-3 py-2 border rounded-md border-[#BB9CC0] focus:outline-[#BB9CC0] bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Profile PhotoUrl
                  </label>
                  <input
                    type="url"
                    {...register("photo")}
                    placeholder="Enter Your Image URL"
                    required
                    className="w-full px-3 py-2 border rounded-md border-[#BB9CC0] focus:outline-[#BB9CC0] bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Email address
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Enter Your Email Here"
                    required
                    className="w-full px-3 py-2 border rounded-md border-[#BB9CC0] focus:outline-[#BB9CC0] bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />
                </div>
                <div>
                  <div className="flex justify-between">
                    <label htmlFor="password" className="text-sm mb-2">
                      Password
                    </label>
                  </div>
                  <input
                    type="password"
                    {...register("password")}
                    required
                    placeholder="*******"
                    className="w-full px-3 py-2 border rounded-md border-[#BB9CC0] focus:outline-[#BB9CC0] bg-gray-200 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-[#BB9CC0] w-full rounded-md py-3 text-white"
                >
                  {spin ? (
                    <FaSpinner className=" animate-spin m-auto" />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            </form>
            <div className="flex items-center pt-4 space-x-1">
              <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
              <p className="px-3 text-sm dark:text-gray-400">
                Signup with social accounts
              </p>
              <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            </div>

            <SocialLogin></SocialLogin>
            <p className="px-6 text-sm text-center text-black">
              Already have an account?{" "}
              <Link
                to="/login"
                className="hover:underline hover:text-[#BB9CC0] text-gray-600"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Register;
