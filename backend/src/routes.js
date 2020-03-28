const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfiletController = require('./controllers/ProfileController')
const SessiontController = require('./controllers/SessionController')

const routes = express.Router();

routes.post('/sessions', SessiontController.create)

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(12).max(13),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfiletController.index);

routes.post('/incidents', IncidentController.create)
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.index);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),IncidentController.delete)



module.exports = routes;