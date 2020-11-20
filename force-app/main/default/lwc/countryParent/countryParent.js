import { LightningElement, track, api } from "lwc";

export default class CountryParent extends LightningElement {
  @track value;
  @track country;
  constructor() {
    super();
    this.country = "";
    this.countries = [
      {
        name: "India",
        value: "india",
        capital: "New Delhi",
        population: "1.3B",
        president: "Ramnath Kovind",
        image:
          "https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
      },
      {
        name: "Australia",
        value: "australia",
        capital: "Canberra",
        population: "50M",
        president: "Scott Morrison",
        image:
          "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
      }
    ];
  }
  get options() {
    return [
      { label: "India", value: "india" },
      { label: "Australia", value: "australia" }
    ];
  }
  handleChange(e) {
    this.value = e.target.value;
  }
  handleClick(e) {
    for (i = 0; i < this.countries.length; i++) {
      if (this.value === this.countries[i].value) {
        this.country = this.countries[i];
      }
      console.log(this.country);
    }
  }
}

let i = 0;
