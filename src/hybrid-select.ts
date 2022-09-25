import {LitElement, html} from 'lit';
import {customElement, property, query, queryAll} from 'lit/decorators.js';
import {styles} from './select-style';

@customElement('hybrid-select')
export class HybridSelect extends LitElement {
  static styles = styles;


  // @todo: werk deze js uit :)
  // https://codepen.io/sandrina-p/pen/YzyOYRr?editors=1010

  @query('.js-selectNative')
  elSelectNative!: HTMLSelectElement;

  @query('.js-selectCustom')
  private elSelectCustom!: HTMLSelectElement;

  @query('.selectCustom-trigger')
  elSelectCustomBox!: HTMLDivElement


  // @property() elSelectCustomOpts = this.elSelectCustom.children[1];

  @queryAll('.selectCustom-option')
  private elSelectCustomOpts!: Array<HTMLDivElement>;

  // @property() customOptsList = Array.from(this.elSelectCustomOpts.children);

  // @queryAll('.selectCustom-option')
  // private customOptsList!: Array<Element>;


  @property() optionChecked = "";
  @property() optionHoveredIndex = -1;

  options = [
    {value: "sel", label: "UI/UX Designer"},
    {value: "fe", label: "Frontend Engineerrrrr"},
    {value: "be", label: "Backend Engineer"},
    {value: "qa", label: "QA Engineer"},
    {value: "un", label: "Unicorn"},
  ]

  render() {
    
    return html`
     <div class="select js-hybridSelect"></div>
      <span class="selectLabel" id="jobLabel">Main job role</span>
      <div class="selectWrapper">
        <select class="selectNative js-selectNative" aria-labelledby="jobLabel" @change="${this._updateNativeSelect}">
          <option value="sel" disabled="" selected="">Select role...</option>
          ${this.options.map((option) =>
            html`<option value="${option.value}">${option.label}</option>`
          )}
        </select>

        <!-- Hide the custom select from AT (e.g. SR) using aria-hidden -->
        <div class="selectCustom js-selectCustom" aria-hidden="true" @click="${this._toggleCustomBox}">
          <div class="selectCustom-trigger">Select role...</div>
          <div class="selectCustom-options">
            ${this.options.map((option, index) =>
              html`
              <div class="selectCustom-option" data-value="${option.value}" data-idx="${index}"
                @click=${this._updateCustomSelectValue}
                @mouseenter=${this._mouseEnterHover}>
                ${option.label}
              </div>
              `
            )}
          </div>
        </div>
      </div>
            </div>
      <!-- <span>dsdf:    ${this.optionChecked}, ${this.optionHoveredIndex}</span> -->
    `;
  }

  // connectedCallback(){
  //   super.connectedCallback();
  //   console.log(this.elSelectCustom, this.shadowRoot?.querySelectorAll('#jobLabel'));
  // }


  // Toggle custom select visibility when clicking the box
 
  private _toggleCustomBox(){
    const isClosed = !this.elSelectCustom.classList.contains("isActive");

    if (isClosed) {
      this._openSelectCustom();
    } else {
      this._closeSelectCustom();
    }
  }

  private _openSelectCustom() {
    this.elSelectCustom.classList.add("isActive");
    // Remove aria-hidden in case this was opened by a user
    // who uses AT (e.g. Screen Reader) and a mouse at the same time.
    this.elSelectCustom.setAttribute("aria-hidden", "false");

    if (this.optionChecked) {
      const optionCheckedIndex = this._findOptionIndex(this.optionChecked, this.elSelectCustomOpts)
      this._updateCustomSelectHovered(optionCheckedIndex!);
    }

    // Add related event listeners
    document.addEventListener("click", this._watchClickOutside);
    document.addEventListener("keydown", this._supportKeyboardNavigation);
  }

  private _closeSelectCustom() {
    this.elSelectCustom.classList.remove("isActive");

    this.elSelectCustom.setAttribute("aria-hidden", "true");

    this._updateCustomSelectHovered(-1);

    // Remove related event listeners
    document.removeEventListener("click", this._watchClickOutside);
    document.removeEventListener("keydown", this._supportKeyboardNavigation);
  }

  private _updateCustomSelectHovered(newIndex: number) {
    const prevOption = this.elSelectCustomOpts[this.optionHoveredIndex];
    const option = this.elSelectCustomOpts[newIndex];

    if (prevOption) {
      prevOption.classList.remove("isHover");
    }
    if (option) {
      option.classList.add("isHover");
    }

    this.optionHoveredIndex = newIndex;
  }

  private _updateCustomSelectChecked(value:string, text: string) {
    const prevValue = this.optionChecked;

    const elPrevOption = this._findOptionInArray(prevValue, this.elSelectCustomOpts);
    console.log(elPrevOption);
    
    const elOption = this._findOptionInArray(value, this.elSelectCustomOpts);

    if (elPrevOption) {
      elPrevOption.classList.remove("isActive");
    }

    if (elOption) {
      elOption.classList.add("isActive");
    }

    this.elSelectCustomBox.textContent = text;
    this.optionChecked = value;
  }

  private _findOptionInArray(val:string, arr: Array<HTMLElement>){
    for (let i = 0; i < arr.length; i++) {
      if(val === arr[i].getAttribute("data-value")){
        return arr[i];
      }
    }
  }

  private _findOptionIndex(val:string, arr: Array<HTMLElement>){
    for (let i = 0; i < arr.length; i++) {
      if(val === arr[i].getAttribute("data-value")){
        return i;
      }
    }
  }

  // private _watchClickOutside(e: Event) {
  private _watchClickOutside() {
    // const didClickedOutside = !this.elSelectCustom.contains(e.target);
    // if (didClickedOutside) {
    //   this._closeSelectCustom();
    // }
  }

  private _supportKeyboardNavigation(e:KeyboardEvent) { 
    // press down -> go next
    if (e.code === "ArrowDown" && this.optionHoveredIndex < this.options.length - 1) {
      // let index = this.optionHoveredIndex;
      e.preventDefault(); // prevent page scrolling
      this._updateCustomSelectHovered(this.optionHoveredIndex + 1);
    }

    // press up -> go previous
    if (e.code === "ArrowUp" && this.optionHoveredIndex > 0) {
      e.preventDefault(); // prevent page scrolling
      this._updateCustomSelectHovered(this.optionHoveredIndex - 1);
    }

    // press Enter or space -> select the option
    if (e.code === "Enter" || e.code === "Space") {
      e.preventDefault();

      const option = this.elSelectCustomOpts[this.optionHoveredIndex];
      const value = option && option.getAttribute("data-value");

      if (value) {
        this.elSelectNative.value = value;
        this._updateCustomSelectChecked(value, option.textContent!);
      }
      this._closeSelectCustom();
    }

    // press ESC -> close selectCustom
    if (e.code === "Escape") {
      this._closeSelectCustom();
    }
  }

  // Update selectCustom value when selectNative is changed.
  private _updateNativeSelect(e: { target: HTMLSelectElement }){

    const value = e.target!.value;

    const elRespectiveCustomOption = this._findOptionInArray(value, this.elSelectCustomOpts);
  
    this._updateCustomSelectChecked(value, elRespectiveCustomOption?.textContent!);
  }

  private _updateCustomSelectValue(e:{ target: HTMLOptionElement }){
    const value = e.target.getAttribute("data-value") || "";

    // Sync native select to have the same value
    this.elSelectNative.value = value;
    this._updateCustomSelectChecked(value, e.target.textContent!);
    this._closeSelectCustom();  


    // TODO: Toggle these event listeners based on selectCustom visibility

  }

  private _mouseEnterHover(e: {target: HTMLOptionElement}){
    const index:number = parseInt(e.target.dataset.idx!);
    this._updateCustomSelectHovered(index);
  }



 
}
