import express from 'express';
// tslint:disable-next-line: no-implicit-dependencies
// import { UserRoute} from '@routes/user.route';
// tslint:disable-next-line: no-implicit-dependencies
import { EmissionRoute} from '@routes/emission.route';
import { PodcastRoute} from '@routes/podcast.route';
export const router = express.Router();

/**
 * user Routing
 */ 
router.get('/podcasts',PodcastRoute.instance.get);
router.post('/podcasts',PodcastRoute.instance.post);
router.put('/podcasts/:id',PodcastRoute.instance.update);
router.delete('/podcasts/:id',PodcastRoute.instance.delete);
router.get('/podcasts/:id',PodcastRoute.instance.getOne);
router.get('/podcastsRecents',PodcastRoute.instance.getRecent);


/**
 * Emission Routing
 */ 
router.get('/emissions',EmissionRoute.instance.get);
router.post('/emissions',EmissionRoute.instance.post);
router.put('/emissions/:id',EmissionRoute.instance.update);
router.delete('/emissions/:id',EmissionRoute.instance.delete);
router.get('/emissions/:id',EmissionRoute.instance.getOne);


/**
 * produit Routing
 */ 
// router.get('/categorie',CategorieRoute.instance.get);
// router.post('/categorie',CategorieRoute.instance.post);
// router.get('/categorie/:id',CategorieRoute.instance.get);
// router.delete('/categorie/:id',CategorieRoute.instance.delete);
// router.put('/categorie',CategorieRoute.instance.update);