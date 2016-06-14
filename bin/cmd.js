#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var file = process.argv[2];
var input = file || "package.json";
var pkgPath = path.join(process.cwd(), input);
function addNODE_ENV_if_needed(pkg) {
    if (!pkg) {
        return pkg;
    }
    if (!pkg.scripts) {
        return pkg;
    }
    if (!pkg.scripts.build) {
        return pkg;
    }
    const containBabel = pkg.scripts.build.indexOf("babel ") !== -1;
    const isNotContainNODE_ENV = pkg.scripts.build.indexOf("NODE_ENV=production") === -1;
    if (isNotContainNODE_ENV && containBabel) {
        pkg.scripts.build = "NODE_ENV=production " + pkg.scripts.build;
    }
    return pkg;
}

var pkg = require(pkgPath);
var rewrittenPkg = addNODE_ENV_if_needed(pkg);

fs.writeFileSync(pkgPath, JSON.stringify(rewrittenPkg, null, 2));
console.log("✔ rewrite packge.json");