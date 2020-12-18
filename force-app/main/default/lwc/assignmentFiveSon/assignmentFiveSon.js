import { LightningElement, api, track, wire } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
import { registerListener, unregisterAllListeners } from "c/pubsub";

export default class AssignmentFiveSon extends LightningElement {
  @api sontitle;
  @track messageFromSister;

  constructor() {
    super();
    this.messageFromSister = null;
  }
  @wire(CurrentPageReference) pageRef;

  connectedCallback() {
    registerListener("buttonclicked", this.handleDaugtherButtonClicked, this);
    console.log("connected");
  }

  handleDaugtherButtonClicked(parcel) {
    console.log("parcel = ", parcel.sisterMessage);
    this.messageFromSister = parcel.sisterMessage;
    console.log(this.messageFromSister);
  }

  disconnectedCallback() {
    unregisterAllListeners(this);
    console.log("disconnected");
  }
}