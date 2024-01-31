import PaginateChevron from "../partials/dashboard/PaginateChevron";
import {
  useGetAccountQuery,
  useUpdateAccountMutation,
} from "../store/services/account/accountService";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useFormDisabler } from "../hooks/forms";
import { ToastContainer, toast } from "react-toastify";

function Settings() {
  const { user } = useSelector((state) => state.auth);
  const { data: userData } = useGetAccountQuery({ id: user?.id });

  const [updateAccount, { isLoading: updateAccountIsLoading }] =
    useUpdateAccountMutation();
  const form = useFormDisabler(updateAccountIsLoading);
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm({
    defaultValues: {
      id: user?.id,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
    },
  });

  const onSubmit = async ({ firstName, lastName }) => {
    try {
      const data = await updateAccount({
        id: user?.id,
        firstName,
        lastName,
      }).unwrap();
      if (data) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error.data);
      const apiErrors = error.data.errors;
      apiErrors.map((error) => {
        setError(error.param, {
          type: "custom",
          message: error.msg,
        });
      });
    }
  };

  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <ToastContainer className="text-xs font-bold mt-14" />
        <PaginateChevron />
        <div className="shadow-md overflow-y-auto overflow-x-hidden left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full mt-8">
          <div className="relative w-full h-full md:h-auto">
            <div className="relative p-4 bg-white shadow dark:bg-gray-800 sm:p-5">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Account Settings
                </h3>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                ref={form}
                className={`${updateAccountIsLoading && "opacity-50"}`}
              >
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className={` ${
                        (errors.firstName && "text-red-600") ||
                        (errors.id && "text-red-600")
                      } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
                    >
                      {errors.firstName || errors.id
                        ? errors?.firstName?.message || errors.id.message
                        : "First Name"}
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      {...register("firstName")}
                      className={`${
                        (errors.firstName && "border-red-600") ||
                        (errors.id && "border-red-600")
                      } bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                      placeholder="Update your first name"
                    />
                  </div>
                  <input type="hidden" {...register("id")} />
                  <div>
                    <label
                      htmlFor="lastName"
                      className={`${
                        (errors.lastName && "text-red-600") ||
                        (errors.id && "text-red-600")
                      } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
                    >
                      {errors.lastName ? errors.lastName.message : "Last Name"}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      {...register("lastName")}
                      className={`${
                        (errors.lastName && "border-red-600") ||
                        (errors.id && "border-red-600")
                      } bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                      placeholder="Update your last name"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      disabled
                      value={userData?.username}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder=""
                    />
                  </div>
                  <div className="sm:col-span-2 mb-4">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email Address
                    </label>
                    <input
                      value={userData?.email}
                      name="email"
                      id="email"
                      disabled
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    type="submit"
                    className="text-white bg-blue-500 hover:bg-primary-800 focus:ring-4 hover:bg-black transition duration-300 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Update Account Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Settings;
