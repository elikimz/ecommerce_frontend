// import {
//   useState,
//   useEffect,
//   type ChangeEvent,
//   type FormEvent,
// } from "react";
// import {
//   useGetCurrentUserProfileQuery,
//   useUpdateUserProfileMutation,
// } from "../features/login/loginAPI";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Spinner from "../components/spinner"

// interface UserProfile {
//   name: string;
//   email: string;
//   address: string;
//   phone: string;
//   profile_image: string;
//   gender: string;
//   date_of_birth: string;
// }

// const ProfilePage = () => {
//   const {
//     data: userProfile,
//     error,
//     isLoading,
//   } = useGetCurrentUserProfileQuery({});
//   const [updateUserProfile, { isLoading: isUpdating }] =
//     useUpdateUserProfileMutation();

//   const [formData, setFormData] = useState<UserProfile>({
//     name: "",
//     email: "",
//     address: "",
//     phone: "",
//     profile_image: "",
//     gender: "",
//     date_of_birth: "",
//   });

//   useEffect(() => {
//     if (userProfile) {
//       setFormData({
//         name: userProfile.name || "",
//         email: userProfile.email || "",
//         address: userProfile.address || "",
//         phone: userProfile.phone || "",
//         profile_image: userProfile.profile_image || "",
//         gender: userProfile.gender || "",
//         date_of_birth: userProfile.date_of_birth
//           ? userProfile.date_of_birth.split("T")[0]
//           : "",
//       });
//     }
//   }, [userProfile]);

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       await updateUserProfile(formData).unwrap();
//       toast.success("Profile updated successfully!");
//     } catch (err) {
//       console.error("Failed to update profile:", err);
//       toast.error(
//         "Failed to update profile: " +
//           (err as { data?: { message?: string } }).data?.message ||
//           "Unknown error"
//       );
//     }
//   };

//   if (isLoading) return <Spinner />;
//   if (error) {
//     toast.error("Error loading profile: " + error.toString());
//     return <div>Error loading profile</div>;
//   }

//   return (
//     <div className="p-5 max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-5">Profile Page</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Name:
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Email:
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Address:
//           </label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Phone:
//           </label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Profile Image URL:
//           </label>
//           <input
//             type="text"
//             name="profile_image"
//             value={formData.profile_image}
//             onChange={handleChange}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Gender:
//           </label>
//           <input
//             type="text"
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Date of Birth:
//           </label>
//           <input
//             type="date"
//             name="date_of_birth"
//             value={formData.date_of_birth}
//             onChange={handleChange}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={isUpdating}
//           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//         >
//           {isUpdating ? "Updating..." : "Update Profile"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfilePage;



import  {
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  useGetCurrentUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../features/login/loginAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/spinner";

interface UserProfile {
  name: string;
  email: string;
  address: string;
  phone: string;
  profile_image: string;
  gender: string;
  date_of_birth: string;
}

const ProfilePage = () => {
  const {
    data: userProfile,
    error,
    isLoading,
    refetch,
  } = useGetCurrentUserProfileQuery({});
  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const [formData, setFormData] = useState<UserProfile>({
    name: "",
    email: "",
    address: "",
    phone: "",
    profile_image: "",
    gender: "",
    date_of_birth: "",
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || "",
        email: userProfile.email || "",
        address: userProfile.address || "",
        phone: userProfile.phone || "",
        profile_image: userProfile.profile_image || "",
        gender: userProfile.gender || "",
        date_of_birth: userProfile.date_of_birth
          ? userProfile.date_of_birth.split("T")[0]
          : "",
      });
    }
  }, [userProfile]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          setFormData((prevState) => ({
            ...prevState,
            profile_image: result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData).unwrap();
      toast.success("Profile updated successfully!");
      refetch(); // Refetch the user profile to ensure the latest data is displayed
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error(
        "Failed to update profile: " +
          (err as { data?: { message?: string } }).data?.message ||
          "Unknown error"
      );
    }
  };

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error("Error loading profile: " + error.toString());
    return <div>Error loading profile</div>;
  }

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-5">Profile Page</h1>
      <div className="flex justify-center mb-4">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500">
          {formData.profile_image ? (
            <img
              src={formData.profile_image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Image:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address:
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone:
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender:
          </label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth:
          </label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={isUpdating}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
