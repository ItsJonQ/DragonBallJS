//// MOVE ANALYSIS

var battle = [];
var battleInfo = {
	round: 0
};

var analyzeMoves = function() {
	var player = this;
	var moves = player.moves;
	var moveIndex = moves.length - 1;
	queueMove({ move: moves[moveIndex], index: moveIndex, player: player });
};

var queueMove = function(moveObject) {
	if(moveObject !== undefined) {
		if(battleInfo.round === moveObject.index) {
			battle.push(moveObject);
			if(battle.length === 2) {
				console.log(compareMoves(battle[0], battle[1]));
				battle.length = 0;
				battleInfo.round++;
			} else {
				return console.log('Awaiting both players to make their moves.');
			}
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
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
			case 'charge' :
			return 'Both players charged.';
			break;
			case 'dragon' :
			return moveB.player.attack(moveA.player, moveB.move.damage);
			break;
			case 'dodge' :
			return moveA.player.name + ' charged, and ' + moveB.player.name + ' dodged';
			break;
			case 'fire' : 
			return moveB.player.attack(moveA.player, moveB.move.damage);
			break;
		}
		break;
	}
	return true;
};

var compareMoves = function(moveA, moveB) {
	if(moveA !== undefined && moveB !== undefined) {
		if(compareMoveIndex(moveA, moveB)) {
			return compareMoveType(moveA, moveB);
		} else {
			return false;
		}
	} else {
		return false;
	}
}