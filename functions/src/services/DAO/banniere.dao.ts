import { Select,Insert,Update,Delete, SelectOne } from "./connection";


export class BanniereDAO {
    private collectionName = "bannieres";
    private static _instance: BanniereDAO;
    public static get instance() {
        if (!this._instance) {
            this._instance = new BanniereDAO();
        }
        return this._instance;
    }
    public all() {
        return Select(this.collectionName);
    }

    public getOne(params:string) {
        return SelectOne(this.collectionName,params);
    }
    
    public save(data: BanniereModel ){
        return Insert(this.collectionName, data);
    }


    public update(data: BanniereModel, params: string ){
        return Update(this.collectionName,params, (data as any));
    }

    public delete(params:string){
        return Delete(this.collectionName,params);
    }


}