import { Select,Insert,Update,Delete, SelectOne } from "./connection";


export class PodcastDAO {
    private collectionName = "podcasts";
    private static _instance: PodcastDAO;
    public static get instance() {
        if (!this._instance) {
            this._instance = new PodcastDAO();
        }
        return this._instance;
    }
    public all() {
        return Select(this.collectionName);
    }

    public getOne(params:string) {
        return SelectOne(this.collectionName,params);
    }
    
    public save(data: PodcastModel ){
        return Insert(this.collectionName, data);
    }


    public update(data: PodcastModel, params: string ){
        return Update(this.collectionName,params, (data as any));
    }

    public delete(params:string){
        return Delete(this.collectionName,params);
    }


}