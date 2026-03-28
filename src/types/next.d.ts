// SCSS Modules type declarations
declare module '*.module.scss' {;
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.scss' {
  const content: string
  export default content
}

declare module '*.sass' {
  const content: string
  export default content
}

declare module '*.css' {
  const content: string
  export default content
}