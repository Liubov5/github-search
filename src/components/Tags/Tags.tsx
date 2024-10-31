import { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import styles from "./Tags.module.css";
import repositoriesStore from "../../store/repositories-store";
type Props = {};

const initialLanguages: string[] = [
  "JAVASCRIPT",
  "PYTHON",
  "C++",
  "C#",
  "JAVA",
  "C",
  "GO",
  "PHP",
  "KOTLIN",
  "SWIFT",
  "RUBY",
];

const Tags = (props: Props) => {
  const [languages, setLanguages] = useState<string[]>(initialLanguages);
  const {setLanguage, language} = repositoriesStore;
 

  const handleClick = (item:string) => {
    setLanguage(item.toLowerCase());
  }
  return (
    <>
      <Stack direction="horizontal" gap={3} className="my-5">
        {languages.map((item, i: number) => {
          return (
            <Badge key={i} onClick = {()=>handleClick(item)} className={item.toLowerCase() === language ? `${styles.tag} ${styles.active}` : styles.tag} bg="primary" pill>
              {item}
            </Badge>
          );
        })}
      </Stack>
    </>
  );
};

export default Tags;
