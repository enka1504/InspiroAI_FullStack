import { useAuth, useUser } from "@clerk/clerk-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // e.g., http://localhost:8000

const Testing = () => {
  const { getToken } = useAuth();
  const { user } = useUser();

  console.log("Current User:", user);

 const fetchProtectedData = async () => {
  try {
    
    const token = await getToken();
    
    console.log("Token:", token ? "Received" : "Not received");
    console.log("Fetch URL:", `${BACKEND_URL}/api/test/protected`);

    const response = await fetch(`${BACKEND_URL}/api/test/protected`, {
      method: "GET",
      credentials: "include", 
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    console.log("Protected data:", data);
  } catch (error) {
    console.error("Error fetching protected data:", error);
  }
};

  return (
    <div>
      <button onClick={fetchProtectedData}>
        Click to Test Auth
      </button>
    </div>
  );
};

export default Testing;
