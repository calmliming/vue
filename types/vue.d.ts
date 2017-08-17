import {
  Component,
  AsyncComponent,
  ComponentOptions,
  FunctionalComponentOptions,
  WatchOptionsWithHandler,
  WatchHandler,
  DirectiveOptions,
  DirectiveFunction,
  PropValidator,
  ThisTypedComponentOptionsWithArrayProps,
  ThisTypedComponentOptionsWithRecordProps,
  WatchOptions,
} from "./options";
import { VNode, VNodeData, VNodeChildren, ScopedSlot } from "./vnode";
import { PluginFunction, PluginObject } from "./plugin";

export interface CreateElement {
  // empty node
  (): VNode;

  // element or component name
  (tag: string, children: VNodeChildren): VNode;
  (tag: string, data?: VNodeData, children?: VNodeChildren): VNode;

  // component constructor or options
  (tag: Component<any, any, any, any>, children: VNodeChildren): VNode;
  (tag: Component<any, any, any, any>, data?: VNodeData, children?: VNodeChildren): VNode;

  // async component
  (tag: AsyncComponent<any, any, any, any>, children: VNodeChildren): VNode;
  (tag: AsyncComponent<any, any, any, any>, data?: VNodeData, children?: VNodeChildren): VNode;
}

export interface Vue {
  readonly $el: HTMLElement;
  readonly $options: ComponentOptions<this, any, any, any, any>;
  readonly $parent: Vue;
  readonly $root: Vue;
  readonly $children: Vue[];
  readonly $refs: { [key: string]: Vue | Element | Vue[] | Element[] };
  readonly $slots: { [key: string]: VNode[] };
  readonly $scopedSlots: { [key: string]: ScopedSlot };
  readonly $isServer: boolean;
  readonly $data: Record<string, any>;
  readonly $props: Record<string, any>;
  readonly $ssrContext: any;
  readonly $vnode: VNode;
  readonly $attrs: Record<string, string> | undefined;
  readonly $listeners: Record<string, Function | Function[]> | undefined;

  $mount(elementOrSelector?: Element | String, hydrating?: boolean): this;
  $forceUpdate(): void;
  $destroy(): void;
  $set: typeof Vue.set;
  $delete: typeof Vue.delete;
  $watch(
    expOrFn: string,
    callback: WatchHandler<any>,
    options?: WatchOptions
  ): (() => void);
  $watch<T>(
    expOrFn: (this: this) => T,
    callback: WatchHandler<T>,
    options?: WatchOptions
  ): (() => void);
  $on(event: string | string[], callback: Function): this;
  $once(event: string, callback: Function): this;
  $off(event?: string | string[], callback?: Function): this;
  $emit(event: string, ...args: any[]): this;
  $nextTick(callback: (this: this) => void): void;
  $nextTick(): Promise<void>;
  $createElement: CreateElement;
}

export type CombinedVueInstance<Instance extends Vue, Data, Methods, Computed, Props> = Instance & Data & Methods & Computed & Props;
export type ExtendedVue<Instance extends Vue, Data, Methods, Computed, Props> = VueConstructor<CombinedVueInstance<Instance, Data, Methods, Computed, Props> & Vue>;

export interface VueConstructor<V extends Vue = Vue> {
  new <Data = object, Methods = object, Computed = object, PropNames extends string = never>(options?: ThisTypedComponentOptionsWithArrayProps<V, Data, Methods, Computed, PropNames>): CombinedVueInstance<V, Data, Methods, Computed, Record<PropNames, any>>;
  new <Data = object, Methods = object, Computed = object, Props extends Record<string, PropValidator> = {}>(options?: ThisTypedComponentOptionsWithRecordProps<V, Data, Methods, Computed, Props>): CombinedVueInstance<V, Data, Methods, Computed, Record<keyof Props, any>>;

  extend<PropNames extends string = never>(definition: FunctionalComponentOptions<PropNames[], Record<PropNames, any>>): ExtendedVue<V, {}, {}, {}, Record<PropNames, any>>;
  extend<Props extends Record<string, PropValidator>>(definition: FunctionalComponentOptions<Props, Record<keyof Props, any>>): ExtendedVue<V, {}, {}, {}, Record<keyof Props, any>>;
  extend<Data, Methods, Computed, PropNames extends string = never>(options: ThisTypedComponentOptionsWithArrayProps<V, Data, Methods, Computed, PropNames>): ExtendedVue<V, Data, Methods, Computed, Record<PropNames, any>>;
  extend<Data, Methods, Computed, Props extends Record<string, PropValidator>>(options?: ThisTypedComponentOptionsWithRecordProps<V, Data, Methods, Computed, Props>): ExtendedVue<V, Data, Methods, Computed, Record<keyof Props, any>>;

  nextTick(callback: () => void, context?: any[]): void;
  nextTick(): Promise<void>
  set<T>(object: Object, key: string, value: T): T;
  set<T>(array: T[], key: number, value: T): T;
  delete(object: Object, key: string): void;
  delete<T>(array: T[], key: number): void;

  directive(
    id: string,
    definition?: DirectiveOptions | DirectiveFunction
  ): DirectiveOptions;
  filter(id: string, definition?: Function): Function;

  component(id: string): VueConstructor;
  component<VC extends VueConstructor>(id: string, constructor: VC): VC;
  component<Data, Methods, Computed, PropNames extends string = never>(id: string, definition: AsyncComponent<Data, Methods, Computed, PropNames>): ExtendedVue<V, Data, Methods, Computed, Record<PropNames, any>>;
  component<PropNames extends string = never>(id: string, definition: FunctionalComponentOptions<PropNames[], Record<PropNames, any>>): ExtendedVue<V, {}, {}, {}, Record<PropNames, any>>;
  component<Props extends Record<string, PropValidator>>(id: string, definition: FunctionalComponentOptions<Props, Record<keyof Props, any>>): ExtendedVue<V, {}, {}, {}, Record<keyof Props, any>>;
  component<Data, Methods, Computed, PropNames extends string = never>(id: string, definition: ThisTypedComponentOptionsWithArrayProps<V, Data, Methods, Computed, PropNames>): ExtendedVue<V, Data, Methods, Computed, Record<PropNames, any>>;
  component<Data, Methods, Computed, Props extends Record<string, PropValidator>>(id: string, definition?: ThisTypedComponentOptionsWithRecordProps<V, Data, Methods, Computed, Props>): ExtendedVue<V, Data, Methods, Computed, Record<keyof Props, any>>;

  use<T>(plugin: PluginObject<T> | PluginFunction<T>, options?: T): void;
  mixin(mixin: typeof Vue | ComponentOptions<any, any, any, any>): void;
  compile(template: string): {
    render(createElement: typeof Vue.prototype.$createElement): VNode;
    staticRenderFns: (() => VNode)[];
  };

  config: {
    silent: boolean;
    optionMergeStrategies: any;
    devtools: boolean;
    productionTip: boolean;
    performance: boolean;
    errorHandler(err: Error, vm: Vue, info: string): void;
    warnHandler(msg: string, vm: Vue, trace: string): void;
    ignoredElements: string[];
    keyCodes: { [key: string]: number };
  }
}

export const Vue: VueConstructor;
