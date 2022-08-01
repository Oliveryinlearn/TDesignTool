/**
 * 工具本体
 */
export interface config {
    type: string;
}

class TDesignTool {
    private static _TDesignTool: TDesignTool;
    private hoverEl: HTMLElement | null;
    // private targetEl: HTMLElement | null;
    private constructor(config?: config) {
        this.hoverEl = null;
        this._start(config);
    }
    /**
     * 初始化
     * @param config
     */
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
    _start(config?: config) {
        window.addEventListener("keydown", this._handleKeyDown.bind(this));
        window.addEventListener("keyup", this._handleKeyUp.bind(this));
        window.addEventListener("mousemove", this._handleMousemove.bind(this));
        window.onblur = this._handleKeyUp.bind(this);
    }
    private _handleKeyDown(event: KeyboardEvent) {
        if (event.key.toLocaleLowerCase() !== "`" || event.key.toLocaleLowerCase() !== "·") return;
        event.preventDefault();

        this._createHoverElement();
    }
    private _handleKeyUp() {}
    private _handleMousemove() {}
    private _createHoverElement() {
        // 当前的元素
        const curEl: HTMLElement = this._getCurEl();
        if (curEl === null || curEl === this.hoverEl || curEl === undefined) return;

        this.hoverEl = curEl;

        // 清除
        // this.clearSignElement(config.hover);
    }
    /**
     * 获得当前鼠标Hover的DOM
     * @returns {HTMLElement} hover元素
     */
    private _getCurEl(): HTMLElement {
        let elements: NodeListOf<HTMLElement> = document.querySelectorAll(":hover");
        let curEl: HTMLElement = elements[elements.length - 1];
        return curEl;
    }
}

export default TDesignTool;
