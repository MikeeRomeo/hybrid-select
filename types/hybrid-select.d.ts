import { LitElement } from 'lit';
export declare class HybridSelect extends LitElement {
    static styles: import("lit").CSSResult[];
    elSelectNative: HTMLSelectElement;
    private elSelectCustom;
    elSelectCustomBox: HTMLDivElement;
    private elSelectCustomOpts;
    optionChecked: string;
    optionHoveredIndex: number;
    options: {
        value: string;
        label: string;
    }[];
    render(): import("lit-html").TemplateResult<1>;
    private _toggleCustomBox;
    private _openSelectCustom;
    private _closeSelectCustom;
    private _updateCustomSelectHovered;
    private _updateCustomSelectChecked;
    private _findOptionInArray;
    private _findOptionIndex;
    private _watchClickOutside;
    private _supportKeyboardNavigation;
    private _updateNativeSelect;
    private _updateCustomSelectValue;
    private _mouseEnterHover;
}
