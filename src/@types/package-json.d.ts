declare module "package-json" {
  export interface IPackageJSON extends Object {
    author?: string | IAuthor;
    bin?: string | IBinMap;
    bugs?: string | IBugs;
    bundledDependencies?: string[];
    config?: IConfig;
    contributors?: string[] | IAuthor[];
    cpu?: string[];
    dependencies?: IDependencyMap;
    description?: string;
    devDependencies?: IDependencyMap;
    directories?: IDirectories;
    engines?: IEngines;
    files?: string[];
    homepage?: string;
    keywords?: string[];
    license?: string;
    main?: string;
    man?: string | string[];
    name: string;
    optionalDependencies?: IDependencyMap;
    os?: string[];
    peerDependencies?: IDependencyMap;
    preferGlobal?: boolean;
    private?: boolean;
    publishConfig?: IPublishConfig;
    repository?: string | IRepository;
    scripts?: IScriptsMap;
    version?: string;
    workspaces?: string[] | { [key:string]: string[] };
  }

  /**
   * An author or contributor
   */
  export interface IAuthor {
    name: string;
    email?: string;
    homepage?: string;
  }

  /**
   * A map of exposed bin commands
   */
  export interface IBinMap {
    [commandName: string]: string;
  }

  /**
   * A bugs link
   */
  export interface IBugs {
    email: string;
    url: string;
  }

  export interface IConfig {
    name?: string;
    config?: Object;
  }

  /**
   * A map of dependencies
   */
  export interface IDependencyMap {
    [dependencyName: string]: string;
  }

  /**
   * CommonJS package structure
   */
  export interface IDirectories {
    lib?: string;
    bin?: string;
    man?: string;
    doc?: string;
    example?: string;
  }

  export interface IEngines {
    node?: string;
    npm?: string;
  }

  export interface IPublishConfig {
    registry?: string;
  }

  /**
   * A project repository
   */
  export interface IRepository {
    type: string;
    url: string;
  }

  export interface IScriptsMap {
    [scriptName: string]: string;
  }
}
