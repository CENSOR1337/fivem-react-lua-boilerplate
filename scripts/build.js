//@ts-check

import { exists, exec, getFiles } from './utils.js';
import { createBuilder, createFxmanifest } from '@overextended/fx-utils';

const watch = process.argv.includes('--watch');
const web = await exists('./web');
const dropLabels = ['$BROWSER'];

if (!watch) dropLabels.push('$DEV');

createBuilder(
  watch,
  {
    keepNames: true,
    legalComments: 'inline',
    bundle: true,
    treeShaking: true,
  },
  [],
  async (outfiles) => {
    const files = await getFiles('dist/web', 'static', 'locales');
    await createFxmanifest({
      client_scripts: [
        "src/modules/*.shared.lua",
        "src/modules/*.client.lua",
        "src/core/shared.lua",
        "src/core/client.lua"
      ],
      server_scripts: [
        "src/modules/*.shared.lua",
        "src/modules/*.server.lua",
        "src/core/shared.lua",
        "src/core/server.lua"
      ],
      files: ['lib/init.lua', 'lib/client/**.lua', 'locales/*.json', ...files],
      dependencies: ['/server:13068', '/onesync'],
      metadata: {
        ui_page: 'dist/web/index.html',
      },
    });

    if (web && !watch) await exec("cd ./web && vite build");
  }
);

if (web && watch) await exec("cd ./web && vite build --watch");
