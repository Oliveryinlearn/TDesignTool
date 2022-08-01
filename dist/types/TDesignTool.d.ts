export interface config {
    type: string;
}
declare class TDesignTool {
    private static _TDesignTool;
    private constructor();
    _start(config?: config): void;
    static init(config?: config): TDesignTool;
    private static _initEnv;
}
export default TDesignTool;
