import React from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import Breadcrumb from 'Common/BreadCrumb';

// Import Images
import logoDark from 'assets/images/logo-dark.png'
import logoLight from 'assets/images/logo-light.png'
import { Link } from 'react-router-dom';

const ContractDetails = () => {

    document.title = "Contract Details | Bouden Coach Travel";

    //Print the Invoice
    const printInvoice = () => {
        window.print();
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb title="Contract Details" pageTitle="Contract" />

                  

                </Container>
            </div>
        </React.Fragment>
    );
}

export default ContractDetails;