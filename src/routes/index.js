const Controller = require('../controllers');

const routes = [
    {
        method: 'GET',
        url: '/',
        handler: Controller.getRoot
    },
    {
        method: 'GET',
        url: '/player/:id',
        handler: Controller.getPlayerRecent
    },
    {
        method: 'GET',
        url: '/map/:id',
        handler: Controller.getMap
    }
];

module.exports = routes;