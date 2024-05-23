import bodyParser from 'body-parser';
import express, { Handler, Router } from 'express';

export class WebApp {
  private _app: express.Application;

  constructor(private readonly _port = 3000) {
    this._app = express();
    this._init();
  }

  public start(): void {
    this._app.listen(this._port, () => {
      console.log(`Service listening on ${this._port}`);
    });
  }

  public applyRouter(method: 'GET' | 'POST', url: string, handler: Handler): void {
    switch (method) {
      case 'GET':
        this._app.get(url, handler);
        return;
      case 'POST':
        this._app.post(url, handler);
        return;
    }
  }

  private _init(): void {
    this._app.use(bodyParser.json());
  }
}
