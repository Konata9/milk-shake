import {format} from "./format";
import {melt} from "./melt";
import {map} from './map';

function shake(params: {[key: string]: any}) {
  return (...formatters: [any]) => {
    return [...formatters].reduce((prev, current) => current(prev), params);
  };
}

export {shake, format, melt, map};
