import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Swal from "sweetalert2";
import {
  useFetchComplainQuery,
  useUpdateComplainMutation,
  useUpdateComplainResponseMutation,
} from "features/complains/complainSlice";

const paragraphStyles = {
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
  display: "-webkit-box",
};
const Claims = () => {
  document.title = "Complains | Bouden Coach Travel";

  const { data = [] } = useFetchComplainQuery();
  console.log(data);
  const [sendResponse] = useUpdateComplainResponseMutation();
  const Navigate = useNavigate();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState<string>("");


  const handleOpenModal = (id: string) => {
    setSelectedComplaintId(id);
    setOpenModal(true);
  };

  const [formData, setFormData] = useState({
    _id: "",
    responseMessage: "",
    id_corporate: "",
    id_student: "",
    id_parent: "",
    id_employee: {
      email: "",
      firstName: "",
      lastName: "",
      mobile: "",
      photos: "",
    },
    subject: "",
    description: "",
    complainDate: "",
    responseAuthor: "",
    responseDate: "",
    status: "",
    mediaBase64String: "",
    mediaExtension: "",
    createdAt: "",
    updatedAt: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    if (selectedComplaintId) {
      // Find the complaint object with the selected _id from the data array
      const selectedComplaint = data.find(complaint => complaint._id === selectedComplaintId);
      
      // Update the formData state with the selected _id
      setFormData(prevState => ({
        ...prevState,
        _id: selectedComplaint ? selectedComplaint._id : "",
      }));
    }
  }, [selectedComplaintId, data]);

  const onSubmitResponse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const responseMessage = formData.get("responseMessage") as string;
    const complaintId = formData.get("_id") as string;

    const updatedFormData = {
      _id: complaintId,
      responseMessage: responseMessage,
      id_corporate: "",
      id_student: "",
      id_parent: "",
      id_employee: {
        email: "",
        firstName: "",
        lastName: "",
        mobile: "",
        photos: "",
      },
      subject: "",
      description: "",
      complainDate: "",
      responseAuthor: "",
      responseDate: "",
      status: "",
      mediaBase64String: "",
      mediaExtension: "",
      createdAt: "",
      updatedAt: "",
        // Add other properties from formData as needed
    };

    sendResponse(updatedFormData).then(() => {
        notify();
        Navigate("/claims")

    })
};
  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your response has been sent",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const deleteClaim = () => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, archive it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Archived!",
            text: "Your file has been archived.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your complain is safe :)",
            icon: "error",
          });
        }
      });
  };

  // const answerClaims = async () => {
  //   await Swal.fire({
  //     title: "Submit your reply",
  //     input: "textarea",
  //     inputAttributes: {
  //       autocapitalize: "off",
  //     },
  //     inputPlaceholder: "Type your message here...",
  //     showCancelButton: true,
  //     confirmButtonText: `
  //   Send <i class="ri-send-plane-fill"></i>
  // `,
  //     showLoaderOnConfirm: true,
  //     allowOutsideClick: () => !Swal.isLoading(),
  //   }).then((result: any) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: `${result.value.login}'s avatar`,
  //         imageUrl: result.value.avatar_url,
  //       });
  //     }
  //   });
  // };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showReadMoreButton, setShowReadMoreButton] = useState<boolean>(false);

  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      setShowReadMoreButton(
        ref.current.scrollHeight !== ref.current.clientHeight
      );
    }
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Claims" pageTitle="Feedback&Claims" />
          <Row>
            <Card>
              <Card.Body>
                <Row className="g-lg-2 g-4">
                  <Col xxl={2} className="col-lg-auto">
                    <select
                      className="form-select text-muted"
                      data-choices
                      data-choices-search-false
                      name="choices-single-default"
                      id="idStatus"
                    >
                      <option value="all">All Categories</option>
                    </select>
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
                      <option value="Pickups">Answered</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </Col>

                  <Col xxl={3}></Col>
                  <Col>
                    <div
                      className="d-flex gap-2"
                      role="group"
                      aria-label="Basic example"
                    >
                      <Button
                        variant="light"
                        className="add-btn text-dark ms-auto"
                      >
                        <i className="ph ph-export me-1 align-middle"></i> Write
                        a Complain
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <div className="col-12">
              <Row>
                {data.map((complaint) => (
                  <Col xxl={4}>
                    <Card key={complaint._id}>
                      <Card.Header>
                        {complaint.status && complaint.status === "pending" ? (
                          <Link
                            to="#"
                            className="link-info fw-medium float-end"
                            onClick={() => handleOpenModal(complaint._id)}
                          >
                            Answer
                          </Link>
                        ) : (
                          <Link
                            to="#"
                            className="link-danger fw-medium float-end"
                            onClick={deleteClaim}
                          >
                            Archive
                          </Link>
                        )}

                        <h5 className="card-title mb-0">
                          <img
                            src={`http://localhost:8800/employeeFiles/${complaint.id_employee.photos}`}
                            alt=""
                            className="rounded-5 avatar-sm"
                          />{" "}
                          {complaint?.id_employee?.firstName!}{" "}
                          {complaint?.id_employee?.lastName!}
                          <span className="badge bg-success align-middle fs-10">
                            {complaint.status}
                          </span>
                        </h5>
                        <h6 className="text-muted mt-1">
                          {complaint?.id_employee?.email!}
                        </h6>
                        <h6 className="text-muted mt-1">
                          {complaint.id_employee.mobile}
                        </h6>
                      </Card.Header>
                      <Card.Body key={complaint._id}>
                        <div
                          className="card-text d-flex"
                          style={isOpen ? undefined : paragraphStyles}
                          ref={ref}
                        >
                          <div className="table-responsive">
                            <Table className="table-borderless table-sm mb-0">
                              <tbody>
                                <tr>
                                  <td className="fw-bold">Subject</td>
                                  <td className="fw-medium">
                                    {complaint.subject}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="fw-bold">Description</td>
                                  <td className="fw-medium">
                                    {complaint.description}
                                  </td>
                                </tr>
                                <tr className="fw-bold">
                                  <td> Date:</td>
                                  <td className="fw-medium">
                                    {complaint.complainDate}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </div>
                        {/* <div className="text-end">
                          {showReadMoreButton && (
                            <Link
                              to="#"
                              className="link-dark fw-medium"
                              onClick={() => setIsOpen(!isOpen)}
                            >
                              {isOpen ? (
                                <i className="ri-arrow-up-s-line align-middle"></i>
                              ) : (
                                <i className="ri-arrow-down-s-line align-middle"></i>
                              )}
                            </Link>
                          )}
                        </div> */}
                      </Card.Body>
                      <Card.Footer className="p-0">
                        <Col
                          xxl={6}
                          className="hstack flex-wrap gap-1  ml-1 mb-0 mb-lg-0 align-items"
                        >
                          <button
                            type="button"
                            className="btn btn-soft-primary btn-icon btn-border"
                          >
                            <i className="bi bi-file-earmark-image"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-soft-success btn-icon btn-border"
                          >
                            <i className="bi bi-file-earmark-play"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-soft-danger btn-icon btn-border"
                          >
                            <i className="bi bi-file-pdf"></i>
                          </button>
                          <p className="justify-content-end">
                            {complaint.createdAt}
                          </p>
                        </Col>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Row>
          <Modal
            show={openModal}
            onHide={() => {
              setOpenModal(false);
              setSelectedComplaintId("");
            }}
            id="createModal"
            className="zoomIn border-0"
            centered
            selectedComplaintId={selectedComplaintId}
          >
            <Modal.Header className="px-4 pt-4" closeButton>
              <h5 className="modal-title fs-18"></h5>
            </Modal.Header>
            <Modal.Body className="p-4">
              <Form className="create-form" onSubmit={onSubmitResponse}>
  <input type="hidden" name="_id" id="_id"  value={formData._id} />
                <input type="hidden" id="id-field" />
                <div
                  id="alert-error-msg"
                  className="d-none alert alert-danger py-2"
                ></div>

                <Row>
                  <Col lg={12}>
                    <div className="mb-3">
                      <label htmlFor="responseMessage" className="form-label">
                        Write your response here
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="responseMessage"
                        name="responseMessage"
                        value={formData.responseMessage}
                        onChange={onChange}
                      />
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="mb-3">
                      <label
                        htmlFor="legalcardBase64String"
                        className="form-label"
                      >
                        Attached
                      </label>
                      <Form.Control
                        name="legalcardBase64String"
                        type="file"
                        id="legalcardBase64String"
                        accept=".pdf"
                        placeholder="Choose File"
                        className="text-muted"

                        // required
                      />
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="hstack gap-2 justify-content-end">
                      <Button
                        variant="ghost-danger"
                        className="btn btn-ghost-danger"
                      >
                        <i className="ri-close-line align-bottom me-1"></i>{" "}
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        id="addNew"
                        className="btn btn-primary"
                        type="submit"
                        onClick={()=>setOpenModal(false)}
                      >
                        Send
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Claims;
