import { LightningElement, track } from "lwc";
import IndianLogo from "@salesforce/resourceUrl/IndianLogo";
import saveAccount from "@salesforce/apex/AccountController.saveAccount";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class AssignmentSeven extends LightningElement {
  @track indianLogo;
  @track disabled;
  accountObj;

  constructor() {
    super();
    this.indianLogo = IndianLogo;
    this.disabled = true;
  }

  handleClick(e) {
    if (e.target.label === "Save") {
      let name = this.template.querySelector("[data-id=name]").value;
      let phone = this.template.querySelector("[data-id=phone]").value;
      let city = this.template.querySelector("[data-id=city]").value;
      if (name !== "" && phone !== "" && city !== "") {
        this.accountObj = { Name: name, Phone: phone, BillingCity: city };
        this.saveNewAccount();

        //console.log(this.accountObj);
      } else {
        this.showWarningToast();
      }
    }
  }
  saveNewAccount() {
    saveAccount({ acct: this.accountObj })
      .then((result) => {
        this.showSuccessToast();
        console.log("result", result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  showSuccessToast() {
    const event = new ShowToastEvent({
      title: "Account Saved",
      message: "New Account has been created",
      variant: "success",
      mode: "dismissable"
    });
    this.dispatchEvent(event);
  }
  showWarningToast() {
    const event = new ShowToastEvent({
      title: "Empty Fields",
      message:
        "All the fields must be filled in order to create a new Account.",
      variant: "warning",
      mode: "dismissable"
    });
    this.dispatchEvent(event);
  }
}