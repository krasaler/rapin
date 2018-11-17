import { initRegistry, } from "../helper/common";
import Registry from "../engine/registry";
import { isUndefined, replace, join, split, map, capitalize } from "lodash";
import * as glob from 'glob'

let registry: Registry = initRegistry()
const results = []
let controllerPath: string = ''

export const Auth = () => {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
      for (const key in results) {
        if (results[key].action === controllerPath + '/' + propertyKey) {
          results[key].auth = true
        }
      }
    }
  }
  
  export const GET = (path, type = 'json') => {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
      results.push({
        path,
        type: 'GET',
        contentType: type,
        auth: false,
        action: controllerPath + '/' + propertyKey,
      })
    }
  }
  
  export const POST = (path, type = 'json') => {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
      results.push({
        path,
        type: 'POST',
        contentType: type,
        auth: false,
        action: controllerPath + '/' + propertyKey,
      })
    }
  }
  export const DELETE = (path, type = 'json') => {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
      results.push({
        path,
        type: 'DELETE',
        contentType: type,
        auth: false,
        action: controllerPath + '/' + propertyKey,
      })
    }
  }
  
  export const PUT = (path, type = 'json') => {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
      results.push({
        path,
        type: 'PUT',
        contentType: type,
        auth: false,
        action: controllerPath + '/' + propertyKey,
      })
    }
  }
  
  export const required = (list) => {
    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
      const originalMethod = descriptor.value
      descriptor.value = function(...args: any[]) {
        for (const key in list) {
          if (isUndefined(registry.get('request').post[list[key]])) {
            registry.get('error').set('missing_' + list[key])
          }
        }
        if (!registry.get('error').get()) {
          return originalMethod.apply(this, args)
        }
      }
    }
  }
  

  export const routes = (registryOption: Registry) => {
    registry = registryOption
    const controllers = glob.sync('src/controller/**/*.ts')
    for (const value of controllers) {
      controllerPath = replace(value, 'src/controller/', '')
      controllerPath = replace(controllerPath, '.ts', '')

      let controller = require('controller/' + controllerPath)

      const controllerName = 'Controller' + join(map(split(controllerPath, '/'), (value) => (capitalize(value))), '')

      controller = controller[controllerName]

      registry.set(controllerName, new controller(registry))
    }

    return results
  }
  