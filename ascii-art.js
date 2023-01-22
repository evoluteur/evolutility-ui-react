var pkg = require("./package.json");

var splash =
  "  ______          _       _   _ _ _ _\n" +
  " |  ____|        | |     | | (_) (_) |\n" +
  " | |____   _____ | |_   _| |_ _| |_| |_ _   _\n" +
  " |  __\\ \\ / / _ \\| | | | | __| | | | __| | | |\n" +
  " | |___\\ V / (_) | | |_| | |_| | | | |_| |_| |\n" +
  " |______\\_/ \\___/|_|\\__,_|\\__|_|_|_|\\__|\\__, |\n" +
  "                                         __/ |\n" +
  "                                        |___/ " +
  " v." +
  pkg.version +
  "\n\n" +
  Date() +
  "\n";

console.log(splash);
