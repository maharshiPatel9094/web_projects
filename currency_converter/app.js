// adding the base url of currency converter
const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// accessing the tags of HTML
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// running the for loop for the selecting the countries options
for (let select of dropdowns) {
  for (currCode in countryList) {
    // creating an new option using js 
    let newOption = document.createElement("option");
// setting the text and value to our new button
    newOption.innerText = currCode;
    newOption.value = currCode;
    // default setting 
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
// adding a event listner for the change 
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}


// function for updating the exchange rate value
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

// function to update the flag of an country
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// adding the event listner for the button 
btn.addEventListener("click", (evt) => {
    // prevent the default behaviour of submit button
  evt.preventDefault();
  updateExchangeRate();
});

// event listner for the load of website
window.addEventListener("load", () => {
  updateExchangeRate();
});