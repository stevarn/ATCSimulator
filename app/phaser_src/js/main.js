var FlightRouteSim = FlightRouteSim || {};

FlightRouteSim.game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, '');

FlightRouteSim.game.state.add('Boot', FlightRouteSim.Boot);
FlightRouteSim.game.state.add('Preload', FlightRouteSim.Preload);
FlightRouteSim.game.state.add('Game', FlightRouteSim.Game);

FlightRouteSim.game.global = {};
FlightRouteSim.game.global.airport_code = "SAN";
FlightRouteSim.game.state.start('Boot');