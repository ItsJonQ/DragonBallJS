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
				charge: 3,
				damage: 3,
				name: 'DRAGON'
			},
			fire: {
				charge: 1,
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
		return this.addWin(damage);
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

Player.prototype.addWin = function(damage) {
	var message;
	this.wins = this.wins + 1;
	if(damage >= 3) {
		message = this.name + ' DRAGON and has won the game.';
	} else {
		message = this.name + ' has won the game.';
	}
	return message;
}

// MOVE PROTOTYPES

//// NEW STUFF // CALLBACK + CALL()
Player.prototype.initMove = function(callback) {
	if(callback !== undefined && typeof callback === 'function') {
		if(callback.call(this, callback) !== false) {
			analyzeMoves.call(this, analyzeMoves); 
		} else {
			return false;
		}
		return true;
	} else {
		return false;
	}
};

Player.prototype.block = function() {

};

//// NEW STUFF
Player.prototype.chargeCheck = function(attack) {
	if(attack !== undefined) {
		if(this.charges >= attack.charge) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

Player.prototype.charge = function() {
	this.initMove(function() {
		var value = this.movelist.charge.charge;
		this.charges = this.charges + value;
		this.moves.push(this.movelist.charge);
		return this.name + ' charged.';
	});
};

Player.prototype.dragon = function() {
	var dragon = this.movelist.attack.dragon;
	this.initMove(function() {
		if(this.chargeCheck(dragon)) {
			this.moves.push(dragon);
			return this.name + ' DRAGONED!!!';
		} else {
			return false;
		}
	});  
};

Player.prototype.fire = function() {
	var fire = this.movelist.attack.fire;
	this.initMove(function() {
		if(this.chargeCheck(fire)) {
			this.moves.push(fire);
			return this.name + ' fired a fireball.';
		} else {
			return false;
		}
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
		this.gamesPlayed = this.gamesPlayed + 1;
		return true;
	} else {
		return false;
	}
};