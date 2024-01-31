import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../store/services/auth/authService";
import { Link, useNavigate } from "react-router-dom";
import { useCheckAuth } from "../../hooks/utility";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useFormDisabler } from "../../hooks/forms";
import { useHostname } from "../../hooks/utility";
import { GrBitcoin } from "react-icons/gr";

function Register() {
  useCheckAuth();
  const hostname = useHostname();
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const formRef = useFormDisabler(isLoading);
  const {
    register: registerForm,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      const user = await register(data).unwrap();
      if (user) {
        navigate(`/login`, {
          state: {
            message: "Registration successful!",
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
      }
    }
  };
  return (
    <section className="bg-gray-200">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to='/'
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <GrBitcoin className="mr-2" />
          {hostname}
        </Link>
        <div className="w-full bg-white shadow  md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Create and account
            </h1>
            <form
              className={`${isLoading && "opacity-50"} space-y-4 md:space-y-6`}
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-medium text-gray-900  ${
                    errors.email ? "text-red-500" : ""
                  }`}
                >
                  {errors.email ? `${errors.email.message}` : "Email"}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   ${
                    errors.email && "border-red-500"
                  }`}
                  placeholder="name@gmail.com"
                  {...registerForm("email")}
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className={`block mb-2 text-sm font-medium text-gray-900  ${
                    errors.username ? "text-red-500" : ""
                  }`}
                >
                  {errors.username
                    ? `${errors.username.message}`
                    : "Username"}
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   ${
                    errors.username && "border-red-500"
                  }`}
                  placeholder="username"
                  {...registerForm("username")}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`block mb-2 text-sm font-medium text-gray-900  ${
                    errors.password ? "text-red-500" : ""
                  }`}
                >
                  {errors.password
                    ? `${errors.password.message}`
                    : "Password"}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   ${
                    errors.password && "border-red-500"
                  }`}
                  {...registerForm("password")}
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className={`block mb-2 text-sm font-medium text-gray-900  ${
                    errors.confirmPassword ? "text-red-500" : ""
                  }`}
                >
                  {errors.confirmPassword
                    ? `${errors.confirmPassword.message}`
                    : "Confirm Password"}
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  ${
                    errors.confirmPassword && "border-red-500"
                  }`}
                  {...registerForm("confirmPassword")}
                />
              </div>
              {/* <HCaptcha
                sitekey="75545b99-8349-40c6-a508-9ca3d1051b4b"
                onVerify={(token, ekey) =>
                  handleVerificationSuccess(token, ekey)
                }
              /> */}
              <button
                type="submit"
                className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 border hover:bg-black hover:text-white transition ease-in-out duration-300 font-medium text-sm px-5 py-2.5 text-center "
                {...{ disabled: isLoading }}
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
