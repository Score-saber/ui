const Controller = require('../controllers');

const routes = [
    {
        method: 'GET',
        url: '/:page',
        handler: Controller.getRoot
    },
    {
        method: 'GET',
        url: '/player/:id',
        handler: Controller.getPlayerRecent
    },
    {
        method: 'POST',
        url: '/player',
        handler: Controller.postPlayer
    },
    {
        method: 'POST',
        url: '/map',
        handler: Controller.postMap
    },
    {
        method: 'GET',
        url: '/map/:id',
        handler: Controller.getMap
    }
];

module.exports = routes;