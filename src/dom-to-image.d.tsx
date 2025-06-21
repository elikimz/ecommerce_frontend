declare module "dom-to-image" {
  interface Options {
    filter?: (node: HTMLElement) => boolean;
    bgcolor?: string;
    width?: number;
    height?: number;
    style?: object;
    quality?: number;
  }

  const domToImage: {
    toPng: (node: HTMLElement, options?: Options) => Promise<string>;
    toJpeg: (node: HTMLElement, options?: Options) => Promise<string>;
    toSvg: (node: HTMLElement, options?: Options) => Promise<string>;
    toBlob: (node: HTMLElement, options?: Options) => Promise<Blob>;
    toPixelData: (
      node: HTMLElement,
      options?: Options
    ) => Promise<Uint8ClampedArray>;
  };

  export = domToImage;
}
