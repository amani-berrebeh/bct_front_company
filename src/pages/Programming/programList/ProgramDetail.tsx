import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { VectorMap } from "@south-paw/react-vector-maps";
import world from "./world.svg.json";

import { Library } from '@googlemaps/js-api-loader';
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
 
} from "@react-google-maps/api";

import { useLocation } from "react-router-dom";

// Define libraries outside of the component
// const libraries: Library[] = ["places"];

const ProgramDetail = (props: any) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const location = useLocation();
  const program = location.state; // Access state

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null); 
  const [stopCoordinates, setStopCoordinates] = useState<google.maps.LatLngLiteral[]>([]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBbORSZJBXcqDnY6BbMx_JSP0l_9HLQSkw",
    libraries: ["places"],
  });
  useEffect(() => {
    if (isLoaded && program) { // Check if program is not null or undefined
      const directionsService = new google.maps.DirectionsService();
      const waypoints = program.stops.map((stop: any) => ({
        location: { query: stop.address }, // Use the address from autocomplete
        stopover: true,
        }));
          
        directionsService.route(
          {
            origin: program.origin_point.coordinates,
            destination: program.destination_point.coordinates,
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints,
          },
          (result, status) => {
            if (result !== null && status === google.maps.DirectionsStatus.OK) {
              setDirections(result);
              if (result.routes && result.routes.length > 0) {
                const newStopCoordinates = result.routes[0].legs.map((leg) => ({
                  lat: leg.start_location.lat(),
                  lng: leg.start_location.lng(),
                }));
                setStopCoordinates(newStopCoordinates);
              } else {
                console.error("No routes found in the directions result");
              }
            } else {
              console.error("Directions request failed due to " + status);
            }
          }
        );
    
    }
  }, [isLoaded, program]);

  if (loadError) {
    return <div>Error loading Google Maps API: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleMapLoad = (map:any) => {
    setMap(map);
  };
 
  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <div className="d-flex align-items-center">
            <h5 className="card-title mb-0 flex-grow-1">Program Details</h5>
            <div className="flex-shrink-0">
              <p className="mb-0">
                Start Date: <b>{program.pickUp_date}</b>
              </p>
            </div>
          </div>
        </Card.Header>
      </Card>
      <Card>
        <Card.Header>
          <div className="d-flex align-items-center">
            <h5 className="card-title mb-0 flex-grow-1">Program Details : <span> {program.programName}</span></h5>
            <div className="flex-shrink-0">
              <p className="mb-0">
                Start Date: <b>{program.pickUp_date}</b>
              </p>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col xxl={3} lg={6}>
              <Card className="bg-secondary bg-opacity-10 border-0">
                <Card.Body>
                  <div className="d-flex gap-3">
                    <div className="flex-grow-1">
                      <h6 className="fs-18 mb-3">Pickup Informations</h6>
                      <p className="mb-0">
                        Start Point:{" "}
                        <span className="fw-medium">
                          {program.origin_point.placeName}
                        </span>
                      </p>
                      <p className="mb-1">
                        Start Time:{" "}
                        <span className="fw-medium">{program.pickUp_Time}</span>
                      </p>
                      <p className="mb-0">
                        Start Date:{" "}
                        <span className="fw-medium">{program.pickUp_date}</span>
                      </p>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <div className="avatar-title bg-secondary-subtle text-secondary rounded fs-3">
                      <i className="bi bi-info-circle"></i>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={3} lg={6}>
              <Card className="bg-warning bg-opacity-10 border-0">
                <Card.Body>
                  <div className="d-flex gap-3">
                    <div className="flex-grow-1">
                      <h6 className="fs-18 mb-3">DropDown Informations</h6>
                      <p className="mb-0">
                        End Point:{" "}
                        <span className="fw-medium">
                          {program.destination_point.placeName}
                        </span>
                      </p>
                      <p className="mb-1">
                        End Time:{" "}
                        <span className="fw-medium">
                          {program.dropOff_time}
                        </span>
                      </p>
                      <p className="mb-0">
                        End Date:{" "}
                        <span className="fw-medium">
                          {program.droppOff_date}
                        </span>
                      </p>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <div className="avatar-title bg-warning-subtle text-warning rounded fs-3">
                        <i className="ph-map-pin"></i>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={3} lg={6}>
              <Card className="bg-success bg-opacity-10 border-0">
                <Card.Body>
                  <div className="d-flex gap-3">
                    <div className="flex-grow-1">
                      <h6 className="fs-18 mb-3">Days</h6>
                      <p className="mb-0 fw-medium">
                        Free Dates:{" "}
                        <span className="fw-medium">
                          {program.freeDays_date}
                        </span>
                      </p>
                      <p className="mb-0">
                        Except Days:{" "}
                        <span className="fw-medium">{program.exceptDays}</span>
                      </p>
                      <p className="mb-1">
                      
                        <span className="fw-medium">
                          
                        </span>
                      </p>
                      {/* <p className="mb-1">Extra</p> */}
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <div className="avatar-title bg-success-subtle text-success rounded fs-3">
                        <i className="bi bi-calendar-week"></i>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={3} lg={6}>
              <Card className="bg-primary bg-opacity-10 border-0">
                <Card.Body>
                  <div className="d-flex gap-3">
                    <div className="flex-grow-1">
                      <h6 className="fs-18 mb-3">Options</h6>
                      <p className="mb-0 fw-medium">
                        Capacity:{" "}
                        <span className="fw-medium">
                        {program.recommanded_capacity}
                        </span>
                      </p>
                      <p className="mb-0">
                        note:{" "}
                        <span className="fw-medium">{program.note}</span>
                      </p>
                      <p className="mb-1">
                        Extra :{" "}
                        <span className="fw-medium">
                          {program.extra}
                        </span>
                      </p>
                      {/* <p className="mb-1">Extra</p> */}
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <div className="avatar-title bg-primary-subtle text-primary rounded fs-3">
                        <i className="ph-map-pin"></i>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {/* 
                        <h5 className="card-title flex-grow-1 mb-0">Order Status</h5>
                        <div className="flex-shrink-0">
                            <Button variant='soft-primary' size="sm" className="mt-2 mt-sm-0 me-1"><i className="ri-map-pin-line align-bottom me-1"></i> Change Address</Button>
                            <Button variant='soft-danger' size="sm" className="mt-2 mt-sm-0"><i className="mdi mdi-archive-remove-outline align-bottom me-1"></i> Cancel Order</Button>
                        </div>
                    </div> */}
                   <Row>
            <Col lg={9}>
              <div className="mt-4">
                <h5 className="card-title mb-4">View Map</h5>
              </div>
            </Col>
            <Col lg={3}>
              <div className="mt-4">
                <h5 className="card-title mb-4">Progam Stops</h5>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={9}>
            <div style={{ height: "500px", width: "100%" }}>
                <GoogleMap
                  mapContainerStyle={{
                    height: "100%",
                    width: "100%",
                  }}
                  zoom={8}
                  center={{ lat: -34.397, lng: 150.644 }}
                  onLoad={handleMapLoad}
                >
                  {/* Render directions */}
                  {directions && (
                    <DirectionsRenderer
                      directions={directions}
                      options={{
                        polylineOptions: {
                          strokeColor: "red",
                          strokeOpacity: 0.8,
                          strokeWeight: 4,
                        },
                      }}
                    />
                  )}
                </GoogleMap>
              </div>
  
                
                </Col>

                <Col lg={3}>
                <Col className="justify-content-start">
                   
                      
                      <Col  className="text-center completed ">
                        <span className="is-complete"></span>
                        <div className="card mt-3 mb-0 bg-secondary bg-opacity-10 border-0">
                          <div className="card-body">
                            <h6 className="fs-17"><i className="bi bi-pin-angle"></i> {program.origin_point.placeName} </h6>
                            <p className="text-muted fs-15 mb-0"><i className="bi bi-stopwatch"></i> {program.pickUp_Time}</p>
                          </div>
                        </div>
                      </Col>
                      <Col  className="text-center completed ">
                        <span className="is-complete"></span>
                        <div className="card mt-3 mb-0 bg-warning bg-opacity-10 border-0">
                          <div className="card-body">
                            <h6 className="fs-17"><i className="bi bi-pin-angle"></i> {program.destination_point.placeName}</h6>
                            <p className="text-muted fs-15 mb-0"><i className="bi bi-stopwatch"></i>  {program.dropOff_time}</p>
                          </div>
                        </div>
                      </Col>
                    
                  </Col>
                  <Col className="justify-content-start">
                    {program.stops.map((stop: any, _id: any) => (
                      <Col key={stop._id} className="text-center completed ">
                        <span className="is-complete"></span>
                        <div className="card mt-3 mb-0 bg-danger bg-opacity-10 border-0">
                          <div className="card-body">
                            <h6 className="fs-17"><i className="bi bi-pin-angle"></i>  {stop.address}</h6>
                            <p className="text-muted fs-15 mb-0"><i className="bi bi-stopwatch"></i>  {stop.time}</p>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Col>
                </Col>
              </Row>
            
          
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default ProgramDetail;
