import { LightningElement, track, wire } from "lwc";
import { columns } from "./utils/utils";
import getContacts from "@salesforce/apex/ContactController.getContacts";

export default class AssignmentFour extends LightningElement {
  @track columns;
  @track allContacts;
  @track error;
  @track cities;
  @track cityName;
  initialRecords;

  constructor() {
    super();
    this.columns = columns;
    this.cityName = "All";
  }

  @wire(getContacts) contactRecords({ error, data }) {
    if (data) {
      this.allContacts = data;
      this.initialRecords = data;
      this.getCities();
    } else if (error) {
      this.data = undefined;
      console.log("error : ", error);
    }
  }

  getCities() {
    let cities = [];
    for (let i = 0; i < this.allContacts.length; i++) {
      cities.push(this.allContacts[i].MailingCity);
    }
    cities = cities.filter((e) => e !== undefined);
    cities = cities.filter(function (item, pos) {
      return cities.indexOf(item) === pos;
    });

    for (let i = 0; i < cities.length; i++) {
      if (i === 0) {
        cities[i] = { label: "All", value: "All" };
      } else {
        cities[i] = { label: cities[i], value: cities[i] };
      }
    }
    this.cities = cities;
    console.log(cities);
  }

  handleChange() {
    let value = this.template.querySelector("lightning-combobox").value;
    this.cityName = value;
    this.allContacts = this.initialRecords;
    if (value !== "All") {
      if (this.allContacts) {
        let recs = [];
        for (let rec of this.allContacts) {
          if (rec.MailingCity === value) {
            recs.push(rec);
          }
        }

        this.allContacts = recs;
      } else {
        this.allContacts = this.initialRecords;
      }
    }
  }
}
