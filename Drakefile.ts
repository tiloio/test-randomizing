import { run, sh, task } from "https://deno.land/x/drake@v1.5.0/mod.ts";
import { VERSION } from "./version.ts";

const srcDir = "src";

task("test", [], async () => {
  await sh(`deno test ${srcDir}`);
  await sh(`deno lint ${srcDir}`);
});

const format = async () => {
  await Promise.all([
    sh(`deno fmt ${srcDir}`),
  ]);
};

task("format", [], format);
task("fmt", [], format);

task("build", [], async () => {
  await Promise.all([
    sh(`deno run -A ./build_npm.ts ${VERSION}`),
  ]);
});

task("prep", ["test", "format", "build"], async () => {});

task("publish", ["test", "format", "build"], async () => {
  await Promise.all([
    sh(`cd ./npm && npm publish`),
  ]);
});

run();
