// https://vitejs.dev/config/

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
// import vueI18n from "@intlify/unplugin-vue-i18n/vite";
import process from "process";
// import mkcert from "vite-plugin-mkcert";
import { resolve } from "path";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import * as fs from "fs";
global.window = global.window || {};

window.process = process;
// const fs = require('fs')

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    vuetify({
      autoImport: { labs: true },
    }),
    // mkcert(),
    //   new webpack.DefinePlugin({
    // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    //   }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://cra-backend-a041b1ab5b0c.herokuapp.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      https: {
        //key: fs.readFileSync("../certs/example.com+5-key.pem"),
        //cert: fs.readFileSync("../certs/example.com+5.pem"),
        //ca: fs.readFileSync('./certs/my-ca.crt')
      },
    },
  },
  // server: {
  //   https: {
  //     // key: fs.readFileSync('./certs/example.com+5-key.pem'),
  //     // cert: fs.readFileSync('./certs/example.com+5.pem'),
  //   },
  //   // public: "https://localhost/:4173/",
  // },
});
