import { LightningElement, wire, track } from "lwc";
import getContacts from "@salesforce/apex/ContactController.getContacts";
//import getCities from "@salesforce/apex/ContactController.getCities";
import getContactsByCity from "@salesforce/apex/ContactController.getContactsByCity";
import sortedContacts from "@salesforce/apex/ContactController.sortedContacts";
import saveContact from "@salesforce/apex/ContactController.saveContact";
import getAccountId from "@salesforce/apex/ContactController.getAccountId";

export default class CrudOnContacts extends LightningElement {
  @track contacts;
  @track inputValue = [];
  @track sortName;
  @track filteredData;
  @track error;
  @track options;
  @track sortValue;
  @track accountSelectedOptions = [];
  @track accountSelectedValue;
  @track Id = "";
  @track firstname;
  @track lastname;
  @track email;
  @track phone;
  @track isSaveButtonActive = true;
  @track accountId;
  @track newContactBody;
  @track filteredCities = [];
  @track cityValue = "";
  @track uniqueCities = [];
  @track cityObject = [];
  @track isModalOpened = false;
  // @track columns = [
  //   { label: "Name", type: "text", fieldName: "Name" },
  //   { label: "Phone", type: "phone", fieldName: "Phone" },
  //   { label: "Email", type: "email", fieldName: "Email" },
  //   { label: "Account Name", type: "text", fieldName: "Account.Name" },
  //   { label: "City", type: "text", fieldName: "Account.BillingCity" },
  //   { label: "Account Type", type: "text", fieldName: "Account.Type" },
  //   { label: "Department", type: "text", fieldName: "Department" }
  // ];

  // main method to get contact details
  @wire(getContacts)
  contactRecords({ error, data }) {
    if (data) {
      // filling contacts variable with data recieved from salesforce
      this.contacts = data;
      this.filteredData = data;

      // creating cities variable with unique city values to show in filter combobox
      let cities = [];
      for (let i = 0; i < this.contacts.length; i++) {
        cities.push(this.contacts[i].Account.BillingCity);
      }

      this.filteredCities = cities.filter(function (item, pos) {
        return cities.indexOf(item) === pos;
      });

      // filling accountSelectOptions variable with unique Account.Name data
      let accounts = [];
      for (let i = 0; i < this.contacts.length; i++) {
        accounts.push(this.contacts[i].Account.Name);
      }
      accounts = accounts.filter(function (item, pos) {
        return accounts.indexOf(item) === pos;
      });
      for (let i = 0; i < accounts.length; i++) {
        this.accountSelectedOptions.push({
          label: accounts[i],
          value: accounts[i]
        });
      }
    } else {
      this.error = error;
      this.contacts = undefined;
    }

    this.billingCities();
  }

  constructor() {
    super();
    console.log("constructor called");
  }

  // method to handle new button click
  handleClick(e) {
    if (e.target.label === "New") {
      this.isModalOpened = true;
    } else if (e.target.label === "Save") {
      if (
        this.lastname !== undefined &&
        this.accountSelectedValue !== undefined &&
        this.email !== undefined
      ) {
        this.newContactBody = [
          {
            Id: this.Id,
            FirstName: this.firstname,
            LastName: this.lastname,
            AccountId: this.accountId,
            Phone: this.phone,
            Email: this.email
          }
        ];
        console.log("body = ", this.newContactBody);
        this.saveNewContact();
        this.isModalOpened = false;
      } else {
        if (this.lastname === undefined) {
          alert("Last Name can't be left blank");
        } else if (this.accountSelectedValue === undefined) {
          alert("Select an Account from list");
        } else if (this.email === undefined) {
          alert("Email can't be left blank");
        }
      }
    } else if (e.target.label === "Close") {
      this.isModalOpened = false;
    }

    // id checkbox
    if (e.target.name === "id" && e.target.checked) {
      this.isSaveButtonActive = false;
      console.log(e.target.value);
    } else {
      this.isSaveButtonActive = true;
    }
  }

  // saving new contact to saleforce using upsertContact method of apex controller
  saveNewContact() {
    saveContact({ contact: JSON.stringify(this.newContactBody) })
      .then((result) => {
        console.log("saved contact = ", result);
      })
      .catch((err) => {
        console.log("error = ", err);
      });
  }
  // method to handle search input box
  changeHandle(e) {
    // setting value of city
    if (e.target.label === "Cities") {
      this.cityValue = e.target.value;
      // setting values from modal inputs
    } else if (e.target.label === "First Name") {
      this.firstname = e.target.value;
    } else if (e.target.label === "Last Name") {
      this.lastname = e.target.value;
    } else if (e.target.label === "Account") {
      this.accountSelectedValue = e.target.value;
      this.getAccId();
    } else if (e.target.label === "Phone") {
      this.phone = e.target.value;
    } else if (e.target.label === "Email") {
      this.email = e.target.value;
    }

    // setting the value of search input
    if (e.target.label === "search") {
      this.inputValue = e.target.value;
    }

    // filtering the view of records on the table according to the search box input
    this.contacts = this.contacts.filter((contact) =>
      contact.Name.includes(this.inputValue)
    );
  }

  // filling the value in accountId according to account name provided in modal form
  getAccId() {
    getAccountId({ accountName: this.accountSelectedValue })
      .then((res) => {
        this.accountId = res;
        console.log(this.accountId);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // method to sort columns data
  sortHandle(e) {
    if (e.target.textContent === "Account Name") {
      this.sortValue = "Account.Name";

      e.target.classList.add("sorted");
    } else if (e.target.textContent === "City") {
      this.sortValue = "Account.BillingCity";
    } else if (e.target.textContent === "Account Type") {
      this.sortValue = "Account.Type";
    } else if (e.target.textContent === "Billing City") {
      this.sortValue = "Account.BillingCity";
    } else {
      this.sortValue = e.target.textContent;
    }

    // removing sorted css class from all the th's
    let columnHeadings = this.template.querySelectorAll("th");
    for (let i = 0; i < columnHeadings.length; i++) {
      columnHeadings[i].classList.remove("sorted");
    }

    // add sorted css class on the clicked th
    e.target.classList.add("sorted");

    // calling getSortedContacts method to get sorted contacts from salesforce
    this.getSortedContacts();
  }

  // imperative methods to get sorted data
  getSortedContacts() {
    sortedContacts({ str: this.sortValue })
      .then((result) => {
        //console.log("data:", result);
        this.contacts = result;

        //console.log("contacts = ", this.contacts);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // method to get cities from Salesforce to fill combobox
  // @wire(getCities)
  // accountBillingCity({ error, data }) {
  //   if (data) {
  //     this.uniqueCities = data;
  //     this.cityObject = [];
  //     let arr = [];
  //     arr.push({ label: "All", value: "All" });
  //     for (let i = 0; i < this.uniqueCities.length; i++) {
  //       arr.push({
  //         label: this.uniqueCities[i],
  //         value: this.uniqueCities[i]
  //       });
  //     }
  //     this.cityObject = arr;
  //   } else {
  //     this.uniqueCities = undefined;
  //     this.error = error;
  //   }
  // }

  billingCities() {
    let arr = [];
    arr.push({ label: "All", value: "All" });
    for (let i = 0; i < this.filteredCities.length; i++) {
      arr.push({
        label: this.filteredCities[i],
        value: this.filteredCities[i]
      });
    }
    this.cityObject = arr;
  }
  // method to get contact details according to the city selected in combobox
  @wire(getContactsByCity, { city: "$cityValue" })
  contactsByBillingCity({ error, data }) {
    if (data) {
      this.contacts = data;
      this.error = undefined;
    } else {
      this.error = error;
      this.data = undefined;
    }
  }
}