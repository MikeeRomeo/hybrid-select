import { css } from 'lit';

export const styles = [
  css`
    /* 
      Default icon source in css variable:
      <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> 
    */
    :host{
      --icon: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z'/></svg>");

      --icon-size: 14px;
    }

    :host *{
      box-sizing: border-box;
    }

    .selectNative,
    .selectCustom {
      position: relative;
      width: 100%;
      font-size: 1rem;
      height: 3rem;
    }

    .selectCustom {
      position: absolute;
      top: 0;
      left: 0;
      display: none;
    }

    @media(hover: hover){
 
      .selectCustom {
        display: block;
      }
      
      .selectNative:focus + .selectCustom {
        display: none;
      }
    }

    .selectNative:focus,
    .selectCustom.isActive .selectCustom-trigger {
      outline: none;
      box-shadow: white 0 0 0 0.2rem, #ff821f 0 0 0 0.4rem;
    }

    .select {
      position: relative;
    }

    .selectLabel {
      display: block;
      font-weight: bold;
      margin-bottom: 0.4rem;
    }

    .selectWrapper {
      position: relative;
    }

    .selectNative,
    .selectCustom-trigger {
      background-color: #fff;
      border: 1px solid #6f6f6f;
      border-radius: 6px;
      /* line-height: 1.6em; */
      padding: 0rem calc(var(--icon-size) + 0.8em) 0 0.4em;
    }

    .selectNative {
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: var(--icon);
      background-repeat: no-repeat;
      background-position-x: 96%;
      background-position-y: 55%;
      background-size: var(--icon-size);
    }

    .selectCustom-trigger {
      font-size: 1em;
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #fff;
      cursor: pointer;
      align-items: center;
      display: inline-flex;
      white-space: nowrap;
      overflow: hidden;
      /* text-overflow: ellipsis */
    }

    .selectCustom-trigger::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      /* transform: translate(-10px, -50%); */
      width: calc(var(--icon-size) + 0.8em);
      height: 100%;
      background-image: var(--icon);
      background-repeat: no-repeat;
      background-position: center;
      background-size: var(--icon-size);
      background-color: #fff;
    }

    .selectCustom-trigger:hover {
      border-color: #8c00ff;
    }

    .selectCustom-options {
      position: absolute;
      top: calc(3.8rem + 0.8rem);
      left: 0;
      width: 100%;
      border: 1px solid #6f6f6f;
      border-radius: 0.4rem;
      background-color: #fff;
      box-shadow: 0 0 4px #e9e1f8;
      z-index: 1;
      padding: 0.8rem 0;
      display: none;
    }

    .selectCustom.isActive .selectCustom-options {
      display: block;
    }

    .selectCustom-option {
      position: relative;
      padding: 0.8rem;
      padding-left: 2.5rem;
    }

    .selectCustom-option.isHover,
    .selectCustom-option:hover {
      background-color: #865bd7;
      color: white;
      cursor: pointer;
    }

    .selectCustom-option:not(:last-of-type)::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border-bottom: 1px solid #d3d3d3;
    }

    .selectCustom-option.isActive::before {
      content: '✓';
      position: absolute;
      left: 0.8rem;
    }
  `,
];
