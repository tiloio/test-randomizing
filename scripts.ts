import type { ScriptsConfiguration } from "https://arweave.net/c_Zr-jv4RfZ1ERXdE3PMCT7GjMSGXAT1wKnhPbC4Cmg/mod.ts";
import eggJson from "./egg.json" assert { type: "json" };

const srcDir = "src";
const version = eggJson.version;

const install = [`deno install -Af --unstable https://x.nest.land/eggs@0.3.10/eggs.ts`];
const test = `deno test ${srcDir}`;
const lint = `deno lint ${srcDir}`;
const fmt = `deno fmt ${srcDir}`;
const publishNest = `egg publish`;
const publishNestPatch = `egg publish --bump patch`;
const buildNpm = `deno run -A ./build_npm.ts ${version}`;
const publishNpm = `cd ./npm && npm publish`;

const check = {
  cmd: {
    pll: [test, fmt, lint],
  },
  gitHook: "pre-commit",
};

export default <ScriptsConfiguration>{
  scripts: {
    install,
    test,
    testWatch: {
      cmd: test,
      watch: true,
    },
    lint,
    fmt,
    check,
    buildNpm,
    publishNpm,
    releaseNpm: [check, buildNpm, publishNpm],
    publishNest,
    release: [publishNest, buildNpm, publishNpm],
    releasePatch: [publishNestPatch, buildNpm, publishNpm],
  },
};
