// modules.d.ts
declare module "*.js" {
  const content: any;
  export default content;
}

declare module "*.less" {
  const content: { [className: string]: string };
  export default content;
}
