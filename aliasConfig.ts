import moduleAlias from "module-alias";

//
// Register alias
//
moduleAlias.addAlias("@routes", __dirname + "routes");

// Or multiple aliases
// moduleAlias.addAliases({
//   '@root'  : __dirname,
//   '@client': __dirname + '/src/client',
//   ...
// })

// Custom handler function (starting from v2.1)

//
// Register custom modules directory
//

//
// Import settings from a specific package.json
//
moduleAlias(__dirname + "/package.json");

// Or let module-alias to figure where your package.json is
// located. By default it will look in the same directory
// where you have your node_modules (application's root)
moduleAlias();
