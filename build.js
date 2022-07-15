import esbuild from "esbuild"
import minimist from "minimist"
import {sassPlugin} from "esbuild-sass-plugin"

const args = await minimist(process.argv.slice(2));
let watch = false;

if (args.watch == 'true') {
  watch = {
    onRebuild(error, result) {
      if (error) console.error("Watch Build Failed:", error);
      else console.log("Watch Build Succeeded:", result);
    },
  };
}

await esbuild.build({
  entryPoints: ["src/app.ts", "src/app.scss"],
  outdir: "dist",
  bundle: true,
  watch: watch,
  loader: {
    ".ts": "ts",
    ".css": "css",
    ".scss": "css"
  },
  plugins: [sassPlugin()],
})
.then(() => {
  if (watch !== false) {
    console.log("...watching yer files");
  }
})
.catch(() => process.exit(1))
