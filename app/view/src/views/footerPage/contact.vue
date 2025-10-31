<template>
  <div class="m-page u-body u-xl-mode">
    <section class="u-black u-clearfix u-section-1" id="sec-75cc">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h2 class="u-align-center u-text u-text-default u-text-1">Contact us</h2>
      </div>
    </section>
    <section class="u-black u-clearfix u-section-2" id="sec-d490">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <div class="u-clearfix u-expanded-width u-gutter-10 u-layout-wrap u-layout-wrap-1">
          <div class="u-layout" style="">
            <div class="u-layout-row" style="">
              <div class="u-align-left u-container-style u-layout-cell u-left-cell u-size-60 u-size-xs-60 u-layout-cell-1" src="">
                <div class="u-container-layout u-valign-middle u-container-layout-1">
                  <p class="u-text u-text-1"> We value your feedback and inquiries. If you have any questions,
                    comments, or concerns, please reach out to us using the appropriate contact
                    information below.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="u-black u-clearfix u-section-3" id="sec-6f45">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
          <div class="u-gutter-0 u-layout">
            <div class="u-layout-row">
              <div class="u-size-30">
                <div class="u-layout-col">
                  <div class="u-container-style u-layout-cell u-size-30 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1">
                      <p class="u-text u-text-1"><b>Business Inquiries:</b> For business-related inquiries, partnerships, or collaboration
                        opportunities, please contact our business team at <a :href="`mailto:${contactEmail}`" class="u-active-none u-border-none u-btn u-button-style u-hover-none u-none u-text-palette-1-base u-btn-1">{{ contactEmail }}</a>&nbsp;<br>
                        <br><b>Marketing Inquiries:</b> If you have marketing-related inquiries, advertising
                        opportunities, or media requests, please contact our marketing team at <a :href="`mailto:${contactEmail}`" class="u-active-none u-border-none u-btn u-button-style u-hover-none u-none u-text-palette-1-base u-btn-2">{{ contactEmail }}</a>&nbsp; <br>
                        <br><b>Customer Service:</b> For customer support, account-related inquiries, or assistance
                        with our platform, please reach out to our customer service team at <a :href="`mailto:${contactEmail}`" class="u-active-none u-border-none u-btn u-button-style u-hover-none u-none u-text-palette-1-base u-btn-3">{{ contactEmail }}</a>&nbsp;Our dedicated support staff is
                        available to help you with any issues or questions you may have.&nbsp;<br>
                        <br>Please provide detailed information in your message, including
                        your name, contact information, and a clear description of your inquiry or
                        request. Our team will make every effort to respond to your message in a timely
                        manner.&nbsp;<br>
                        <br>Please note that response times may vary depending on the volume
                        of inquiries we receive. We appreciate your patience and assure you that we
                        will address your inquiry as soon as possible.
                        Thank you for choosing our platform. We look forward to
                        assisting you!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "contact",
  computed: {
    contactEmail() {
      return this.$store.state.systemConfig.contactEmail;
    },
  },
};
</script>

<style scoped>
.u-section-1 {
  background-image: none;
}

.u-section-1 .u-sheet-1 {
  min-height: 177px;
}

.u-section-1 .u-text-1 {
  font-weight: 700;
  margin: 101px auto 37px;
} .u-section-2 {
    background-image: none;
  }

.u-section-2 .u-sheet-1 {
  min-height: 105px;
}

.u-section-2 .u-layout-wrap-1 {
  margin-top: 0;
  margin-bottom: 0;
}

.u-section-2 .u-layout-cell-1 {
  min-height: 115px;
}

.u-section-2 .u-container-layout-1 {
  padding: 15px 0;
}

.u-section-2 .u-text-1 {
  margin: 0;
}

@media (max-width: 1199px) {
  .u-section-2 .u-text-1 {
    margin-right: 625px;
  }
}

@media (max-width: 991px) {
  .u-section-2 .u-sheet-1 {
    min-height: 110px;
  }

  .u-section-2 .u-layout-cell-1 {
    min-height: 100px;
  }

  .u-section-2 .u-text-1 {
    margin-right: 386px;
  }
}

@media (max-width: 575px) {
  .u-section-2 .u-text-1 {
    margin-right: 186px;
  }
} .u-section-3 {
    background-image: none;
  }


.u-section-3 .u-layout-wrap-1 {
  margin-top: 35px;
  margin-bottom: 35px;
}

.u-section-3 .u-container-layout-1 {
  padding: 0;
}

.u-section-3 .u-text-1 {
  font-size: 1rem;
  margin: 0;
  padding-bottom: 50px;
}

.u-section-3 .u-btn-1 {
  background-image: none;
  padding: 0;
}

.u-section-3 .u-btn-2 {
  background-image: none;
  padding: 0;
}

.u-section-3 .u-btn-3 {
  background-image: none;
  padding: 0;
}

.u-section-3 .u-social-icons-1 {
  white-space: nowrap;
  height: 32px;
  min-height: 16px;
  width: 188px;
  min-width: 124px;
  margin: 34px auto 0 0;
}

.u-section-3 .u-icon-1 {
  height: 100%;
}

.u-section-3 .u-icon-2 {
  height: 100%;
}

.u-section-3 .u-icon-3 {
  height: 100%;
}

.u-section-3 .u-icon-4 {
  height: 100%;
}

.u-section-3 .u-layout-cell-2 {
  min-height: 273px;
}

.u-section-3 .u-container-layout-2 {
  padding: 18px 21px;
}

.u-section-3 .u-layout-cell-3 {
  min-height: 896px;
}

.u-section-3 .u-container-layout-3 {
  padding: 0 30px;
}

.u-section-3 .u-text-2 {
  margin: 0 10px;
}

.u-section-3 .u-form-1 {
  height: 307px;
  width: 510px;
  margin: 41px 0 0;
}

.u-section-3 .u-btn-4 {
  border-style: none;
  background-image: none;
}

@media (max-width: 1199px) {
  .u-section-3 .u-sheet-1 {
    min-height: 509px;
  }

  .u-section-3 .u-layout-cell-1 {
    padding-bottom: 50px;
  }

  .u-section-3 .u-layout-cell-2 {
    min-height: 222px;
  }

  .u-section-3 .u-layout-cell-3 {
    min-height: 388px;
  }
}

@media (max-width: 991px) {
  .u-section-3 .u-sheet-1 {
    min-height: 320px;
  }

  .u-section-3 .u-layout-cell-1 {
    min-height: 100px;
  }

  .u-section-3 .u-layout-cell-2 {
    min-height: 164px;
  }

  .u-section-3 .u-layout-cell-3 {
    min-height: 100px;
  }

  .u-section-3 .u-text-2 {
    margin-right: 0;
    margin-left: 0;
  }

  .u-section-3 .u-form-1 {
    width: 300px;
  }
}

@media (max-width: 767px) {
  .u-section-3 .u-sheet-1 {
    min-height: 420px;
  }

  .u-section-3 .u-layout-cell-2 {
    min-height: 246px;
  }

  .u-section-3 .u-container-layout-2 {
    padding-left: 10px;
    padding-right: 10px;
  }

  .u-section-3 .u-layout-cell-3 {
    min-height: 417px;
  }

  .u-section-3 .u-container-layout-3 {
    padding-left: 10px;
    padding-right: 10px;
  }
}

@media (max-width: 575px) {
  .u-section-3 .u-layout-cell-2 {
    min-height: 155px;
  }

  .u-section-3 .u-layout-cell-3 {
    min-height: 100px;
  }
}
.u-layout-row > .u-size-30 {
  flex: unset;
  max-width: 100%;
  min-width: 100%;
}
</style>
