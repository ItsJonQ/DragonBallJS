var Player = function() {
    this.name = '';
    this.hp = 3;
    this.charges = 0;
    this.wins = 0;
    this.gamesPlayed = 0;
    this.movelist = {
        block: {
            block: {
                counters: 'fire',
                name: 'Block'
            },
            dodge: {
                counters: 'dragon',
                name: 'Dodge'
            }
        },
        charge: {
            charge: 1,
            name: 'Charge'
        },
        attack: {
            dragon: {
                damage: 3,
                name: 'DRAGON'
            },
            fire: {
                damage: 1,
                name: 'Fire'
            }
        }
    };
    this.moves = [];
};

Player.prototype.rename = function(newName) {
    this.name = newName;
};

Player.prototype.attack = function(target, damage) {
    target.hp = target.hp - damage;
    if(this.checkWin(target) === true) {
        return this.addWin();
    } else {
        return this.name + ' attacked ' + target.name + ', dealing ' + damage + ' damage!';
    }
}

Player.prototype.checkWin = function(target) {
    if(target.hp <= 0) {
        return true;
    } else {
        return false;
    }
}

Player.prototype.addWin = function() {
    this.wins = this.wins + 1;
    return this.name + ' has won the game.';
}

// MOVE PROTOTYPES

//// NEW STUFF // CALLBACK + CALL()
Player.prototype.initMove = function(callback) {
    if(callback !== undefined && typeof callback === 'function') {
        callback.call(this, callback);
        analyzeMoves();
    } else {
        return false;
    }
};

Player.prototype.block = function() {

};

//// NEW STUFF
Player.prototype.charge = function() {
    this.initMove(function() {
        var value = this.movelist.charge.charge;
        this.charges = this.charges + value;
        this.moves.push(this.movelist.charge);
        return this.name + ' charged.';
    });
};

Player.prototype.fire = function() {
    this.initMove(function() {
        this.moves.push(this.movelist.attack.fire);
        return this.name + ' fired a fireball.';
    });
};

Player.prototype.pastMoves = function() {
    var moveCount = this.moves.length;
    if(moveCount > 0) {
        var list = [];
        for(var i = 0; i < moveCount; i++) {
            var move = this.moves[i];
            list.push(move.name);
        }
        return list;
    } else {
        return this.name + " hasn't moved yet! Whata bitch..";
    }
};

Player.prototype.status = function() {
    return this.name + " has " + this.hp + " HP and " + this.charges + " charges.";
};


/////////////////////////////////////
// NEW STUFF
/////////////////////////////////////

Player.prototype.addToBattle = function() {
    if(arenaPlayerCount() < 2) {
        arena.push(this);
        return true;
    } else {
        return false;
    }
};


//// ARENA FUNCTIONS

var arena = [];

var arenaPlayerCount = function() {
    return arena.length;
}

var arenaHasPlayers = function() {
    if(arenaPlayerCount() > 0) {
        return true;
    } else {
        return false;
    }
};

var arenaEmpty = function() {
    return 'The arena is currently empty. No one wants to fight!';
};

var arenaPlayerNames = function() {
    if(arenaHasPlayers()) {
        var list = [];
        arenaForEachPlayer(function(player) {
            list.push(player.name);
        });
        return list;
    } else {
        return false;
    }
};

var arenaPlayerStats = function() {
    if(arenaHasPlayers()) {
        var output = '';
        for(var i = 0; i < arenaPlayerCount(); i++) {
            var player = arena[i];
            output += player.status() + '\n';
        }
        return output;
    } else {
        return arenaEmpty();
    }
};

var checkArena = function() {
    console.log('The arena currently has '+arenaPlayerCount()+' players.');
};



//// MOVE ANALYSIS

var arenaForEachPlayer = function(callback) {
    if(arenaHasPlayers()) {
        var players = arena;
        for(var index = 0; index < players.length; index++) {
            var player = players[index];
            if(callback !== undefined && typeof callback === 'function') {
                callback(player, index);
            } else {
                return false;
            }
        }
    } else {
        return arenaEmpty();
    }
}

var analyzeMoves = function() {
    var output = false;
    var moveCompare = [];

    arenaForEachPlayer(function(player) {
        var moves = player.moves;
        if(moves.length !== 0) {
            var moveIndex = moves.length - 1;
            moveCompare.push({ move: moves[moveIndex], index: moveIndex, player: player });
        } else {
            output = 'Awaiting '+player.name+' to make a move.';
        }
    });

    if(moveCompare.length === 2) {
        return console.log(compareMoves(moveCompare[0], moveCompare[1]));
    } else {
        return console.log('Awaiting both players to make their moves.');
    }

    return false;
};

var compareMoveIndex = function(moveA, moveB) {
    var same = true;
    if(moveA.index === moveB.index) {
        same = true;
    } else {
        same = false;
    }
    return same;        
};

var compareMoveType = function(moveA, moveB) {
    var moveNameA = moveA.move.name.toLowerCase();
    var moveNameB = moveB.move.name.toLowerCase();
    
    switch(moveNameA) {
        case 'charge' :
            switch(moveNameB) {
                case 'fire' : 
                    var dmg = moveB.move.damage;
                    return moveB.player.attack(moveA.player, dmg);
                break;
            }
        break;
    }
};

var compareMoves = function(moveA, moveB) {
    if(moveA !== undefined && moveB !== undefined) {
        if(compareMoveIndex(moveA, moveB)) {
            return compareMoveType(moveA, moveB);
        } else {
            return false
        }
    } else {
        return false;
    }
}
