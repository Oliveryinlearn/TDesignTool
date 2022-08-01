export interface config {
    type: string;
}
declare class TDesignTool {
    private static _TDesignTool;
    private constructor();
    static init(config?: config): TDesignTool;
    private static _initEnv;
    _start(config?: config): void;
    private _handleKeyDown;
    private _handleKeyUp;
    private _handleMousemove;
}
export default TDesignTool;
