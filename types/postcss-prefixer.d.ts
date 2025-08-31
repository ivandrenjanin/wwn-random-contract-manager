declare module "postcss-prefixer" {
    interface Options {
        prefix: string;
        ignore?: (string | RegExp)[];
    }
    const plugin: (options: Options) => any;
    export default plugin;
}

