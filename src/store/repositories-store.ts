import { makeAutoObservable, runInAction } from "mobx";
import { fetchRepositories } from "../api/fetch-repositories";
import IRepository from "../types/types";



class RepositoriesStore {
    list: IRepository[] = [];
    isLoading: boolean = false;
    totalCount: number = 0;
    perPage: number =  20;
    q: string = 'tic tac toe';
    page:number = 1;
    language:string = 'python';

    constructor () {
        makeAutoObservable(this);
    }

    setPage = (value:number) => {
        this.page = value;
        this.getRepositoriesAction();
    }

    setQ = (value:string)=> {
        this.q = value;
        this.getRepositoriesAction();
    }

    setLanguage = (value:string)=>{
        this.language = value;
        this.getRepositoriesAction();
    }

    getRepositoriesAction =  async() => {
        try {
            this.isLoading = true;
            const result = await fetchRepositories({perPage: this.perPage, page: this.page, q:this.q, language: this.language});

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