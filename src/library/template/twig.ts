import * as fs from "fs";
import * as twig from "twig";
import {isDev, DIR_TEMPLATE} from '../../common'

export default class Twig {
  public data: any;
  constructor() {
    this.data = {};
  }

  public set(key: string, value: object | string | number) {
    this.data[key] = value;
  }

  public async render(template: string) {

    if(isDev) {
      twig.cache(false)
    }

    const p = new Promise((resolve, reject) => {
      twig.renderFile(
        "view/template/" + template + ".twig",
        this.data,
        (err, txt) => {
          resolve(txt);
        }
      );
    });

    return await p;
  }
}
