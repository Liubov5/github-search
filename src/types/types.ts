export default interface IRepository  {
    id:number,
    name: string,
    html_url: string,
    description: string,
}

export type TRepositories = {
    items: IRepository[],
    total_count: number,
}