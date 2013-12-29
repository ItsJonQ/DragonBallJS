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