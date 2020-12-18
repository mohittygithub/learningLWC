import { LightningElement, track, wire } from "lwc";
import getContacts from "@salesforce/apex/ContactPageController.getContacts";
import contactSave from "@salesforce/apex/ContactPageController.saveContact";
import getAcccountId from "@salesforce/apex/ContactPageController.getAcccountId";
import deleteContact from "@salesforce/apex/ContactPageController.deleteContact";
//import { refreshApex } from "@salesforce/apex";

import { columns } from "./utils/share";

export default class ContactPage extends LightningElement {
  @track contacts;
  @track error;
  @track columns;
  @track cityName;
  @track cities = [];
  @track filteredCities = [];
  @track sortBy;
  @track sortDirection;
  @track isModalOpened;
  @track modalSaveButton;
  @track comboboxAccounts;
  @track id;
  @track firstName;
  @track lastName;
  @track selectedAccountsId;
  @track selectedAccountName;
  @track email;
  @track phone;
  @track contact = {};

  // constructor
  constructor() {
    super();
    this.columns = columns;
    this.cityName = "All";
    this.sortDirection = "asc";
    this.isModalOpened = false;
  }

  @wire(getContacts, { cityName: "$cityName" })
  contactRecords({ error, data }) {
    if (data) {
      console.log("recieved data => ", data);
      // setting contacts to show on datatable
      this.contacts = data.map((contact) =>
        Object.assign(
          { AccountName: contact.Account.Name },
          { AccountId: contact.Account.Id },
          contact
        )
      );

      // filtering Account Names to show in new record modal
      let accounts = [];
      for (let i = 0; i < this.contacts.length; i++) {
        accounts.push(this.contacts[i].AccountName);
      }

      accounts = accounts.filter(function (item, pos) {
        return accounts.indexOf(item) === pos;
      });
      for (let i = 0; i < accounts.length; i++) {
        accounts[i] = { label: accounts[i], value: accounts[i] };
      }
      this.comboboxAccounts = accounts;
      this.getCities();
    } else if (error) {
      this.error = error;
    }
  }

  // handleChange method
  handleChange(e) {
    if (e.target.name === "firstName") {
      this.firstName = e.target.value;
    } else if (e.target.name === "lastName") {
      this.lastName = e.target.value;
    } else if (e.target.name === "account") {
      this.selectedAccount = e.target.value;
      this.accountId = this.getId(this.selectedAccount);
    } else if (e.target.name === "email") {
      this.email = e.target.value;
    } else if (e.target.name === "phone") {
      this.phone = e.target.value;
    } else if (e.target.name === "cities") {
      this.cityName = e.target.value;
    }
  }

  // data sorting
  handleSortData(e) {
    // fieldname
    this.sortBy = e.detail.fieldName;

    // field direction
    this.sortDirection = e.detail.sortDirection;

    this.sortData(e.detail.fieldName, e.detail.sortDirection);
  }

  sortData(fieldName, direction) {
    let parseData = JSON.parse(JSON.stringify(this.contacts));

    let keyValue = (a) => {
      return a[fieldName];
    };

    let isReverse = direction === "asc" ? 1 : -1;

    parseData.sort((x, y) => {
      x = keyValue(x) ? keyValue(x) : "";
      y = keyValue(y) ? keyValue(y) : "";

      return isReverse * ((x > y) - (y > x));
    });
    this.contacts = parseData;
  }

  // handleclick event
  handleClick(e) {
    if (e.target.label === "New") {
      this.isModalOpened = true;
      this.modalSaveButton = true;
    } else if (e.target.label === "Close") {
      this.isModalOpened = false;
    } else if (e.target.label === "Save") {
      let contact = {};
      contact.FirstName = this.firstName;
      contact.LastName = this.lastName;
      contact.AccountId = this.accountId;
      contact.Email = this.email;
      contact.Phone = this.phone;
      //console.log(contact);
      this.saveNewContact(contact);
      this.isModalOpened = false;
    } else if (e.target.label === "Update") {
      let contact = {};
      contact.Id = this.id;
      contact.FirstName = this.firstName;
      contact.LastName = this.lastName;
      contact.AccountId = this.accountId;
      contact.Email = this.email;
      contact.Phone = this.phone;
      console.log(contact);
      this.saveNewContact(contact);
      this.isModalOpened = false;
    }
  }

  // filtering cities to show in combobox
  getCities() {
    let filteredCities = [];
    for (let i = 0; i < this.contacts.length; i++) {
      filteredCities.push(this.contacts[i].MailingCity);
    }
    filteredCities = filteredCities.filter(function (item, pos) {
      return filteredCities.indexOf(item) === pos;
    });
    filteredCities[0] = "All";

    console.log("cities = ", filteredCities);
    //return this.cities;
  }

  // method to save new contact
  saveNewContact(contact) {
    contactSave({ newRecord: contact })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // method to get Account Id
  getId(accountName) {
    getAcccountId({ accountName: accountName })
      .then((result) => {
        this.accountId = result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // method to delete a record
  deleteContact(contactId) {
    deleteContact({ contactId: contactId })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // handle row action
  handleRowAction(e) {
    if (e.detail.action.label === "Edit") {
      this.modalSaveButton = false;
      this.isModalOpened = true;
      this.selectedAccountName = e.detail.row.Account.Name;
      this.accountId = e.detail.row.Account.Id;
      this.id = e.detail.row.Id;
      this.firstName = e.detail.row.FirstName;
      this.lastName = e.detail.row.LastName;
      this.phone = e.detail.row.Phone;
      this.email = e.detail.row.Email;
    } else if (e.detail.action.label === "Delete") {
      this.id = e.detail.row.Id;
      this.deleteContact(this.id);
      this.refresh();
    }
  }

  // refresh data
}