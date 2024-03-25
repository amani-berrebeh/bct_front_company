import React, { useState } from "react";
import { Container, Row, Card, Col, Modal, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Breadcrumb from "Common/BreadCrumb";
import Flatpickr from "react-flatpickr";
import { Link, useNavigate } from "react-router-dom";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import { useFetchProgramsQuery } from "features/program/programSlice";

const LoadingContainer = () => <div>Loading...</div>;
const ProgramList = (props: any) => {
  document.title = "List of Programs | Company";
  const [modal_Pickup, setmodal_Pickup] = useState<boolean>(false);
  const [modal_Destination, setmodal_Destination] = useState<boolean>(false);
  const { data = [] } = useFetchProgramsQuery();
  function tog_Pickup() {
    setmodal_Pickup(!modal_Pickup);
  }

  console.log(data)
  const navigate = useNavigate();
  function tog_Destination() {
    setmodal_Destination(!modal_Destination);
  }
  function tog_AddShippingModals() {
    navigate("/programming/add-program");
  }

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row: any) => row.programName,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Pickup</span>,
      selector: (cell: any) => {
        return (
          <span>
            <Link to="#">
              <span className="text-secondary" onClick={() => tog_Pickup()}>
                {cell.origin_point.placeName}
              </span>
            </Link>
          </span>
        );
      },
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Destination</span>,
      selector: (cell: any) => {
        return (
          <span>
            <Link to="#">
              <span
                className="text-secondary"
                onClick={() => tog_Destination()}
              >
                {cell.destination_point.placeName}
              </span>
            </Link>
          </span>
        );
      },
      sortable: true,
    },
    // {
    //   name: <span className="font-weight-bold fs-13">Stops</span>,
    //   selector: (row: any) => row.stops?.address!,
    //   sortable: true,
    // },
    {
      name: <span className="font-weight-bold fs-13">From</span>,
      selector: (row: any) => row.pickUp_date,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">To</span>,
      selector: (row: any) => row.droppOff_date,
      sortable: true,
    },
    // {
    //   name: <span className="font-weight-bold fs-13">Free Days date</span>,
    //   selector: (row: any) => row.freeDays_date,
    //   sortable: true,
    // },
    // {
    //   name: <span className="font-weight-bold fs-13">Exception</span>,
    //   selector: (row: any) => row.exceptDays,
    //   sortable: true,
   // },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      selector: (row: any) => {
        return (
          <ul className="hstack gap-2 list-unstyled mb-0">
            <li>
              <Link
                to={`/program/${row.Name}`}
                className="badge badge-soft-dark edit-item-btn"
                state={row}
              >
                <i
                  className="ph ph-copy"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    fontSize: "1.5em",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                  title="Clone"
                ></i>
              </Link>
            </li>
            <li>
              <Link
                to={`/program-details/${row.Name}`}
                className="badge badge-soft-primary edit-item-btn"
                state={row}
              >
                <i
                  className="ph ph-eye"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    fontSize: "1.5em",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                ></i>
              </Link>
            </li>
            <li>
              <Link
                to={`/edit-program/${row.Name}`}
                className="badge badge-soft-success edit-item-btn"
                state={row}
              >
                <i
                  className="ph ph-pencil-line"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    fontSize: "1.5em",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                ></i>
              </Link>
            </li>
            <li>
              <Link to="#" className="badge badge-soft-danger remove-item-btn">
                <i
                  className="ph ph-trash"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                    fontSize: "1.5em",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                ></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Programming" pageTitle="" />
          <Col lg={12}>
            <Card>
              <Card.Body>
                <Row className="g-3">
                  <Col sm={9} className="col-lg-auto">
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                    >
                      <option value="all">All</option>
                      <option value="Today">Today</option>
                      <option value="Yesterday">Yesterday</option>
                      <option value="Last 7 Days">Last 7 Days</option>
                      <option value="Last 30 Days">Last 30 Days</option>
                      <option defaultValue="This Month">This Month</option>
                      <option value="Last Month">Last Month</option>
                    </select>
                  </Col>
                  <Col xxl={3} lg={6}>
                    <Flatpickr
                      className="form-control flatpickr-input"
                      placeholder="Select Date"
                      options={{
                        mode: "range",
                        dateFormat: "d M, Y",
                      }}
                    />
                  </Col>
                  <Col xxl={2} lg={6}>
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                    >
                      <option value="">Status</option>
                      <option value="Pickups">Pickups</option>
                      <option value="Pending">Pending</option>
                      <option value="Shipping">Shipping</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Out Of Delivery">Out Of Delivery</option>
                    </select>
                  </Col>

                  <Col lg={5} className="d-flex justify-content-end">
                    <Button
                      variant="secondary"
                      onClick={() => tog_AddShippingModals()}
                      className="add-btn"
                    >
                      <i className="bi bi-plus-circle me-1 align-middle "></i>{" "}
                      Add Programm
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card id="shipmentsList">
              <Card.Header className="border-bottom-dashed">
                <Row className="g-3">
                  <Col xxl={3} lg={6}>
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control search"
                        placeholder="Search for something..."
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <DataTable columns={columns} data={data} pagination />
              </Card.Body>
            </Card>
          </Col>
        </Container>
        <Modal
          className="fade zoomIn"
          size="xl"
          show={modal_Pickup}
          onHide={() => {
            tog_Pickup();
          }}
          centered
        >
          <Modal.Body className="p-4">
            <Map
              google={props.google}
              zoom={18}
              style={{ height: "118%", width: "95%" }}
              initialCenter={{ lat: 52.477732, lng: -1.8988277 }}
            >
              <Marker position={{ lat: 52.477732, lng: -1.8988277 }} />
            </Map>
          </Modal.Body>
        </Modal>
        <Modal
          className="fade zoomIn"
          size="xl"
          show={modal_Destination}
          onHide={() => {
            tog_Destination();
          }}
          centered
        >
          <Modal.Body className="p-4">
            <Map
              google={props.google}
              zoom={16}
              style={{ height: "118%", width: "95%" }}
              initialCenter={{ lat: 53.1668422, lng: -4.3276843 }}
            >
              <Marker position={{ lat: 53.166, lng: -4.3269 }} />
            </Map>
          </Modal.Body>
        </Modal>
      </div>
    </React.Fragment>
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE",
  LoadingContainer: LoadingContainer,
  v: "3",
})(ProgramList);