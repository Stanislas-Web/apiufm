import { Select,Insert,Update,Delete, SelectOne } from "./connection";


export class EmissionDAO {
    private collectionName = "emissions";
    private static _instance: EmissionDAO;
    public static get instance() {
        if (!this._instance) {
            this._instance = new EmissionDAO();
        }
        return this._instance;
    }
    public all() {
        return Select(this.collectionName);
    }

    public getOne(params:string) {
        return SelectOne(this.collectionName,params);
    }
    
    public save(data: EmissionModel ){
        return Insert(this.collectionName, data);
    }


    public update(data: EmissionModel, params: string ){
        return Update(this.collectionName,params, (data as any));
    }

    public delete(params:string){
        return Delete(this.collectionName,params);
    }


}