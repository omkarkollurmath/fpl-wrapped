import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoadingPage from "./LoadingPage";
import CarouselCards from "./CarouselCards/CarouselCards";
import HorizontalBarChart from "./Charts/TeamChart";
import RollingAverage from "./Charts/RollingAverage";

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
      const response = await fetch(`http://localhost:8000/get/${teamId}`);
      if (!response.ok) {
        if(!toast.isActive("invalid-team-id")){
          toast.error("Failed to get API response, Please check Team ID.", {toastId: "invalid-team-id"});
        }
        navigate('/');
      } else {
        const responseData = await response.json();
        console.log('@@@' + JSON.stringify(responseData));
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
      <div>
        <Container fluid>

        <Row>
        <Col>
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
          data={data["teamHistoryData"]}
          processed={isProcessed}
        />
          </Col>
        </Row>
        
        
        {/* <RollingAverage
          data={data["teamHistoryData"]}
          processed={isProcessed}
        /> */}
          <ToastContainer
            autoClose={2000}
            hideProgressBar
            theme="light"
            position="top-center"
          />
        </Container>
      </div>
    )
  );
};

export default Summary;
