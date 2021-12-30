import { build } from "https://deno.land/x/dnt/mod.ts";

await build({
  entryPoints: ["./mod.ts"],
  rootTestDir: "./src",
  outDir: "./npm",
  package: {
    // package.json properties
    name: "test-randomizing",
    version: Deno.args[0],
    description:
      "Test Randomizing helps you to build randomized objects or class instances for your tests.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/tiloio/test-randomizing.git",
    },
    bugs: {
      url: "https://github.com/tiloio/test-randomizing/issues",
    },
  },
});

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
