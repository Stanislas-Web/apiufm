import express from 'express';
import moment from '../config/moment'
// tslint:disable-next-line: no-implicit-dependencies
import { PodcastDAO } from "@services/DAO/podcast.dao";
export class PodcastRoute {
    private static _instance: PodcastRoute;
    public static get instance() {
        if (!this._instance) {
            this._instance = new PodcastRoute();
        }
        return this._instance;
    }

    public async getRecent(req: express.Request, res: express.Response){



        try{
            let resultats = await PodcastDAO.instance.all();
            let  voirData:any = [];
            let filterResults = [];

            

            resultats.forEach((Podcast)=>{
                voirData.push({
                    id: Podcast.id,
                    nomEmission: Podcast.data().nomEmission,
                    streamUrl: Podcast.data().streamUrl,
                    duree: Podcast.data().duree,
                    photo: Podcast.data().photo,
                    createdAt: moment(Podcast.data().createdAt.toDate()).fromNow()
                })
            })
            if(voirData.length < 2){
                res.send(voirData);
            }else{

                            
                for (let i = 0; i < 2; i++) {
                    filterResults.push(voirData[i]);
                    
                }
            
                res.send(filterResults);
            }


        }catch(err){
            res.status(500).send(err);
        }
    }

    public async get(req: express.Request, res: express.Response){


        try{
            const resultats = await PodcastDAO.instance.all();
            const voirData:any = [];
            resultats.forEach((Podcast)=>{
                voirData.push({
                    id: Podcast.id,
                    nomEmission: Podcast.data().nomEmission,
                    streamUrl: Podcast.data().streamUrl,
                    duree: Podcast.data().duree,
                    photo: Podcast.data().photo,
                    createdAt: moment(Podcast.data().createdAt.toDate()).fromNow()
                })
            })
            res.send(voirData)

        }catch(err){
            res.status(500).send(err);
        }
    }




    public async getOne(req: express.Request, res: express.Response){

        try{
            const PodcastId: string = req.params.id;
            const Podcast:any = await PodcastDAO.instance.getOne(PodcastId);
            res.send({
                id: Podcast.id(),
                NomEmission: Podcast.NomEmission(),
                StreamUrl: Podcast.StreamUrl(),
                Duree: Podcast.duree(),
                Photo: Podcast.photo()
            });

        }catch(err){
            res.status(500).send(err);
        }
    }

    public async post(req: express.Request, res: express.Response){
        try{

            const data:any = await PodcastDAO.instance.save(req.body);
            res.status(201).send({
                id:data.id
            })
            
    
        }catch(error){
            res.status(500).send(error);
        }
    }

    public async update(req:express.Request, res: express.Response){
        try{
            const PodcastId: string = req.params.id;
            const data = await PodcastDAO.instance.update(req.body, PodcastId);
            res.status(201).json(data)
            

        }catch(error){
            res.status(500).send(error);
        }
    }

    public async delete(req:express.Request, res: express.Response){
        try{
            
            const PodcastId: string = req.params.id;


            await PodcastDAO.instance.delete(PodcastId);
            res.status(201).send({
                id:PodcastId
            });

        }catch(error){
            res.status(500).send(error);
        }
    }



}