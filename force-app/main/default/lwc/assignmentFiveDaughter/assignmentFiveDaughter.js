import { LightningElement, api, wire } from "lwc";
import { fireEvent } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";

export default class AssignmentFiveDaughter extends LightningElement {
  @api daughtertitle;

  @wire(CurrentPageReference) pageRef;

  handleClick() {
    const messageToBrother = this.template.querySelector("lightning-input")
      .value;
    console.log("sister input value = ", messageToBrother);

    fireEvent(this.pageRef, "buttonclicked", {
      sisterMessage: messageToBrother
    });
  }
}