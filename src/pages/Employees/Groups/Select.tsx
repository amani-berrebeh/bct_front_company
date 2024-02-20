import React, { useState } from 'react';
import DualListBox from 'react-dual-listbox'

import { Row, Col } from "react-bootstrap";

import "react-dual-listbox/lib/react-dual-listbox.css";

const options = [
  { value: "apple", label: "Digbeth Coach Station" },
  { value: "banana", label: "Livery Street (Stop SH4)" },
  { value: "blueberry", label: "Bull Street (Stop MS20)" },
  { value: "cherry", label: "High Street (Stop MS20)" },
  { value: "coconut", label: "Birmingham Brunel Street" },
  { value: "grapefruit", label: "Granville St" },
  { value: "kiwi", label: "Adderley St" },
  { value: "lemon", label: "Birmingham Coach Station" },
  { value: "lime", label: "Colmore Row (Stop SH2)" },
  { value: "mango", label: "High Street (Stop MS20)" },
  { value: "orange", label: "Winter Gift Voucher" },
  { value: "papaya", label: "Adderley St" },
];

const Optgroup = [
  {
    label: "Cars",
    options: [
      { value: "chevrolet", label: "Chevrolet" },
      { value: "fiat", label: "Fiat" },
      { value: "ford", label: "Ford" },
      { value: "honda", label: "Honda" },
      { value: "hyundai", label: "Hyundai" },
      { value: "kia", label: "Kia" },
      { value: "mahindra", label: "Mahindra" },
      { value: "maruti", label: "Maruti" },
      { value: "mistubishi", label: "Mistubishi" },
      { value: "mg", label: "MG" },
      { value: "nissan", label: "Nissan" },
      { value: "renault", label: "Renault" },
      { value: "skoda", label: "Skoda" },
      { value: "tata", label: "Tata" },
      { value: "toyota", label: "Toyota" },
      { value: "volkswagen", label: "Volkswagen" },
    ],
  },
];

const OptgroupFilter = [
  {
    label: "Skoda",
    options: [
      { value: "kushaq", label: "Kushaq" },
      { value: "superb", label: "Superb" },
      { value: "octavia", label: "Octavia" },
      { value: "rapid", label: "Rapid" },
    ],
  },
  {
    label: "Volkswagen",
    options: [
      { value: "polo", label: "Polo" },
      { value: "taigun", label: "Taigun" },
      { value: "vento", label: "Vento" },
    ],
  },
];

const Selection = () => {
  const [selected, setSelected] = useState(["apple", "blueberry", "cherry"]);
  const [selectedOptGroup, setSelectedOptGroup] = useState([
    "hyundai",
    "skoda",
    "tata",
    "toyota",
  ]);
  const [selectedFilter, setSelectedFilter] = useState(["luna"]);

  return (
    <React.Fragment>
      <Col lg={12}>
          <div>
            <h5 className="fs-14 mb-1">Mid Stations</h5>
            <p className="text-muted">Slide the selected stations to the right </p>
            <DualListBox
              options={options}
              selected={selected}
              onChange={(e: any) => setSelected(e)}
              icons={{
                moveLeft: <span className="mdi mdi-chevron-left" key="key" />,
                moveAllLeft: [
                  <span className="mdi mdi-chevron-double-left" key="key" />,
                ],
                moveRight: <span className="mdi mdi-chevron-right" key="key" />,
                moveAllRight: [
                  <span className="mdi mdi-chevron-double-right" key="key" />,
                ],
                moveDown: <span className="mdi mdi-chevron-down" key="key" />,
                moveUp: <span className="mdi mdi-chevron-up" key="key" />,
                moveTop: (
                  <span className="mdi mdi-chevron-double-up" key="key" />
                ),
                moveBottom: (
                  <span className="mdi mdi-chevron-double-down" key="key" />
                ),
              }}
            />
          </div>
        </Col>
    </React.Fragment>
  );
};

export default Selection;