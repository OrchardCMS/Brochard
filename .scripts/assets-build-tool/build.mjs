import JSON5 from "json5";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import concurrently from "concurrently";
import { fileURLToPath } from "url";
import parseArgs from "minimist";
import _ from "lodash";

import buildConfig from "./config.mjs";
import clean from "./clean.mjs";
import getAllAssetGroups from "./assetGroups.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// eslint-disable-next-line no-unused-vars
let parsedArgs = parseArgs(process.argv.slice(2));

let task = parsedArgs._[0];

if (!task) {
    task = "build";
}
console.log(chalk.green("Task: ", task));

let groups = getAllAssetGroups();

// Filter the packages if the user passes the -n cli flag
let packagesStr = parsedArgs.n;
if (packagesStr != undefined) {
    const packages = packagesStr.split(" ");
    if (packages.length > 0) {
        console.log(
            chalk.yellow("Filtering groups based on packages: "),
            packages.join(", ")
        );
        groups = groups.filter((g) => packages.includes(g.name));
    }
}

// Filter the tags if the user passes the -t cli flag
let tagsStr = parsedArgs.t;
if (tagsStr != undefined) {
    const tags = tagsStr.split(" ");
    if (tags.length > 0) {
        console.log(
            chalk.yellow("Filtering groups based on tag: "),
            tags.join(", ")
        );
        groups = groups.filter((g) => {
            if (Array.isArray(g.tags)) {
                return _.intersection(tags, g.tags)?.length > 0;
            } else {
                return tags.includes(g.tags);
            }
        });
    }
}

// Filter the tags if the user passes the -b cli flag
let bundleStr = parsedArgs.b;
if (bundleStr != undefined) {
    console.log(chalk.yellow("Filtering groups for orchardcore-bundle"));
    groups = groups.filter((g) => g.bundleEntrypoint);
}

if (task === "clean") {
    const returnCode = await clean(groups);
    process.exit(returnCode);
}

if (task === "build" || task === "watch") {
    // Group the parcel groups by bundle
    const parcelGroupsByBundle = _.groupBy(
        groups.filter((g) => g.bundleEntrypoint),
        (g) => g.bundleEntrypoint
    );

    // Remove those groups from the groups array as we will push new bundled groups instead.
    groups = groups.filter((g) => !g.bundleEntrypoint);

    if (parcelGroupsByBundle) {
        console.log(
            chalk.yellow("Building Parcel bundles: "),
            _.keys(parcelGroupsByBundle).join(", ")
        );

        const entries = [];
        // loop through each bundle and generate  the new combined group
        _.forEach(parcelGroupsByBundle, (value, bundleEntrypoint) => {
            // generate a file that will be the main import for this group
            const bundleImports = _.map(
                value,
                (g) => `import "${g.relativeSource}";`
            ).join("\n");
            const importPath = path.join(
                __dirname,
                `dist/${bundleEntrypoint}.js`
            );
            fs.outputFileSync(importPath, bundleImports, "utf8"); //bury this folder
            entries.push(importPath);
        });

        const parcelBundleOutput = buildConfig("parcelBundleOutput");
        groups.push({
            action: "parcel",
            name: `orchardcore-bundle`,
            source: entries,
            dest: parcelBundleOutput,
        });
    }
}

const buildProcesses = groups
    .map((group) => {
        //b64 encode the command group for the next process. Was easier to pass the group json to the subprocess
        const encodedGroup = Buffer.from(JSON5.stringify(group)).toString(
            "base64"
        );
        switch (group.action) {
            case "parcel":
                // parcel only handles build and watch
                if (!(task === "build" || task === "watch")) {
                    console.log(
                        chalk.yellow(
                            `parcel action does not handle build type: ${task} for ${group.name}`
                        )
                    );
                    break;
                }
                return {
                    order: group.order,
                    name: group.name,
                    command: `node ${path.join(
                        __dirname,
                        "parcel.mjs"
                    )} ${task} ${encodedGroup}`,
                };
            case "run":
                const script = group?.scripts[task]; //get's the script that matches the current type of command (build/watch or others)
                if (script) {
                    const cmd = {
                        order: group.order,
                        name: group.name,
                        command: `cd ${group.source} && ${script}`,
                    };
                    console.log("run command: ", cmd);
                    return cmd;
                }
                console.log(
                    chalk.yellow(
                        group.name,
                        "run action does not have a script for build type: ",
                        task
                    )
                );
                break;
            case "copy":
                if (task === "copy" || task === "build" || task === "dry-run") {
                    return {
                        order: group.order,
                        name: group.name,
                        command: `node ${path.join(
                            __dirname,
                            "copy.mjs"
                        )} ${task} ${encodedGroup}`,
                    };
                }
                console.log(
                    chalk.yellow(
                        "Use copy or build type to copy files from group: ",
                        group.name
                    )
                );
                break;
            case "min":
                if (task === "copy" || task === "build" || task === "dry-run") {
                    return {
                        order: group.order,
                        name: group.name,
                        command: `node ${path.join(
                            __dirname,
                            "min.mjs"
                        )} ${task} ${encodedGroup}`,
                    };
                }
                console.log(
                    chalk.yellow(
                        "Use min or build type to minify files from group: ",
                        group.name
                    )
                );
                break;
            case "sass":
                if (task === "copy" || task === "build" || task === "dry-run") {
                    return {
                        order: group.order,
                        name: group.name,
                        command: `node ${path.join(
                            __dirname,
                            "sass.mjs"
                        )} ${task} ${encodedGroup}`,
                    };
                }
                console.log(
                    chalk.yellow(
                        "Use sass or build type to transpile/minify files from group: ",
                        group.name
                    )
                );
                break;
            /*         case "gulp":
            if (task === "build") {
              return {
                order: group.order,
                name: group.name,
                command: `gulp build`,
              };
            }
            console.log(chalk.yellow("Use gulp from group: ", group.name));
            break; */
            default:
                console.log(
                    chalk.yellow(
                        "The following group was not handled by our build process"
                    ),
                    group.name
                );
                break;
        }
    })
    .filter((el) => el != undefined); // remove undefined entries

// Add the gulp build process if the user passes the -g cli flag
let gulpStr = parsedArgs.g;
if (gulpStr != undefined) {
    buildProcesses.push({
        order: 0,
        name: "starting gulp build",
        command: `gulp build`,
    });
}

if (buildProcesses.length <= 0) {
    console.log(chalk.yellow("Nothing to build, exiting..."));
    process.exit(0);
}

// run all builds in parallel. I chose to use concurrently here as it does nice colors + console log prefixes
const { result } = concurrently(
    buildProcesses.sort(function (a, b) {
        return a.order - b.order;
    }),
    {
        prefixColors: [
            "green",
            "yellow",
            "blue",
            "magenta",
            "cyan",
            "greenBright",
            "yellowBright",
            "blueBright",
            "magentaBright",
            "cyanBright",
        ],
    }
);

result.then(
    () => {
        console.log(chalk.bold.green("Success !"));
        process.exit(0);
    },
    (closeEvents) => {
        let actualErrors = false;

        closeEvents.forEach((evt) => {
            //3221225477 is an intermittent issue with windows ? and does not seem to represent an actual issue.
            if (evt.exitCode != 0 && evt.exitCode != 3221225477) {
                console.log(
                    chalk.red(
                        evt.command.name,
                        "exited with code",
                        evt.exitCode
                    )
                );
                actualErrors = true;
            } else if (evt.exitCode == 3221225477) {
                console.log(
                    chalk.yellow(
                        evt.command.name,
                        "exited with code",
                        evt.exitCode
                    )
                );
            }
        });

        if (actualErrors) {
            console.log(chalk.bold.redBright("Errors occurred!"));
            process.exit(1);
        } else {
            process.exit(0);
        }
    }
);