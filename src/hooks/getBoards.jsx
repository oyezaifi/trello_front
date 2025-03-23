// hooks/getBoards.js
import { useEffect, useState } from "react";
import api from "../utils/axiosInstance/axiosInstance";
import axios from "axios";

const useBoards = (refreshTrigger) => {
  // Accept the trigger as parameter
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchBoards = async () => {
      try {
        const response = await api.get("/boards/getboards", {
          cancelToken: source.token,
        });

        if (response.data.success) {
          setBoards(response.data.data);
          setError(null);
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err.message);
          console.error("Fetch boards error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();

    return () => source.cancel("Component unmounted");
  }, [refreshTrigger]); // Add refreshTrigger to dependencies

  return { boards, loading, error };
};

export default useBoards;
