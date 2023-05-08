import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoadingPage from "./LoadingPage";
import CarouselCards from "../CarouselCards/CarouselCards";
import HorizontalBarChart from "../Charts/TeamChart";
import RollingAverage from "../Charts/RollingAverage";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Summary = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(undefined);
  const [isProcessed, setIsProcessed] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`https://fpl-wrapped-backend.onrender.com/get/${teamId}`);
      if (!response.ok) {
        if(!toast.isActive("invalid-team-id")){
          toast.error("Failed to get API response, Please check Team ID.", {toastId: "invalid-team-id"});
        }
        navigate('/');
      } else {
        const responseData = await response.json();
        if(responseData["TeamID"] === undefined){
          // need to setData received from the API
          setIsProcessed(false);
          setData(responseData);
        }else{
          setIsProcessed(true);
          setData(responseData);
        }
      }
      setLoading(false);
    } catch (error) {
      if(!toast.isActive("invalid-team-id")){
        toast.error("Failed to get API response, Please check Team ID.", {toastId: "invalid-team-id"});
      }
      navigate('/');
      setLoading(false);
    }
  }, [navigate, teamId])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    loading ? (
      <LoadingPage />
    ) : (
        <Container fluid>
          <Row style={{margin: 'unset'}}>
            <Col>
            <h4>Hey, {isProcessed ? data["FirstName"] : data["manager_first_name"]}</h4>
              <CarouselCards data={data} processed={isProcessed} teamID={teamId} />
            </Col>
          </Row>
          <Row>
            <Col sm>
              <HorizontalBarChart
              data={isProcessed ? data["TeamChart"] : data["weeklyData"]}
              processed={isProcessed}
              teamID={teamId}
              />
            </Col>
            <Col sm>
              <RollingAverage
              data={isProcessed ? data["RollingAverage"] : data["teamHistoryData"]}
              processed={isProcessed}
              teamID={teamId}
              />
            </Col>
          </Row>
          <ToastContainer
            autoClose={2000}
            hideProgressBar
            theme="light"
            position="top-center"
          />
        </Container>
    )
  );
};

export default Summary;
