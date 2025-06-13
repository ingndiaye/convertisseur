const translations = {
  fr: {
    title: "Convertisseur d'Unités",
    valueLabel: "Valeur à convertir :",
    fromLabel: "De :",
    toLabel: "Vers :",
    convertButton: "Convertir",
    invalid: "Veuillez entrer une valeur valide.",
    unsupported: "Conversion non supportée.",
    result: "Résultat :",
    units: {
      celsius: "Celsius",
      fahrenheit: "Fahrenheit",
      meters: "Mètres",
      feet: "Pieds",
      kilograms: "Kilogrammes",
      pounds: "Livres"
    }
  },
  en: {
    title: "Unit Converter",
    valueLabel: "Value to convert:",
    fromLabel: "From:",
    toLabel: "To:",
    convertButton: "Convert",
    invalid: "Please enter a valid value.",
    unsupported: "Unsupported conversion.",
    result: "Result:",
    units: {
      celsius: "Celsius",
      fahrenheit: "Fahrenheit",
      meters: "Meters",
      feet: "Feet",
      kilograms: "Kilograms",
      pounds: "Pounds"
    }
  }
};

let currentLang = "fr";

const unitKeys = ["celsius", "fahrenheit", "meters", "feet", "kilograms", "pounds"];

function populateUnitOptions() {
  const fromSelect = document.getElementById("from");
  const toSelect = document.getElementById("to");
  fromSelect.innerHTML = "";
  toSelect.innerHTML = "";
  unitKeys.forEach(unit => {
    const optionFrom = document.createElement("option");
    const optionTo = document.createElement("option");
    optionFrom.value = unit;
    optionTo.value = unit;
    optionFrom.textContent = translations[currentLang].units[unit];
    optionTo.textContent = translations[currentLang].units[unit];
    fromSelect.appendChild(optionFrom);
    toSelect.appendChild(optionTo);
  });
}

function changeLanguage() {
  currentLang = document.getElementById("language").value;
  const t = translations[currentLang];

  document.getElementById("title").textContent = t.title;
  document.getElementById("label-value").textContent = t.valueLabel;
  document.getElementById("label-from").textContent = t.fromLabel;
  document.getElementById("label-to").textContent = t.toLabel;
  document.getElementById("convert-button").textContent = t.convertButton;
  populateUnitOptions();
}

function convert() {
  const value = parseFloat(document.getElementById('value').value);
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const resultDiv = document.getElementById('result');
  const t = translations[currentLang];

  if (isNaN(value)) {
    resultDiv.textContent = t.invalid;
    resultDiv.style.color = "red";
    return;
  }

  let result;

  // Temperature
  if (from === "celsius" && to === "fahrenheit") {
    result = (value * 9/5) + 32;
  } else if (from === "fahrenheit" && to === "celsius") {
    result = (value - 32) * 5/9;

  // Length
  } else if (from === "meters" && to === "feet") {
    result = value * 3.28084;
  } else if (from === "feet" && to === "meters") {
    result = value / 3.28084;

  // Weight
  } else if (from === "kilograms" && to === "pounds") {
    result = value * 2.20462;
  } else if (from === "pounds" && to === "kilograms") {
    result = value / 2.20462;

  // Same units
  } else if (from === to) {
    result = value;

  // Unsupported
  } else {
    resultDiv.textContent = t.unsupported;
    resultDiv.style.color = "red";
    return;
  }

  resultDiv.textContent = `${t.result} ${result.toFixed(2)}`;
  resultDiv.style.color = "green";
}

// Initial load
window.onload = () => {
  changeLanguage();
};
