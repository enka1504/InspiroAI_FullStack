import { useAuth, useUser } from "@clerk/clerk-react";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Testing = () => {
  const { getToken } = useAuth();
  const { user } = useUser();

  console.log("Current User:", user);
  const fetchProtectedData = async () => {
    try {
      const token = await getToken({
        template: "inspiro_ai"
      });
      const response = await fetch(`${BACKEND_URL}/api/protected`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error("Failed to fetch protected data");
      }
      const data = await response.json();

      console.log("Protected data:", data);
    }
    catch (error) {
      console.log("Error fetching protected data:", error);
    }
  }
  return (
    <div>
      <button onClick={fetchProtectedData}>Click to Test Auth</button>
    </div>
  )
}

export default Testing;