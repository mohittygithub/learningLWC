import { LightningElement, track } from "lwc";

export default class HelloWorld extends LightningElement {
  @track greeting;

  constructor() {
    super();
    this.greeting = "";
  }
  changeHandle(event) {
    this.greeting = event.target.value;
  }
}