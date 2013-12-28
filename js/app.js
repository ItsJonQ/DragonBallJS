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
		return damage;
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

Player.prototype.block = function() {

};

Player.prototype.charge = function() {
	var value = this.movelist.charge.charge;
	this.charges = this.charges + value;
	this.moves.push(this.movelist.charge);
	return this.name + ' charged.';
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

/////////////

var a, b;
var startGame = function() {
	a = new Player;
	b = new Player;

	a.rename('Jon');
	b.rename('Betty');
}

startGame();