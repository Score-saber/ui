const server = require('fastify')({ logger: false, http2: false });
const logger = require('./log');
const routes = require('./routes');

routes.forEach((route, index) => {
    server.route(route);
});

(async() => {
    try {
        await server.listen(80, '0.0.0.0',
        function(error, address) {
            if(error) {
                logger.logError(error);
            }

            logger.logInfo(`Listening at ${address}`);
        });

        server.register(require('point-of-view'), {
            engine: {
                ejs: require('ejs')
            },
            root: require('path').join(__dirname + '/views')
        });

        server.register(require('fastify-static'), {
            root: require('path').join(__dirname + '/public'),
            prefix: '/public'
        });

        server.register(require('fastify-formbody'));
        server.register(require('fastify-multipart'), {
            limits: {
              fieldNameSize: 100, 
              fieldSize: 1000000, 
              fields: 10,         
              fileSize: 100,      
              files: 1,           
              headerPairs: 2000   
            }
        });
    } catch(error) {
        logger.logError(error);
    }
})();

process.on('uncaughtException', error => { logger.logError(error); });
process.on('unhandledRejection', error => { logger.logError(error); });