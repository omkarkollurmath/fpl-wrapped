import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoadingPage from "./LoadingPage";
import CarouselCards from "./CarouselCards/CarouselCards";
import HorizontalBarChart from "./Charts/TeamChart";
import RollingAverage from "./Charts/RollingAverage";

const Summary = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = useCallback(async (team) => {
    setIsFetching(true);
    try {
      const response = await fetch(`http://localhost:8000/get/${team}`);
      if (!response.ok) {
        setError(true);
      } else {
        const responseData = await response.json();
        if (responseData["TeamID"] === undefined) {
          setIsProcessed(false);
          setData(responseData);
        } else {
          setIsProcessed(true);
                 setData(responseData);
        }
      }
    } catch (error) {
      setError(true);
    }
    setLoading(false);
    setIsFetching(false);
  }, []);

  const memoizedFetchData = useCallback(() => fetchData(teamId), [fetchData, teamId]);

  useEffect(() => {
    memoizedFetchData();
  }, [memoizedFetchData]);

  useEffect(() => {
    if (error) {
      if (!toast.isActive("invalid-team-id")) {
        toast.error("Failed to get API response, Please check Team ID.", {
          toastId: "invalid-team-id",
        });
      }
      navigate("/");
    }
  }, [navigate, error]);

  return (
    loading ? (
      <LoadingPage />
    ) : (
      <div>
        <CarouselCards data={data} processed={isProcessed} teamID={teamId} />
        <HorizontalBarChart
          data={isProcessed ? data["TeamChart"] : data["weeklyData"]}
          processed={isProcessed}
          teamID={teamId}
        />
        <RollingAverage
          data={data["teamHistoryData"]}
          processed={isProcessed}
        />
        {error && (
          <ToastContainer
            autoClose={2000}
            hideProgressBar
            theme="light"
            position="top-center"
          />
        )}
      </div>
    )
  );
};

export default Summary;
