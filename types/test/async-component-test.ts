import Vue, { AsyncComponent, Component } from "../index";

const a: AsyncComponent = () => ({
  component: new Promise<Component>((res, rej) => {
    res({ template: "" });
  }),
});

const b: AsyncComponent = () => ({
  // @ts-expect-error component has to be a Promise that resolves to a component
  component: () =>
    new Promise<Component>((res, rej) => {
      res({ template: "" });
    }),
});

const c: AsyncComponent = () =>
  new Promise<Component>((res, rej) => {
    res({
      template: "",
    });
  });

const d: AsyncComponent = () =>
  new Promise<{ default: Component }>((res, rej) => {
    res({
      default: {
        template: "",
      },
    });
  });

const e: AsyncComponent = () => ({
  component: new Promise<{ default: Component }>((res, rej) => {
    res({
      default: {
        template: "",
      },
    });
  }),
});

Vue.component("async-compponent1", () => ({
  component: new Promise<Component>((res, rej) => {
    res({
      template: "",
    });
  }),
}));

Vue.component(
  "async-compponent2",
  () =>
    new Promise<{ default: Component }>((res, rej) => {
      res({
        default: {
          template: "",
        },
      });
    })
);
