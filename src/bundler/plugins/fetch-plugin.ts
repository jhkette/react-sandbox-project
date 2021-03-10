import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});

// takes input code as  parameter
export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      // runs input code
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          // this is the input code from code editor
          contents: inputCode,
        };
      });
      // filter for other requests
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // first get cached result
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        // if cached return result
        if (cachedResult) {
          return cachedResult;
        }
      });
      // filter for css files
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        // get data and request objects from axios.get
        const { data, request } = await axios.get(args.path);
        // replace new lines, quotation marks with escaped quotation marks etc
        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        // create css as js 
        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
        `;
        // 
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          // contents is the css turned into js style.innertext
          contents,
          // resolveDir new URL 
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);

        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
