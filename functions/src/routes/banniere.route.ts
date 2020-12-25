import express from 'express';
import moment from '../config/moment'
// tslint:disable-next-line: no-implicit-dependencies
import { BanniereDAO } from "@services/DAO/banniere.dao";
export class BanniereRoute {
    private static _instance: BanniereRoute;
    public static get instance() {
        if (!this._instance) {
            this._instance = new BanniereRoute();
        }
        return this._instance;
    }
    public async get(req: express.Request, res: express.Response){


        try{
            const resultats = await BanniereDAO.instance.all();
            const voirData:any = [];
            resultats.forEach((Banniere)=>{
                voirData.push({
                    id: Banniere.id,
                    urlBannier: Banniere.data().urlBanniere,
                    createdAt: moment(Banniere.data().createdAt.toDate()).fromNow()
                })
            })
            res.send(voirData)

        }catch(err){
            res.status(500).send(err);
        }
    }




    public async getOne(req: express.Request, res: express.Response){

        try{
            const BanniereId: string = req.params.id;
            const Banniere:any = await BanniereDAO.instance.getOne(BanniereId);
            res.send({
                id: Banniere.id,
                urlBannier: Banniere.data().urlBannier,
                createdAt: Banniere.data().createdAt.toDate()  
            });

        }catch(err){
            res.status(500).send(err);
        }
    }

    public async post(req: express.Request, res: express.Response){
        try{

            const data:any = await BanniereDAO.instance.save(req.body);
            res.status(201).send({
                id:data.id
            })
            
    
        }catch(error){
            res.status(500).send(error);
        }
    }

    public async update(req:express.Request, res: express.Response){
        try{
            const BanniereId: string = req.params.id;
            const data = await BanniereDAO.instance.update(req.body, BanniereId);
            res.status(201).json(data)
            

        }catch(error){
            res.status(500).send(error);
        }
    }

    public async delete(req:express.Request, res: express.Response){
        try{
            
            const BanniereId: string = req.params.id;


            await BanniereDAO.instance.delete(BanniereId);
            res.status(201).send({
                id:BanniereId
            });

        }catch(error){
            res.status(500).send(error);
        }
    }

}