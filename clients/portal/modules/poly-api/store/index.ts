import { BehaviorSubject } from 'rxjs';
import { lensPath, set, dissocPath, path } from 'ramda';

import { PolyCanvasStore } from './canvas';

function getInitState(): POLY_API.Root {
  return {
    currentNodeConfigParams: {
      currentNode: undefined,
      schema: {},
      onClose: undefined,
      excludedFields: [],
    },
    nodes: new PolyCanvasStore([]),
  };
}

export class PolyStore extends BehaviorSubject<POLY_API.Root> {
  constructor(initialState: POLY_API.Root) {
    super(initialState);
  }

  init(polyInfo?: POLY_API.POLY_INFO): void {
    this.next({ ...getInitState(), polyInfo });
  }

  set(key: string, value: any): void {
    this.next(set(lensPath(key.split('.')), value, this.value));
  }

  get<T>(key: string): T {
    return path(key.split('.'), this.value) as T;
  }

  unset(key: string): void {
    this.next(dissocPath(key.split('.'), this.value));
  }

  getRootValue(): POLY_API.PlainRoot {
    const { nodes, ...valueWithoutNodes } = this.value;
    return { ...valueWithoutNodes, nodes: nodes.getElementsValue() };
  }
}

const store$ = new PolyStore(getInitState());

export default store$;
