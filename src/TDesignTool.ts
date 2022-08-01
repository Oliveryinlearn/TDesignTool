/**
 * 工具本体
 */
export interface config {
    type: string;
}

class TDesignTool {
    private static _TDesignTool: TDesignTool;
    // private hoverEl: HTMLElement | null;
    // private targetEl: HTMLElement | null;
    private constructor(config?: config) {
        // this.hoverEl = this.targetEl = null;

        this._start(config);
    }
    _start(config?: config) {
        console.log("--- 启动 ---");
    }
    static init(config?: config) {
        // 环境监测
        if (!TDesignTool._initEnv()) throw new Error("环境异常");

        if (!TDesignTool._TDesignTool) TDesignTool._TDesignTool = new TDesignTool(config);

        return TDesignTool._TDesignTool;
    }
    /**
     * 环境检测
     */
    private static _initEnv() {
        if (typeof window === "undefined" || typeof document.body === "undefined") return false;
        return true;
    }
}

export default TDesignTool;
