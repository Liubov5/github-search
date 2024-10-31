import { useEffect, useState } from "react";
import "./App.css";
import repositoriesStore from "./store/repositories-store";
import { observer } from "mobx-react-lite";
import Pagination from "react-bootstrap/Pagination";
import Lists from "./components/Lists/Lists";
import { getPageCount, getPagesArray } from "./utils/pages";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Search from "./components/Search/Search";
import Spinner from 'react-bootstrap/Spinner';
import Tags from "./components/Tags/Tags";

export const App = observer(() => {
  const { list, isLoading, getRepositoriesAction, totalCount, perPage, page, setPage } =
    repositoriesStore;

  const [currentPage, setCurrentPage] = useState<number>(page);
  const [totalPagesCount, setTotalPagesCount] = useState<number>(0);
  const [showedPagesArray, setShowedPagesArray] = useState<number[]>([]);
  const [pagesArray, setPagesArray] = useState<number[]>([]);
 
  useEffect(() => {
    getRepositoriesAction();
    console.log(list)
  }, []); // эффект выполнится только один раз после первого рендеринга.

  useEffect(() => {
    if (!isLoading) {
      setTotalPagesCount(getPageCount(totalCount, perPage));
    }
  }, [isLoading]); //Если передать переменные в массив зависимостей, эффект будет выполняться каждый раз, когда эти переменные изменяются. - свойство из стейт менеджера поменялось и мы его просмотреои

  useEffect(() => {
    
    setPagesArray(getPagesArray(totalPagesCount))
    
  }, [totalPagesCount]); //выше был вызов этого стейта, поэтому отработала эта штука

  useEffect(()=>{
    changeShowedPagesArray();
  },[pagesArray])

  const changeShowedPagesArray = () => {
    setShowedPagesArray(pagesArray.slice(0, 10));   
    if (currentPage > 4) {
      setShowedPagesArray(pagesArray.slice(currentPage - 1, currentPage + 10));
    }
  }

  useEffect(()=>{
    setPage(currentPage);
    changeShowedPagesArray();
  }, [currentPage])

  if (isLoading) return  <Spinner animation="border" role="status">
  <span className="visually-hidden mx-auto">Loading...</span>
</Spinner>;

  return (
    <>
      <Container className="mt-5">
        <Search />
        <Tags />
        <Lists list={list} />

        <Pagination>
          {currentPage > 4 && (
            <Pagination.Item onClick={() => setCurrentPage(1)}>
              В начало
            </Pagination.Item>
          )}

          {showedPagesArray.map((p) => {
            return (
              <Pagination.Item
                onClick={() => setCurrentPage(p)}
                key={p}
                active={p === currentPage}
              >
                {p}
              </Pagination.Item>
            );
          })}

          <Pagination.Item onClick={() => setCurrentPage(currentPage + 1)}>
            Дальше
          </Pagination.Item>
        </Pagination>
      </Container>
    </>
  );
});
