import { readFile } from 'fs/promises';
import { join, resolve } from 'path';
import { RouterViewOutputPort } from 'src/application/port/output/router-view.output-port';
import { Router } from 'src/domain/router';
import { RouterId } from 'src/domain/router.id';
import { RouterType } from 'src/domain/router.type';

class RouterViewFileAdapter implements RouterViewOutputPort {
  async fetchRouters(): Promise<Router[]> {
    return await this.readFileAsString();
  }

  async readFileAsString(): Promise<Router[]> {
    const lineToRouter = (line: string): Router => {
      const [id, type] = line.split(';');
      return new Router(RouterType[type], RouterId.of(id));
    };

    const routers = (await readFile(join(resolve(), 'resource/routers.txt'))).toString().split('\n').map(lineToRouter);
    return routers;
  }
}

export const routerViewFileAdapter = new RouterViewFileAdapter();
