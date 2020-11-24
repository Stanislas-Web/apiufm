import express from 'express';
import moment from '../config/moment'
// tslint:disable-next-line: no-implicit-dependencies
import { EmissionDAO } from "@services/DAO/emission.dao";
export class EmissionRoute {
    private static _instance: EmissionRoute;
    public static get instance() {
        if (!this._instance) {
            this._instance = new EmissionRoute();
        }
        return this._instance;
    }
    public async get(req: express.Request, res: express.Response){


        try{
            const resultats = await EmissionDAO.instance.all();
            const voirData:any = [];
            resultats.forEach((Emission)=>{
                voirData.push({
                    id: Emission.id,
                    nom: Emission.data().nom,
                    type: Emission.data().type,
                    photo: Emission.data().photo,
                    journaliste: Emission.data().journaliste,
                    photoJournaliste: Emission.data().photoJournaliste,
                    description: Emission.data().description,
                    createdAt: moment(Emission.data().createdAt.toDate()).fromNow()
                })
            })
            res.send(voirData)

        }catch(err){
            res.status(500).send(err);
        }
    }




    public async getOne(req: express.Request, res: express.Response){

        try{
            const EmissionId: string = req.params.id;
            const Emission:any = await EmissionDAO.instance.getOne(EmissionId);
            res.send({
                id: Emission.id,
                nom: Emission.data().nom,
                type: Emission.data().type,
                photo: Emission.data().photo,
                podcast: Emission.data().podcast,
                duree: Emission.data().duree,
                journaliste: Emission.data().journaliste,
                createdAt: Emission.data().createdAt.toDate()  
            });

        }catch(err){
            res.status(500).send(err);
        }
    }

    public async post(req: express.Request, res: express.Response){
        try{

            const data:any = await EmissionDAO.instance.save(req.body);
            res.status(201).send({
                id:data.id
            })
            
    
        }catch(error){
            res.status(500).send(error);
        }
    }

    public async update(req:express.Request, res: express.Response){
        try{
            const EmissionId: string = req.params.id;
            const data = await EmissionDAO.instance.update(req.body, EmissionId);
            res.status(201).json(data)
            

        }catch(error){
            res.status(500).send(error);
        }
    }

    public async delete(req:express.Request, res: express.Response){
        try{
            
            const EmissionId: string = req.params.id;


            await EmissionDAO.instance.delete(EmissionId);
            res.status(201).send({
                id:EmissionId
            });

        }catch(error){
            res.status(500).send(error);
        }
    }



}