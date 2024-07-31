import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import clsx from "clsx";
import ProfilesImg from "../../images/profiles.png";
import BarndIcon from "../../images/brandicon.jpg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Configure SweetAlert toast notifications
const Toast = Swal.mixin({
  toast: true,
  position: "bottom-right",
  iconColor: "white",
  background: "green",
  color: "white",
  customClass: {
    popup: "colored-toast",
  },
  timer: 1500,
  showConfirmButton: false,
  timerProgressBar: true,
});

/**
 * SignIn component handles user login.
 */
const SignIn = () => {
  const initialValues = {
    user_email: "",
    user_password: "",
  };

  const navigate = useNavigate();

  // Validation schema using Yup
  const UserSchema = Yup.object().shape({
    user_email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    user_password: Yup.string().required("Password is required"),
  });

  // Formik setup
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: UserSchema,
      onSubmit: async (val) => {
        try {
          const response = await axios.post(
            "https://syoft.dev/Api/userlogin/api/userlogin",
            val
          );
          const result = response.data;

          if (result.status) {
            console.log("User logged in successfully", result);
            localStorage.setItem("userDetails", JSON.stringify(result));

            await Toast.fire({
              icon: "success",
              text: "You have successfully logged in",
              background: "green",
              color: "white",
            });
            navigate("/dashboard");
          } else {
            console.error("Invalid credentials", result.msg);
            Toast.fire({
              icon: "error",
              title: "Incorrect user details. Please try again.",
              background: "red",
              color: "white",
            });
          }
        } catch (error) {
          console.error("Error logging in", error);
          alert("An error occurred. Please try again.");
        }
      },
    });

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex justify-center items-center lg:w-[50%] w-[100%] h-[50vh] lg:h-[110vh] bg-[#1E293B] ">
        <div className="lg:w-[70%] w-[90%] text-[#dfdee0] flex flex-col gap-[20px]">
          <h1 className="text-[30px] lg:text-[40px] text-white font-semibold">
            Welcome to our community
          </h1>
          <p className="text-[14px] lg:text-[18px]">
            Fuse helps developers build organized and well-coded dashboards with
            beautiful and rich modules. Join us and start building your
            application today!
          </p>
          <div className="flex items-center gap-[10px]">
            <img
              className="w-[80px] lg:w-[100px]"
              src={ProfilesImg}
              alt="Profiles"
            />
            <p className="text-[12px] lg:text-[14px]">
              More than 17k people have joined us. It's your turn!
            </p>
          </div>
        </div>
      </div>
      <div className="lg:w-[50%] w-[100%] h-[50vh] lg:h-[100vh]">
        <div className="flex flex-col justify-center p-[40px]">
          <img
            className="lg:w-[60px] w-[40px]"
            src={BarndIcon}
            alt="Brand Icon"
          />
          <div className="lg:mt-[20px] mt-[10px]">
            <h1 className="lg:text-[35px] text-[25px] font-bold">Sign In</h1>
            <p className="font-semibold text-[12px] lg:text-[14px] mt-[5px]">
              Don't have an account?
              <span
                className="text-blue-500 cursor-pointer ml-[3px]"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mt-8">
              {/* Email Field */}
              <div className="mb-4 flex flex-col">
                <label className="form-label font-semibold text-dark text-[14px] lg:text-[16px]">
                  Email Id <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Email Id"
                  type="text"
                  autoComplete="off"
                  name="user_email"
                  value={values.user_email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={clsx(
                    "bg-gray-50 border h-[40px] outline-none mt-[10px] border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  )}
                />
                {errors.user_email && touched.user_email && (
                  <span className="text-red-500 font-medium text-sm">
                    {errors.user_email}
                  </span>
                )}
              </div>
              {/* Password Field */}
              <div className="mb-4 flex flex-col">
                <label className="form-label font-semibold text-dark text-[14px] lg:text-[16px]">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Password"
                  type="password"
                  autoComplete="off"
                  name="user_password"
                  value={values.user_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={clsx(
                    "bg-gray-50 border h-[40px] outline-none mt-[10px] border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  )}
                />
                {errors.user_password && touched.user_password && (
                  <span className="text-red-500 font-medium text-sm">
                    {errors.user_password}
                  </span>
                )}
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-500 lg:mt-[20px] mt-[10px] lg:text-[16px] text-[14px] text-white lg:h-[40px] h-[30px] w-full hover:bg-blue-600 rounded-[40px] font-semibold"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
