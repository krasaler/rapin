import * as fs from 'fs'
import { isUndefined } from 'lodash'
import {isDev } from '../common'

export default class Config {
  public data: object
  constructor() {
    this.data = {}
  }

  public get(key) {
    return !isUndefined(this.data[key]) ? this.data[key] : key
  }

  public set(key, value) {
    this.data[key] = value
  }

  public has(name) {
    return !isUndefined(this.data[name])
  }

  public load(filename: string) {
    const filepath: string = 'lib/config/' + filename + '.js'

    let data: any = {}
    if (fs.existsSync(filepath) && fs.lstatSync(filepath).isFile()) {
      data = require('config/' + filename)
    }

    if(data.default) {
      data = data.default
    }

    this.data = { ...this.data, ...data }

    return this.data
  }
}
