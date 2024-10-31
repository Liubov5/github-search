export const getPageCount = (totalCount: number, limit: number): number => {
  return Math.ceil(totalCount / limit);
};

export const getPagesArray = (totalPages: number): number[] => {
  let pagesArray: number[] = [];
  for (let i = 0; i < totalPages; i++) {
    pagesArray.push(i + 1);
  }
  return pagesArray;
};

//do i need to record total page number into state?
