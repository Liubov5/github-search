import Item from "../Item/Item";
import { Col, Row } from "react-bootstrap";

type Props = {
  list: any[];
};

const Lists = (props: Props) => {
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
}

export default Lists;
