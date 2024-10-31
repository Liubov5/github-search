import { TRepositories } from './../types/types';
import axios from "axios";



const API_URL:string = 'https://api.github.com/';

type Props = {
    perPage: number,
    page: number,
}

export const fetchRepositories = async (props: Props) => {
    const res = await axios.get<TRepositories>(`${API_URL}search/repositories?q=tetris+language:javascript&sort=stars&order=desc&per_page=${props.perPage}&page=${props.page}`);
   return res;
}