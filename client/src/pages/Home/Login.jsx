import { useCheckAuth } from "../../hooks/utility";
import {
  setAuthenticated,
  setUnauthenticated,
} from "../../store/slices/auth/authSlice";
import { ToastContainer } from "react-toastify";
import { useLoginMutation } from "../../store/services/auth/authService";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useToastNotificationsRedirect } from "../../hooks/toast";
import { useDispatch } from "react-redux";
import { useHostname } from "../../hooks/utility";
import { GrBitcoin } from "react-icons/gr";
import { useFormDisabler } from "../../hooks/forms";
import { NavLink } from "react-router-dom";

function Login() {
  useToastNotificationsRedirect();
  useCheckAuth();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const hostname = useHostname();
  const [login, { isLoading }] = useLoginMutation();
  const formRef = useFormDisabler(isLoading);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: location?.state?.user?.email,
      password: location?.state?.user?.password,
    },
  });

  const onSubmit = async (data) => {
    try {
      const user = await login(data).unwrap();
      if (user) {
        cookies.set("token", user.token, { path: "/" });
        cookies.set("user", JSON.stringify(user.user), { path: "/" });
        dispatch(setAuthenticated(user));
        navigate(`/dashboard`, {
          state: {
            message: "Logged in successfully!",
            user,
            isRedirect: true,
          },
        });
      }
    } catch (error) {
      if (error.data.errors) {
        const apiErrors = error.data.errors;
        apiErrors.map((error) => {
          setError(error.param, {
            type: "custom",
            message: error.msg,
          });
        });
        cookies.remove("user");
        cookies.remove("token");
        dispatch(setUnauthenticated());
      }
    }
  };

  return (
    <section className={`bg-gray-200  ${isLoading && "opacity-50"}`}>
      <ToastContainer className="text-xs font-bold mt-14" />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <GrBitcoin className="mr-2" />
          {hostname}
        </Link>
        <div className="w-full bg-white  shadow  md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-medium text-gray-900  ${
                    errors.email && "text-red-500"
                  }`}
                >
                  {` ${
                    errors.email
                      ? errors.email.message
                      : "Your email or username"
                  }`}
                </label>
                <input
                  name="email"
                  id="email"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                    errors.email && "border-red-500"
                  }`}
                  placeholder="name@company.com"
                  required=""
                  {...register("email")}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`block mb-2 text-sm font-medium text-gray-900  ${
                    errors.password ||
                    errors?.email?.message == "Invalid Credentials"
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {` ${
                    errors.password ? errors.password.message : "Your password"
                  }`}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                    errors.password ||
                    errors?.email?.message == "Invalid Credentials"
                      ? "border-red-500"
                      : ""
                  }`}
                  {...register("password")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 ">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline "
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 border hover:bg-black hover:text-white transition ease-in-out duration-300 font-medium  text-sm px-5 py-2.5 text-center"
                {...{ disabled: isLoading }}
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?{" "}
                <Link
                  to={"/register"}
                  className="font-medium text-primary-600 hover:underline "
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
