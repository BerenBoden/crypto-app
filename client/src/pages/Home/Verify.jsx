import { useVerifyEmailMutation } from "../../store/services/auth/authService";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname, search } = location;
  const [verifyEmail, { error, isLoading }] = useVerifyEmailMutation();
  useEffect(() => {
    const verify = async () => {
      try {
        const { redirect, message, user } = await verifyEmail({
          id: pathname.split("/")[3],
          token: search.split("=")[1],
        }).unwrap();
        console.log(message, redirect)
        navigate(redirect, {
          state: {
            message,
            user,
            isRedirect: true,
          },
        });
      } catch (err) {
        console.log(err);
      }
    };

    verify();
  }, []);
  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div className="h-screen w-screen">
        <h1 className="text-center text-2xl text-black font-bold">
          Error verifying email. Please try again or sign up for a new account.
        </h1>
      </div>
    );
  }
}

export default Verify;
