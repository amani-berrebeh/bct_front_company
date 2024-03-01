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
import { Link, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import TableContainer from "Common/TableContainer";
import { shipments } from "Common/data";
import Swal from "sweetalert2";
import { useFetchComplainQuery, useUpdateComplainMutation } from "features/complains/complainSlice";

const paragraphStyles = {
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
  display: "-webkit-box",
};
const Claims = () => {
  document.title = "Claims | Bouden Coach Travel";


  const {data = [] }= useFetchComplainQuery()
  console.log(data)
const [sendResponse]= useUpdateComplainMutation()

const [formData, setFormData] = useState({
  _id: "",
  firstName: "",})

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
      .then((result:any) => {
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
            text: "Your claim is safe :)",
            icon: "error",
          });
        }
      });
  };

  const answerClaims = async () => {
    await Swal.fire({
      title: "Submit your reply",
      input: "textarea",
      inputAttributes: {
        autocapitalize: "off",
      },
      inputPlaceholder: "Type your message here...",
      showCancelButton: true,
      confirmButtonText: `
    Send <i class="ri-send-plane-fill"></i>
  `,
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result:any) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url,
        });
      }
    });
  };

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
                      <Button variant="light" className="add-btn text-dark ms-auto">
                        <i className="ph ph-export me-1 align-middle"></i>{" "}
                        Write a Complain
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <div className="col-12">
              <Row>{data.map((complaint)=>(
                <Col xxl={4}>
                  
                     <Card key={complaint._id}>
                     <Card.Header>
                      {
            complaint.status && complaint.status=== "pending"?
            <Link
            to="#"
            className="link-info fw-medium float-end"
            onClick={answerClaims}
          >
            Answer
          </Link>:  <Link
                         to="#"
                         className="link-danger fw-medium float-end"
                         onClick={deleteClaim}
                       >
                         Archive
                       </Link>
                      }
                      
                       <h5 className="card-title mb-0">
                       {complaint?.id_employee?.firstName!} {complaint?.id_employee?.lastName!}
                         <span className="badge bg-success align-middle fs-10">
                           {complaint.status}
                         </span>
                       </h5>
                       <h6 className="text-muted mt-1">
                         {complaint?.id_employee?.email!}
                       </h6>
                       <h6 className="text-muted mt-1">0741309670</h6>
                     </Card.Header>
                     <Card.Body>
                       <p
                         className="card-text d-flex"
                         style={isOpen ? undefined : paragraphStyles}
                         ref={ref}
                       >
                         <div className="table-responsive">
                           <Table className="table-borderless table-sm mb-0">
                             <tbody>
                               <tr>
                                 <td className="fw-bold">Quote</td>
                                 <td className="fw-medium">20013</td>
                               </tr>
                               <tr>
                                 <td className="fw-bold">Title</td>
                                 <td className="fw-medium">
                                  {complaint.subject}
                                 </td>
                               </tr>
                               <tr className="fw-bold">
                                 <td> Date:</td>
                                 <td className="fw-medium">{complaint.complainDate}</td>
                               </tr>
                              
                             </tbody>
                           </Table>
                         </div>
                       </p>
                       <div className="text-end">
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
                       </div>
                     </Card.Body>
                     <Card.Footer className="p-0">
                       <p className="d-flex justify-content-end">{complaint.createdAt}</p>
                     </Card.Footer>
                   </Card>

                 
                </Col>
               ))}
                 
              </Row>
            </div>
          </Row>

          
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Claims;