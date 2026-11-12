const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

// Racine du monorepo (deux niveaux au-dessus de apps/mobile)
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// 1. Surveiller tout le monorepo (pour voir packages/shared)
config.watchFolders = [monorepoRoot];

// 2. Chercher les modules dans les deux node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

// 3. Une seule copie de React : expo-router (hisse a la racine) doit
//    utiliser le meme React que nos ecrans, sinon "Invalid hook call".
const UNIQUES = ["react", "react-dom"];
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const racine = moduleName.split("/")[0];
  if (UNIQUES.includes(racine)) {
    return context.resolveRequest(
      { ...context, originModulePath: path.join(projectRoot, "package.json") },
      moduleName,
      platform
    );
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
