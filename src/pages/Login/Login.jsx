import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../components/shared/SocialLogin";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa6";
import Container from "../../components/shared/Container";
import InnerPageBanner from "../../components/shared/InnerPageBanner";

const Login = () => {
  const { login, loading } = useAuth();
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    login(data?.email, data?.password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "User log in sucess",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "Invalid username or password",
        });
      });
  };

  return (
    <>
      <InnerPageBanner title="Join Us Now" subTitle="signin"></InnerPageBanner>
      <Container>
        <div className=" py-10">
          <div className="mx-auto max-w-xl p-6 rounded-md sm:p-10 border-[#BB9CC0] border text-black">
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl font-bold">Sign In</h1>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              <div className="space-y-4">
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
                  {loading ? (
                    <FaSpinner className=" animate-spin m-auto" />
                  ) : (
                    "Sign In"
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
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="hover:underline hover:text-[#BB9CC0] text-gray-600"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
