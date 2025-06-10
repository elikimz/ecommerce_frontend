import  { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import {
  useGetCurrentUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../features/login/loginAPI";

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData).unwrap();
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert(
        "Failed to update profile: " +
          (err as { data?: { message?: string } }).data?.message ||
          "Unknown error"
      );
    }
  };

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error loading profile: {error.toString()}</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Profile Page</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block" }}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block" }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block" }}>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block" }}>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block" }}>Profile Image URL:</label>
          <input
            type="text"
            name="profile_image"
            value={formData.profile_image}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block" }}>Gender:</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block" }}>Date of Birth:</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          disabled={isUpdating}
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
