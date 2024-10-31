import { makeAutoObservable, runInAction } from "mobx";
import { fetchRepositories } from "../api/fetch-repositories";
import IRepository from "../types/types";



class RepositoriesStore {
    list: IRepository[] = [];
    isLoading: boolean = false;
    totalCount: number = 0;
    perPage: number =  20;
    q: string = '';
    page:number = 1;

    constructor () {
        makeAutoObservable(this);
    }

    setPage = (value:number) => {
        this.page = value;
        this.getRepositoriesAction();
    }

    getRepositoriesAction =  async() => {
        try {
            this.isLoading = true;
            const result = await fetchRepositories({perPage: this.perPage, page: this.page});

            runInAction(()=>{
                this.list = result.data.items;
                this.totalCount = result.data.total_count;
                this.isLoading = false;
            })
        }catch {
            throw new Error("не удалось получить данные")
        }
    }


}

export default new RepositoriesStore();