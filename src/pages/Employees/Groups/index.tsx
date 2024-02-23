import React, { useState, useMemo } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import Breadcrumb from 'Common/BreadCrumb';
import TableContainer from "Common/TableContainer";
import { shipments } from "Common/data";
import { Link, useNavigate } from 'react-router-dom';
import Flatpickr from "react-flatpickr";
import Selection from './Select';
import Swal from "sweetalert2";
import { useFetchGroupQuery, useDeleteGroupMutation, GroupInterface, useAddGroupMutation } from 'features/groups/groupsSlice';
const Group = () => {

    document.title = "Group | Bouden Coach Travel";

    const [modal_AddShippingModals, setmodal_AddShippingModals] = useState<boolean>(false);
    function tog_AddShippingModals() {
        setmodal_AddShippingModals(!modal_AddShippingModals);
    }
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const handleSelectionChange = (selected: any) => {
        setSelectedEmployees(selected);
    };

    const { data = [] } = useFetchGroupQuery();

    const [deleteGroup] = useDeleteGroupMutation();
    // Mutation to create Group
    const [createGroup] = useAddGroupMutation();

    // group values 

    const [formData, setFormData] = useState({
        groupName: "",
        note: "",
        startPoint: "",
        dateStart: "",
        timeStart: "",
        Destination: "",
        dateEnd: "",
        timeEnd: "",
        status: "",
        id_company: "",
        employees: [{ _id: "", firstName: "", lastName: "" , photos:""}],
        
        
    })
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };
    const onSubmitGroup = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        formData["employees"]= selectedEmployees
        createGroup(formData).then(() => setFormData(formData));
        notify();
        tog_AddShippingModals();
       

    };
    const notify = () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Group has been created successfully",
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

    const AlertDelete = async (_id: any) => {
        swalWithBootstrapButtons
            .fire({
                title: "Are you sure?",
                text: "You can not step back!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Delete it!",
                cancelButtonText: "No, Cancel!",
                reverseButtons: true,
            })
            .then((result: any) => {
                if (result.isConfirmed) {
                    deleteGroup(_id);
                    swalWithBootstrapButtons.fire(
                        "Deleted !",
                        "Account has been deleted.",
                        "success"
                    );
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Cancel",
                        "Account secured :)",
                        "error"
                    );
                }
            });
    };

    const navigate = useNavigate();

    ///// modal and selection stuff
 

    

    const handleClick = () => {
        // Navigate to another page
        navigate('/groups');
    };
    const columns = useMemo(
        () => [
            // {
            //     Header: "Group ID",
            //     disableFilters: true,
            //     filterable: true,
            //     accessor: (cellProps: GroupInterface) => {
            //         return (<Link to="#" className="fw-medium link-primary">{cellProps._id}</Link>)
            //     },
            // },
            // {
            //     Header: "Shipment No",
            //     accessor: "shipment_no",
            //     disableFilters: true,
            //     filterable: true,
            // },
            {
                Header: "Group Name",
                accessor: "groupName",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Description",
                accessor: "note",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Employees",
                accessor: "Destination",
                disableFilters: true,
                filterable: true,
            },
            // {
            //     Header: "Employees",
            //     accessor: (cellProps: GroupInterface) => {
            //         const employeeNames = cellProps.employees?.map(employee => `${employee.firstName} ${employee.lastName}`);

            //         return (
            //             <div className="flex-grow-1 ms-2 user_name">
            //                 {employeeNames?.join(", ")}
            //             </div>
            //         );
            //     },
            //     disableFilters: true,
            //     filterable: true,
            // },
           
            {
                Header: "Status",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: GroupInterface) => {
                    switch (cellProps.status) {
                        case "Active":
                            return (<span className="badge bg-success-subtle text-success"> {cellProps.status}</span>)
                        case "Inactive":
                            return (<span className="badge bg-danger-subtle text-danger"> {cellProps.status}</span>)


                    }
                },
            },
            {
                Header: "Action",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    return (
                        <ul className="hstack gap-2 list-unstyled mb-0">
                            <li>
                                <Link to="#" className="badge bg-success-subtle text-success edit-item-btn"><i className="ph ph-pencil-line" style={{
                                    transition: "transform 0.3s ease-in-out",
                                    cursor: "pointer",
                                    fontSize: "1.5em",
                                }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.transform = "scale(1.4)")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.transform = "scale(1)")
                                    }></i></Link>
                            </li>
                            <li>
                                <Link to="#" className="badge bg-danger-subtle text-danger remove-item-btn" onClick={() => AlertDelete(cellProps._id)}><i className="ph ph-trash" style={{
                                    transition: "transform 0.3s ease-in-out",
                                    cursor: "pointer",
                                    fontSize: "1.5em",
                                }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.transform = "scale(1.4)")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.transform = "scale(1)")
                                    }></i></Link>
                            </li>
                        </ul>
                    )
                },
            },
        ],
        []
    );

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb title="Group" pageTitle="Employee" />
                    <Card id="shipmentsList">
                        <Card.Header className="border-bottom-dashed">
                            <Row className="g-3">
                                <Col xxl={3} lg={6}>
                                    <div className="search-box">
                                        <input type="text" className="form-control search" placeholder="Search for order ID, shipment no, customer, order status or something..." />
                                        <i className="ri-search-line search-icon"></i>
                                    </div>
                                </Col>
                                <Col className="col-xxl-auto col-sm-auto ms-auto">
                                    <Button variant='success' onClick={() => tog_AddShippingModals()} className="add-btn"><i className="bi bi-plus-circle me-1 align-middle"></i> Add New Group</Button>
                                    {/* <Button variant='success' onClick={handleClick} className="add-btn"><i className="bi bi-plus-circle me-1 align-middle"></i> Add New Group</Button> */}
                                </Col>

                            </Row>
                        </Card.Header>
                        <Card.Body className='p-0'>
                            {/* <div className="table-responsive table-card"> */}
                            <TableContainer
                                columns={(columns || [])}
                                data={(data || [])}
                                // isGlobalFilter={false}
                                iscustomPageSize={false}
                                isBordered={false}
                                customPageSize={10}
                                className="custom-header-css table align-middle table-nowrap"
                                tableClass="table-centered align-middle table-nowrap mb-0"
                                theadClass="text-muted table-light"
                                SearchPlaceholder='Search Products...'
                            />
                            {/* </div> */}
                            <div className="noresult" style={{ display: "none" }}>
                                <div className="text-center py-4">
                                    <div className="avatar-md mx-auto mb-4">
                                        <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
                                            <i className="bi bi-search"></i>
                                        </div>
                                    </div>
                                    <h5 className="mt-2">Sorry! No Result Found</h5>
                                    <p className="text-muted mb-0">We've searched more than 150+ shipment orders We did not find any shipment orders for you search.</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>




                    {/* Modal add Group */}
                    <Modal className="fade zoomIn" size="lg" show={modal_AddShippingModals} onHide={() => { tog_AddShippingModals(); }} centered>
                        <Modal.Header className="px-4 pt-4" closeButton>
                            <h5 className="modal-title fs-18" id="exampleModalLabel">Create New Group</h5>
                        </Modal.Header>
                        <Modal.Body className="p-4">
                            <div id="alert-error-msg" className="d-none alert alert-danger py-2"></div>
                            <Form className="tablelist-form" onSubmit={onSubmitGroup}>
                                <input type="hidden" id="id-field" />
                                <Row>
                                    <Col lg={12}>
                                        <div className="mb-3">
                                            <Form.Label htmlFor="groupName"> Group Name</Form.Label>
                                            <Form.Control type="text" id="groupName" placeholder="Enter Group name" required value={formData.groupName}
                                                onChange={onChange} />
                                        </div>
                                    </Col>



                                    <div className="col-lg-10">
                                        <div className="mb-3">
                                            <Form.Label htmlFor="note"> Description</Form.Label>
                                            <Form.Control type="text" id="note" placeholder="Enter description" required value={formData.note} onChange={onChange} />

                                        </div>
                                    </div>
                                    {/* <div className="col-lg-10">
                                        <div className="mb-3">
                                            <label htmlFor="locationSelect" className="form-label">Final Station</label>
                                            <select className="form-select" name="choices-single-default" id="locationSelect" required>
                                              
                                            </select>
                                        </div>
                                    </div> */}
                                    <Col lg={12}>
                                        <div >
                                            <Selection onSelectionChange={handleSelectionChange}/>
                                        </div>
                                    </Col>
                                    <Col lg={12}>
                                        <div className="hstack gap-2 justify-content-end">
                                            <Button className="btn-ghost-danger" onClick={() => { tog_AddShippingModals(); }} data-bs-dismiss="modal"><i className="ri-close-line align-bottom me-1"></i> Close</Button>
                                            <Button variant='primary' id="add-btn" type="submit">Add Group</Button>
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

export default Group;