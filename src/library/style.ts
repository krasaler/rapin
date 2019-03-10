import * as fs from 'fs'
import * as path from 'path'
import {config} from '../common'

export default class Style {
  public style: any

  constructor() {
    const {engine} = config.style

    const filePath = path.resolve(__dirname, './style/' + engine + '.js')

    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
      const driverClass = require('./style/' + engine).default
      this.style = new driverClass()
    }
  }

  link(link: string) {
    return this.style.link(link)
  }

  path(filePath: string) {
    return this.style.path(filePath)
  }
}
