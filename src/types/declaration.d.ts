declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.styl' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg';

declare module '*.jpg' {
  const image: string;
  export default image;
}

declare module '*.png' {
  const image: string;
  export default image;
}

declare module '*.json' {
  const result: ReturnType<typeof JSON.parse>;
  export default result;
}
