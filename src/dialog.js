let reloadWeather;

export const initZipCodeDialog = onReloadRequired => {
  reloadWeather = onReloadRequired;
  // handler for when the city name is clicked on - show the zipcode dialog
  document
    .querySelector("#city-name")
    .addEventListener("click", () => toggleDialog(true));

  // handler for limiting number of numbers that can be entered into
  // the zipcode entry. (maxlength is ignored for type="number")
  // limit the amount of characters to 5 (length of a US zipcode)
  let entryCount = 0;

  document.querySelector("#zipcode-input").addEventListener("keydown", e => {
    // make sure the backspace key works
    if (entryCount > 0 && e.key === "Backspace") {
      entryCount--;
      return;
    }

    // make sure the arrow keys still work
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      return;
    }

    // ignore any keys that aren't numbers
    if (Number.isNaN(Number.parseInt(e.key))) {
      e.preventDefault();
      return;
    }

    if (entryCount < 5) {
      entryCount++;
    } else {
      e.preventDefault();
    }
  });

  // handler for ok button
  document.querySelector("#ok-button").addEventListener("click", () => {
    const input = document.querySelector("#zipcode-input").value;
    if (input.length != 5) {
      setDialogError("Please use a valid US zipcode");
      return;
    }

    window.localStorage.setItem("zipCode", input);
    console.log(`Zipcode set to ${input}`);

    toggleDialog(false);
    reloadWeather();
  });
};

const setDialogError = msg => {
  const dialogMsg = document.querySelector("#dialog-error");
  dialogMsg.style.display = "block";
  dialogMsg.innerHTML = msg;
  setTimeout(() => (dialogMsg.style.display = "none"), 3000);
};

const toggleDialog = show => {
  const dialog = document.querySelector("#zipcode-dialog");

  if (!show) {
    dialog.style.display = "none";
  } else {
    dialog.style.display = "block";
  }
};
