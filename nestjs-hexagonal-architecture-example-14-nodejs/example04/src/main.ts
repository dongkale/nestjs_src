import bodyParser from 'body-parser';
import express from 'express';
import { createInterface } from 'readline/promises';
import { RouterNetworkInputPort } from 'src/application/port/input/router-network.input-port';
import { RouterNetworkRestAdapter } from 'src/framework/adapter/input/rest/router-network.rest.adapter';
import { RouterNetworkCLIAdapter } from 'src/framework/adapter/input/stdin/router-network.cli.adapter';
import { routerNetworkFileAdapter } from 'src/framework/adapter/output/file/router-network.file.adapter';
import { prisma } from 'src/framework/adapter/output/prisma/prisma';
import { routerNetworkPrismaAdapter } from 'src/framework/adapter/output/prisma/router-network.prisma.adapter';
import { WebApp } from 'src/web-app.factory';

async function main(): Promise<void> {
  const readline = createInterface({ input: process.stdin, output: process.stdout });
  const mode = await readline.question('> Please enter the mode : ');
  if (mode !== 'cli' && mode !== 'rest') throw new Error('mode is only cli or rest');
  if (mode === 'cli') {
    const usecase = new RouterNetworkInputPort(routerNetworkFileAdapter);
    const routerNetworkCliAdapter = new RouterNetworkCLIAdapter(usecase);
    await routerNetworkCliAdapter.processRequest(createInterface({ input: process.stdin, output: process.stdout }));
  } else {
    const usecase = new RouterNetworkInputPort(routerNetworkPrismaAdapter);
    const app = new WebApp();
    const routerNetworkRestAdapter = new RouterNetworkRestAdapter(usecase);
    routerNetworkRestAdapter.processRequest(app);
    app.start();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
