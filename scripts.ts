import type { ScriptsConfiguration } from "https://arweave.net/c_Zr-jv4RfZ1ERXdE3PMCT7GjMSGXAT1wKnhPbC4Cmg/mod.ts";
import eggJson from "./egg.json" assert { type: "json" };

const srcDir = "src";
const version = eggJson.version;

const install = [`deno install -Af --unstable https://x.nest.land/eggs@0.3.10/eggs.ts`];
const test = `deno test ${srcDir}`;
const testDenoExample = `deno test ./examples/deno`;
const testNpm = `npm --prefix npm test`;
const lint = `deno lint ${srcDir}`;
const fmt = `deno fmt ${srcDir}`;
const releaseNest = `eggs publish`;
const releaseNestPatch = `eggs publish --release-type patch`;
const buildNpm = `deno run -A ./build_npm.ts ${version}`;
const publishNpm = `cd ./npm && npm publish`;

const check = {
  cmd: {
    pll: [test, testDenoExample, [fmt, lint], [buildNpm, testNpm]],
  },
  gitHook: "pre-commit",
};

export default <ScriptsConfiguration>{
  scripts: {
    install,
    test,
    testNpm,
    testDenoExample,
    testWatch: {
      cmd: test,
      watch: true,
    },
    lint,
    fmt,
    check,
    buildNpm,
    publishNpm,
    releaseNpm: [check, buildNpm, testNpm, publishNpm],
    releaseNestPatch: [releaseNestPatch],
    releaseNest: [releaseNest],
  },
};
