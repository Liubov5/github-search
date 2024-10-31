import Card from "react-bootstrap/Card";
import IRepository from '../../types/types';
import styles from "./item.module.css";


const Item = (props: IRepository) => {
  return (
    <>
    <Card className={styles.cardCustom}>
      <Card.Body>
        <Card.Title>Repository name: {props.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text className={styles.cardCustom__text}>
           Description:  {props.description}
        </Card.Text>
        <Card.Link target='_blank' href={props.html_url}>Link to Repository</Card.Link>
        {/* <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
    </Card>
        
    </>
  )
}

export default Item