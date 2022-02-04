import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import create from 'mailgun-js';
import Evento from '../models/eventosModel.js';
import User from '../models/userModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const eventoRouter = express.Router();

eventoRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const category = req.query.category || '';
    const seller = req.query.seller || '';
    const order = req.query.order || '';
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const sellerFilter = seller ? { seller } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : { _id: -1 };
    const count = await Evento.count({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    const eventos = await Evento.find({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .populate('seller', 'seller.name seller.logo')
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.send({ eventos, page, pages: Math.ceil(count / pageSize) });
  })
);


eventoRouter.get(
    '/categories',
    expressAsyncHandler(async (req, res) => {
      const categories = await Evento.find().distinct('category');
      res.send(categories);
      
    })
  
  );
  

eventoRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const seller = await User.findOne({ isSeller: true });
    if (seller) {
       const createdEventos = await Evento.insertMany(eventos);
      res.send({ createdEventos });
      console.log(createdEventos)
    } else {
      res
        .status(500)
        .send({ message: 'No seller found. first run /api/users/seed' });
    }
  })
);

eventoRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const evento = await Evento.findById(req.params.id).populate(
      'seller',
      'seller.titulo seller.logo seller.rating seller.numReviews'
    );
    if (evento) {
      res.send(evento);
    } else {
      res.status(404).send({ message: 'Evento Not Found' });
    }
  })
);


eventoRouter.post(
    '/',
    isAuth,
    isSellerOrAdmin,
    expressAsyncHandler(async (req, res) => {
      const evento = new Evento({
        name: 'sample name ' + Date.now(),
        seller: req.user._id,
        image: '/images/p1.jpg',
        price: 0,
        category: 'sample category',
        brand: 'sample brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description',
       });
      const createdEvento = await evento.save();
      res.send({ message: 'Evento Created', evento: createdEvento});
    })
  );

  eventoRouter.put(
    '/:id',
    isAuth,
    isSellerOrAdmin,
    expressAsyncHandler(async (req, res) => {
      const eventoId = req.params.id;
      const evento = await Evento.findById(eventoId);
      if (evento) {
       evento.name = req.body.name;
       evento.price = req.body.price;
       evento.image = req.body.image;
       evento.category = req.body.category;
       evento.brand = req.body.brand;
       evento.countInStock = req.body.countInStock;
       evento.description = req.body.description;
       const updatedEvento = await evento.save();
        res.send({ message: 'Evento Updated', evento: updatedEvento });
      } else {
        res.status(404).send({ message: 'Evento Not Found' });
      }
    })
  );

  eventoRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const evento = await Evento.findById(req.params.id);
      if (evento) {
        const deleteEvento = await evento.remove();
        res.send({ message: 'Evento Eliminado', evento: deleteEvento });
      } else {
        res.status(404).send({ message: 'Evento no encontrado' });
      }
    })
  );


  eventoRouter.post(
    '/:id/reviews',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const eventoId = req.params.id;
      const evento = await Evento.findById(eventoId);
      if (evento) {
        if (evento.reviews.find((x) => x.name === req.user.name)) {
          return res
            .status(400)
            .send({ message: 'You already submitted a review' });
        }
        const review = {
          name: req.user.name,
          rating: Number(req.body.rating),
          comment: req.body.comment,
        };
        evento.reviews.push(review);
        evento.numReviews = evento.reviews.length;
        evento.rating =
          evento.reviews.reduce((a, c) => c.rating + a, 0) /
          evento.reviews.length;
        const updatedEvento = await evento.save();
        res.status(201).send({
          message: 'Review Created',
          review: updatedEvento.reviews[updatedEvento.reviews.length - 1],
        });
      } else {
        res.status(404).send({ message: 'evento Not Found' });
      }
    })
  );
  
  export default eventoRouter;
 