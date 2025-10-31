(() => {
  class BlockChainDialog {
    constructor(option) {
      this.locale = option.locale || {};
      this.content = option.content || "";
      this.confirm = option.confirm || function s() {};
      this.createDialog();
      this.bindEvent();
    }

    bindEvent() {
      const $confirm = this.dialog.querySelector(".confirm");
      const $closeBtn = this.dialog.querySelector(".closeBtnClass");
      const $headerClose = this.dialog.querySelector(".dialog-frame-head-close");
      const $dialogFrame = this.dialog.querySelector(".dialog-frame");
      $confirm.addEventListener("click", () => {
        this.confirm();
      });
      $closeBtn.addEventListener("mouseover", () => {
        $closeBtn.className = "common-button common-button-text u-8-cl b-10-bg closeBtnClass";
      });
      $closeBtn.addEventListener("mouseout", () => {
        $closeBtn.className = "common-button common-button-text u-8-cl closeBtnClass";
      });
      $closeBtn.addEventListener("mousedown", () => {
        $closeBtn.className = "common-button common-button-text u-8-cl u-10-bg closeBtnClass";
      });
      $closeBtn.addEventListener("mouseup", () => {
        $closeBtn.className = "common-button common-button-text u-8-cl closeBtnClass";
      });
      $closeBtn.addEventListener("click", () => {
        this.hide();
      });

      $headerClose.addEventListener(
        "click",
        () => {
          this.hide();
        },
        false
      );

      $dialogFrame.addEventListener(
        "webkitAnimationEnd",
        (e) => {
          const { target } = e;
          if (target.classList.contains("drop-leave-active")) {
            $dialogFrame.classList.remove("drop-leave-active");
            this.dialog.style.display = "none";
          } else {
            $dialogFrame.classList.remove("drop-enter-active");
          }
        },
        false
      );
    }

    show() {
      this.dialog.style.display = "block";
      this.dialog.querySelector(".dialog-frame").classList.add("drop-enter-active");
    }

    hide() {
      this.dialog.querySelector(".dialog-frame").classList.add("drop-leave-active");
    }

    createDialog() {
      const dialog = document.createElement("section");
      const { locale } = this;
      dialog.className = "common-dialog";
      dialog.style.display = "none";
      dialog.innerHTML = `<div class="dialog-markAll u-7-bg"></div>
                    <div class="dialog-frame a-5-bg">
                        <div class="dialog-frame-head a-4-bg">
                            <span class="dialog-frame-head-text b-1-cl">${locale.titleText}</span>
                            <span class="dialog-frame-head-close">
                                <section class="common-iconButton">
                                    <div class="iconButton-icon">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M6.4 15L10 11.4L13.6 15L15 13.6L11.4 10L15 6.4L13.6 5L10 8.6L6.4 5L5 6.4L8.6 10L5 13.6L6.4 15ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="#999999"/>
                                        </svg>
                                    </div>
                                    <div class="iconButton-bg"></div>
                                </section>
                            </span>
                        </div>
                        <div class="dialog-frame-body" style="padding-top: 30px; padding-bottom: 30px;">
                            <div class="setBox">
                                ${this.content}
                            </div>
                        </div>
                        <div class="dialog-frame-bottom">
                            <div class="dialog-frame-options">
                                <button class="common-button common-button-text u-8-cl closeBtnClass" style="height: 40px; padding-left: 31px; padding-right: 31px; margin-top: 0;">
                                    <div class="common-button-slot">${locale.closeTextProps}</div>
                                </button>
                                <button class="common-button common-button-solid u-8-bg u-16-cl confirm" style="height: 40px; padding-left: 31px; padding-right: 31px; margin-top: 0;">
                                    <div class="common-button-slot">${locale.confirmTextProps}</div>
                                    <div class='solidBc bghover u-14-bg'></div>
                                    <div class='solidBc bgactive u-15-bg'></div>
                                </button>
                            </div>
                        </div>
                    </div>`;
      const body = document.querySelector("body");
      this.dialog = body.appendChild(dialog);
    }
  }

  window.BlockChainDialog = BlockChainDialog;
})();
