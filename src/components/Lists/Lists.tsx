import React from "react";
import Item from "../Item/Item";
import IRepository from "../../types/types";
import { Col, Row } from "react-bootstrap";

type Props = {
  list: any[];
};

const Lists = (props: Props) => {
  console.log(props.list);

  //let item:IRepository = [];

  return (
    <div>
      <Row>
        {props.list.map((item) => (
          <Col xs="12" md="6" lg="3">
            <Item key={item.id} {...item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Lists;
