const logger = require('../log');
const request = require('node-fetch');

exports.getRoot = async(req, res) => {
    try {
        await request(`http://localhost:801/maps`)
        .then(res => res.json())
        .then(json => {
            if(json.success === false) {
                res.view('404.ejs', {
                    error: 'Error getting maps'
                });
            }

            let maps = json.maps;
            res.view('index.ejs', {
                maps: maps
            });
        });

    } catch(error) {
        logger.logError(error);
    }
};

exports.getMap = async(req, res) => {
    try {
        await request(`http://localhost:801/map/${req.params.id}`)
        .then(res => res.json())
        .then(json => {
            if(json.success === false) {
                res.view('404.ejs', {
                    error: 'Map not found'
                });
            }

            res.view('map.ejs', {
                map: json.maps
            });
        });
    } catch(error) {    
        logger.logError(error);
    }
};

exports.getPlayerRecent = async(req, res) => {
    try {
        await request(`http://localhost:801/player/${req.params.id}/recent`)
        .then(res => res.json())
        .then(json => {
            if(json.success === false) {
                res.view('404.ejs', {
                    error: `Player not found`
                });
            }

            let scores = json.scores;
            request(`http://localhost:801/player/${req.params.id}`)
            .then(res => res.json())
            .then(playerInfo => {
                if(playerInfo.success === false) {
                    res.view('404.ejs', {
                        error: `Player not found`
                    });
                }

                res.view('player.ejs', {
                    playerName: playerInfo.playerInfo.playerName,
                    scores
                })
            });
        })
    } catch(error) {
        logger.logError(error);
    }
}