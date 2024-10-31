import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import repositoriesStore from "../../store/repositories-store";

type Props = {};

const Search = (props: Props) => {
  const { setQ, q } = repositoriesStore;
  const [value, setValue] = useState<string>(q);

  const handleClick = () => {
    setQ(value);
    setValue('');
  };
  return (
    <>
        <h3>Вы искали: {q} </h3>
        <InputGroup className="mb-3">
        <Form.Control
          placeholder="Введите текст"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          onBlur = {handleClick}
        />
        <Button
          onClick={handleClick}
          variant="outline-secondary"
          id="button-addon2"
        >
          Поиск
        </Button>
      </InputGroup>
    </>
  );
};

export default Search;
