import ProfilesImg from "../../images/profiles.png";
import BarndIcon from "../../images/brandicon.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import clsx from "clsx";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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

const SignUp = () => {
  const navigate = useNavigate();

  const initialValues = {
    user_firstname: "",
    user_email: "",
    user_phone: "",
    user_password: "",
    user_lastname: "",
    user_city: "",
    user_zipcode: "",
  };

  const UserSchema = Yup.object().shape({
    user_firstname: Yup.string().min(5).required("Firstname is required"),
    user_lastname: Yup.string().min(5).required("Lastname is required"),
    user_email: Yup.string()
      .email("Email is wrong formate")
      .required("Email Id is required"),
    user_password: Yup.string().required("Password is reqired"),
    user_city: Yup.string().required("State is required"),
    user_zipcode: Yup.string()
      .matches(/^[0-9]+$/, "Zip code must contain only numbers")
      .required("Zip code is required"),
    user_phone: Yup.string()
      .matches(/^[0-9]+$/, "Mobile Number contain only numbers")
      .required("Phone number code is required")
      .min(10),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: UserSchema,
      onSubmit: async (val) => {
        try {
          const response = await axios.post(
            "https://syoft.dev/Api/user_registeration/api/user_registeration",
            val
          );
          const result = response.data;

          if (result.status) {
            console.log("User created successfully", result);
            await Toast.fire({
              icon: "success",
              text: "You have succrssfully Registered",
              background: "green",
              color: "white",
            });
            navigate("/signin");
          } else {
            console.error("Invalid credentials", result.msg);
            Toast.fire({
              icon: "error",
              title: "User Details are wrong Please Enter correct details",
              background: "red",
              color: "white",
            });
          }
        } catch (error) {
          console.error("Error creating user", error);
          alert("An error occurred. Please try again.");
        }
      },
    });

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex justify-center items-center lg:w-[50%] w-[100%] h-[50vh] lg:h-[110vh] bg-[#1E293B] ">
        <div className="lg:w-[70%] w-[90%] text-[#dfdee0] flex flex-col gap-[20px]">
          <h1 className="text-[30px] lg:text-[40px] text-white  font-semibold">
            welcome to our community
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
              alt="profiles_image"
            />
            <p className="text-[12px] lg:text-[14px]">
              Morethan 17k peoples joined us. Its your turn
            </p>
          </div>
        </div>
      </div>
      <div className="lg:w-[50%] w-[100%] h-[50vh] lg:h-[100vh]">
        <div className="flex flex-col justify-center p-[40px]">
          <img className="lg:w-[60px] w-[40px]" src={BarndIcon} alt="icon" />
          <div className="lg:mt-[20px] mt-[10px]">
            <h1 className="lg:text-[35px] text-[25px] font-bold"> Sgin up</h1>
            <p className="font-semibold text-[12px] lg:text-[14px] mt-[5px]">
              Aldrady have an account?
              <span
                className="text-blue-500 cursor-pointer ml-[3px]"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </span>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="">
              <div className="flex flex-col lg:flex-row lg:gap-[30px]">
                <div>
                  <div className="mt-8 mb-4  flex flex-col">
                    <label className="form-label font-semibold text-dark text-[14px] lg:text-[16px]">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="First Name"
                      type="text"
                      autoComplete="off"
                      name="user_firstname"
                      value={values.user_firstname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={clsx(
                        "bg-gray-50 border lg:w-[350px] h-[40px] outline-none  mt-[10px] border-gray-300 text-gray-900 text-sm  rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      )}
                    />
                    {errors.user_firstname && touched.user_firstname && (
                      <span className="text-red-500 font-medium text-sm">
                        {errors.user_firstname}
                      </span>
                    )}
                  </div>
                  <div className="mb-4  flex flex-col ]">
                    <label className="form-label   font-semibold text-darktext-[14px] lg:text-[16px]">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="Name"
                      type="text"
                      autoComplete="off"
                      name="user_lastname"
                      value={values.user_lastname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={clsx(
                        "bg-gray-50 border lg:w-[350px] h-[40px] outline-none  mt-[10px] border-gray-300 text-gray-900 text-sm  rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      )}
                    />
                    {errors.user_lastname && touched.user_lastname && (
                      <span className="text-red-500 font-medium text-sm">
                        {errors.user_lastname}
                      </span>
                    )}
                  </div>
                  <div className="mb-4 flex flex-col ]">
                    <label className="form-label font-semibold text-darktext-[14px] lg:text-[16px]">
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
                        "bg-gray-50 border lg:w-[350px] h-[40px] outline-none  mt-[10px] border-gray-300 text-gray-900 text-sm  rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      )}
                    />
                    {errors.user_email && touched.user_email && (
                      <span className="text-red-500 font-medium text-sm">
                        {errors.user_email}
                      </span>
                    )}
                  </div>
                  <div className="mb-4 flex flex-col ]">
                    <label className="form-label font-semibold text-darktext-[14px] lg:text-[16px]">
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
                        "bg-gray-50 border lg:w-[350px] h-[40px] outline-none  mt-[10px] border-gray-300 text-gray-900 text-sm  rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      )}
                    />
                    {errors.user_password && touched.user_password && (
                      <span className="text-red-500 font-medium text-sm">
                        {errors.user_password}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="mb-4 lg:mt-8 flex flex-col ">
                    <label className="form-label font-semibold text-dark text-[14px] lg:text-[16px]">
                      Mobile no <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="First Name"
                      type="text"
                      autoComplete="off"
                      name="user_phone"
                      value={values.user_phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={clsx(
                        "bg-gray-50 border lg:w-[280px] h-[40px] outline-none  mt-[10px] border-gray-300 text-gray-900 text-sm  rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      )}
                    />
                    {errors.user_phone && touched.user_phone && (
                      <span className="text-red-500 font-medium text-sm">
                        {errors.user_phone}
                      </span>
                    )}
                  </div>
                  <div className="mb-4 flex flex-col ">
                    <label className="form-label font-semibold text-dark text-[14px] lg:text-[16px]">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="First Name"
                      type="text"
                      autoComplete="off"
                      name="user_city"
                      value={values.user_city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={clsx(
                        "bg-gray-50 border lg:w-[280px] h-[40px] outline-none  mt-[10px] border-gray-300 text-gray-900 text-sm  rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      )}
                    />
                    {errors.user_city && touched.user_city && (
                      <span className="text-red-500 font-medium text-sm">
                        {errors.user_city}
                      </span>
                    )}
                  </div>
                  <div className="mb-4 flex flex-col ">
                    <label className="form-label font-semibold text-dark text-[14px] lg:text-[16px]">
                      Zip Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="First Name"
                      type="text"
                      autoComplete="off"
                      name="user_zipcode"
                      value={values.user_zipcode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={clsx(
                        "bg-gray-50 border lg:w-[280px] h-[40px] outline-none  mt-[10px] border-gray-300 text-gray-900 text-sm  rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      )}
                    />
                    {errors.user_zipcode && touched.user_zipcode && (
                      <span className="text-red-500 font-medium text-sm">
                        {errors.user_zipcode}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-8 flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="mr-2 size-[12px] lg:size-[15px]"
                />
                <label htmlFor="terms" className="text-[12px] lg:text-[16px]">
                  I agree to the{" "}
                  <a href="/terms" className="text-blue-500">
                    Terms of Services
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-blue-500">
                    Privacy Policy
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-500 lg:text-[16px] text-[14px] text-white lg:h-[40px] h-[30px] w-full  hover:bg-blue-600 rounded-[40px] font-semibold"
              >
                Create Your free account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
