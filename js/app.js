
/////////////

var a, b;
var startGame = function() {
    a = new Player;
    b = new Player;

    a.rename('Jon');
    b.rename('Betty');

    a.addToBattle();
    b.addToBattle();

    console.log('Game has started');

    checkArena();

    a.charge();
    b.charge();

    a.charge();
    b.charge();

    a.charge();
    b.charge();

    a.dragon();
    b.dragon();

}

startGame();