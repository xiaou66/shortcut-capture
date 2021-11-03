// language=CSS
const CustomCss = `
  * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
  }
  a {
      text-decoration: none; 
      outline: none; 
      color: #000; 
  }
  body {
    /*padding: 20px;*/
    background: #ffffff !important;
    color: #000000 !important;
  }
  #setting {
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
  }
  #setting>div:first-child {
      width: 20%;
  }
  #setting>div:nth-child(2) {
      width: 80%;
  }
  .router {
      max-height: 100vh;
      overflow-y: auto;
      padding: 10px 0 10px;
  }
  .router::-webkit-scrollbar-track, .router::-webkit-scrollbar-track-piece {
      border-radius: 0;
      background: #ffffff;
  }
  .router::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background: #c3c3c3;
      border: none;
  }
  .router::-webkit-scrollbar {
      width: 8px;
      height: 8px;
  }
  #showTips {
      padding: 6px;
      position: fixed;
      width: auto;
      transform: translateX(-50%);
      top: 0;
      left: 50%;
      background: rgb(0, 0, 0);
      line-height: 24px;
      text-align: center;
      color: #fff;
      border-radius: 10px;
      display: none;
      transition: all 200ms linear;
      z-index: 100;
  }
  
  .form-button-group {
    text-align: center;
  }

  .form-button-group button + button {
    margin-left: 5px;
  }
  #setting {
      width: 100%;
  }
  .menu {
      font-weight: 700;
      font-size: 16px;
      line-height: 30px;
      cursor: pointer;
      border: 1px dashed rgba(0,0,0,0);
      text-align: center;
      margin: 10px;
      border-radius: 10px;
      transition: all 200ms linear;
      display: block;
  }
  .menu:hover {
      border: 1px dashed rgba(0,0,0,0.9);
  }
  .active {
      border: 1px dashed rgba(0,0,0,0.9);
  }
  .content {
      display: flex;
      align-items: center;
      flex-direction: column;
  }
  .modal {
      padding: 10px;
      width: 80%;
      box-shadow: 1px 1px 1px #c3c3c3;
      border-radius: 10px;
      margin-bottom: 6px;
      display: flex;
      flex-direction: column;
  }
  .tips {
      width: 120px;
  }
  .title {
      font-size: 16px;
      font-weight: 700;
      padding-bottom: 10px;
      border-bottom: 1px dashed #c3c3c3;
  }
  .form-item {
      display: flex;
      align-items: center;
  }
  .form-item>div {
      padding: 5px;
  }
  /* input */
  .inputBox {
      margin-top: 20px;
  }
  .input {
      position: relative;
  }
  .inputBox input {
      font-size: 16px;
      padding: 5px;
      display: block;
      width: 350px;
      border: none;
      border-bottom: 1px dashed rgba(82,100,174, 0.6);
      background: #ffffff !important;
      color: #000000 !important;
  }

  .inputBox input:focus {
      outline: none;
  }

  /* LABEL ======================================= */
  .inputBox label {
      color: #999;
      font-size: 16px;
      font-weight: normal;
      position: absolute;
      pointer-events: none;
      left: 5px;
      top: 10px;
      transition: 0.2s ease all;
      -moz-transition: 0.2s ease all;
      -webkit-transition: 0.2s ease all;
  }

  /* active state */
  .inputBox input:focus ~ label, .inputBox input:valid ~ label {
      top: -14px;
      font-size: 14px;
      color: #5264AE;
  }

  /* BOTTOM BARS ================================= */
  .bar {
      position: relative;
      display: block;
      width: 350px;
  }

  .bar:before, .bar:after {
      content: '';
      height: 2px;
      width: 0;
      bottom: 1px;
      position: absolute;
      background: #5264AE;
      transition: 0.2s ease all;
      -moz-transition: 0.2s ease all;
      -webkit-transition: 0.2s ease all;
  }

  .bar:before {
      left: 50%;
  }

  .bar:after {
      right: 50%;
  }

  /* active state */
  input:focus ~ .bar:before, input:focus ~ .bar:after {
      width: 50%;
  }

  /* HIGHLIGHTER ================================== */
  .highlight {
      position: absolute;
      height: 60%;
      width: 100px;
      top: 25%;
      left: 0;
      pointer-events: none;
      opacity: 0.5;
  }

  /* active state */
  input:focus ~ .highlight {
      -webkit-animation: inputHighlighter 0.3s ease;
      -moz-animation: inputHighlighter 0.3s ease;
      animation: inputHighlighter 0.3s ease;
  }

  /* ANIMATIONS ================ */
  @-webkit-keyframes inputHighlighter {
      from {
          background: #5264AE;
      }
      to {
          width: 0;
          background: transparent;
      }
  }

  @-moz-keyframes inputHighlighter {
      from {
          background: #5264AE;
      }
      to {
          width: 0;
          background: transparent;
      }
  }

  @keyframes inputHighlighter {
      from {
          background: #5264AE;
      }
      to {
          width: 0;
          background: transparent;
      }
  }
  /* switch start */
  .switchBox {
      transform: translateY(-6px);
  }
  input[type=checkbox] {
      height: 0;
      width: 0;
      visibility: hidden;
  }

  .switchBox label {
      cursor: pointer;
      text-indent: -9999px;
      width: 50px;
      height: 25px;
      background: grey;
      display: block;
      border-radius: 100px;
      position: relative;
  }
  .switchBox label:after {
      content: '';
      position: absolute;
      top: 5px;
      left: 5px;
      width: 15px;
      height: 15px;
      background: #fff;
      border-radius: 90px;
      transition: 0.3s;
  }
  
  .switchBox input:checked + label {
      background: #02b340;
  }

  .switchBox input:checked + label:after {
      left: calc(100% - 5px);
      transform: translateX(-100%);
  }

  .switchBox label:active:after {
      width: 30px;
  }
  /* switch end */
`

module.exports = {
    CustomCss,
}
