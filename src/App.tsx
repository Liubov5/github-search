import { ReactElement, useEffect, useState } from "react";
import "./App.css";
import repositoriesStore from "./store/repositories-store";
import { observer } from "mobx-react-lite";
import Pagination from "react-bootstrap/Pagination";
import Lists from "./components/Lists/Lists";
import { getPageCount, getPagesArray } from "./utils/pages";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

export const App = observer(() => {
  const { list, isLoading, getRepositoriesAction, totalCount, perPage, page } =
    repositoriesStore;

  const [currentPage, setCurrentPage] = useState<number>(page);
  const [totalPagesCount, setTotalPagesCount] = useState<number>(0);
  const [showedPagesArray, setShowedPagesArray] = useState<number[]>([]);
  //let showedPagesArray: number[] = [];
  let listPages: ReactElement[] = [];
  let pagesArray:number[] = [];

  useEffect(() => {
    
    getRepositoriesAction();
   
  }, []);

  useEffect(()=>{
    if(!isLoading) {
      setTotalPagesCount(getPageCount(totalCount, perPage));

    }
    //кол-во страницы число
    console.log("кол-во страниц", totalPagesCount);
  }, [isLoading])

  useEffect(() => {

    pagesArray = getPagesArray(totalPagesCount);
    setShowedPagesArray(pagesArray.slice(0, 10))
    console.log("pagesarray", pagesArray);
    if (currentPage > 4) {
      setShowedPagesArray(pagesArray.slice(currentPage - 1, currentPage + 10))
    }

    listPages = showedPagesArray.map((p) => {
      return (
        <Pagination.Item
          onClick={() => changePage(p)}
          key={p}
          active={p === currentPage}
        >
          {p}
        </Pagination.Item>
      );
    });
    console.log("listpages", listPages);
    
  }, [totalPagesCount]);



  const changePage = (page: number): void => {
    setCurrentPage(page);
  };

  if (isLoading) return <p>Loading...</p>;
  

  return (
    <>
      <Container>
        <Lists list={list} />
        <Pagination>
          {currentPage > 4 && (
            <Pagination.Item
              onClick={() => changePage(1)}

            >
              В начало
            </Pagination.Item>
          )}
          
          {currentPage}

          <Pagination.Item
            onClick={() => changePage(currentPage + 1)}
          >
           
            Дальше
          </Pagination.Item>
        </Pagination>
      </Container>
    </>
  );
});
