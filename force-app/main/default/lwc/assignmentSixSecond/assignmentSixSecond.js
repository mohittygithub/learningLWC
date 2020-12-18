import { LightningElement, track, wire } from "lwc";
import getStudentsByCity from "@salesforce/apex/StudentController.getStudentsByCity";
import { registerListener, unregisterAllListeners } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";

export default class AssignmentSixSecond extends LightningElement {
  @track studentsArray;
  @track error;
  @track cityName;
  askedCity;

  constructor() {
    super();
    this.cityName = "All";
  }

  @wire(CurrentPageReference) pageRef;

  connectedCallback() {
    registerListener("enteredCity", this.handleEnteredCity, this);
  }
  handleEnteredCity(parcel) {
    this.cityName = parcel.cityName;
  }

  disconnectedCallback() {
    unregisterAllListeners(this);
  }

  @wire(getStudentsByCity, { city: "$cityName" })
  getStudents({ error, data }) {
    if (data) {
      console.log(data);
      this.studentsArray = data;
      this.studentsArray = this.studentsArray.map((arr) =>
        Object.assign(
          {
            FullName: ""
          },
          arr
        )
      );
      let fullName = "";
      for (let i = 0; i < this.studentsArray.length; i++) {
        fullName =
          this.studentsArray[i].First_Name__c +
          " " +
          this.studentsArray[i].Last_Name__c;
        this.studentsArray[i].FullName = fullName;
      }

      this.error = undefined;
    } else if (error) {
      this.error = error;
      console.log("Error ", this.error);
      this.studentsArray = undefined;
    }
  }
}