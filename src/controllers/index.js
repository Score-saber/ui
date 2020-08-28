const logger = require('../log');
const request = require('node-fetch');

exports.getRoot = async(req, res) => {
    try {
        if(req.params.page === undefined || null) {
            await request(`http://localhost:801/maps/`)
            .then(res => res.json())
            .then(maps => {
                if(maps.success === false) {
                    res.view('404.ejs', {
                        error: 'Error getting maps'
                    });
                }
                request(`http://localhost:801/maps/latest/1`)
                .then(res => res.json())
                .then(latest => {
                    if(latest.success === false) {
                        res.view('404.ejs', {
                            error: 'Error getting maps'
                        });
                    }

                    request(`http://localhost:801/maps/plays/1`)
                    .then(res => res.json())
                    .then(plays => {
                        if(plays.success === false) {
                            res.view('404.ejs', {
                                error: 'Error getting maps'
                            });
                        }

                        res.view('index.ejs', {
                            maps: maps.maps,
                            latest: latest.maps,
                            plays: plays.maps
                        });
                    });
                });
            });
        } else {
            await request(`http://localhost:801/maps/${req.params.page}`)
            .then(res => res.json())
            .then(maps => {
                if(maps.success === false) {
                    res.view('404.ejs', {
                        error: 'Error getting maps'
                    });
                }
                request(`http://localhost:801/maps/latest/${req.params.page}`)
                .then(res => res.json())
                .then(latest => {
                    if(latest.success === false) {
                        res.view('404.ejs', {
                            error: 'Error getting maps'
                        });
                    }

                    request(`http://localhost:801/maps/plays/${req.params.page}`)
                    .then(res => res.json())
                    .then(plays => {
                        if(plays.success === false) {
                            res.view('404.ejs', {
                                error: 'Error getting maps'
                            });
                        }

                        res.view('index.ejs', {
                            maps: maps.maps,
                            latest: latest.maps,
                            plays: plays.maps
                        });
                    });
                });
            });
        }
    } catch(error) {
        logger.logError(error);
    }
};

exports.postMap = async(req, res) => {
    try {
        res.redirect(`http://localhost/map/${req.body.id}`);
    } catch(error) {
        throw error;
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
                    scores: json.scores
                })
            });
        })
    } catch(error) {
        logger.logError(error);
    }
}

exports.postPlayer = async(req, res) => {
    try {
        res.redirect(`http://localhost/player/${req.body.id}`);
    } catch(error) {
        logger.logError(error);
    }
}