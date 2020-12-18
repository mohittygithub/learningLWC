import { LightningElement, wire } from "lwc";
import { fireEvent } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";

export default class AssignmentSixFirst extends LightningElement {
  @wire(CurrentPageReference) pageRef;

  handleChange() {
    const cityName = this.template.querySelector("lightning-input").value;
    console.log("city = ", cityName);

    fireEvent(this.pageRef, "enteredCity", { cityName: cityName });
  }
}