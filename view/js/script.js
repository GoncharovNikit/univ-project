const apiConfig = {
    apiBaseUrl: "http://127.0.0.1:3830/",
    endpoints: {
        getSpecialities: "speciality/all",
    }
}

const form = document.querySelector(".form");
const resultContainer = document.querySelector(".result-container");
const result = document.querySelector(".result");
const startBtn = document.querySelector("#start-btn");
const preloader = document.querySelector('#preloader');

startBtn.addEventListener("click", () => {
    preloader.style.display = "flex";
    startBtn.style.display = "none";

    fetch(apiConfig.apiBaseUrl + apiConfig.endpoints.getSpecialities)
        .then((response) => {
            response.json().then((data) => {
                addSpecialitiesOptions(data);
                document.querySelector('.form-container').style.display = "block";
                preloader.style.display = "none";
            })
        })
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const select1 = form.querySelector("select:first-of-type");
    const select2 = form.querySelector("select:last-of-type");
    const input = form.querySelector("input");

    const spec = select1.options[select1.selectedIndex].text;
    const prog = select2.options[select2.selectedIndex].text;
    const score = input.value;

    const resultText = `Ваш результат для спеціальності "${spec}" та програми "${prog}" - ${score} бал(ів)`;
    result.textContent = resultText;

    form.style.display = "none";
    resultContainer.style.display = "block";
});

const addSpecialitiesOptions = (specialities) => {
    console.log(specialities);
    const specs = document.querySelector('#speciality-dropdown')
    specialities.forEach((spec) => {
        const option = document.createElement('option');
        option.value = spec.code;
        option.innerHTML = spec.code + " " + spec.title;
        specs.appendChild(option);
    })

}

/*const updateModeSwitchIcon = () => {
  const isDarkMode = document.body.classList.contains('dark');
  const moonIcon = document.querySelector('.moon-icon');
  const sunIcon = document.querySelector('.sun-icon');
  if (isDarkMode) {
    moonIcon.style.display = 'block';
    sunIcon.style.display = 'none';
  } else {
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
  }
};*/

const updateModeSwitchIcon = () => {
  const icon = document.querySelector('.icon');
  if (themeToggle.checked) {
    icon.classList.add('rotate');
  } else {
    icon.classList.remove('rotate');
  }
};

const themeToggle = document.querySelector('#theme-toggle');
const switchElement = document.querySelector('.switch');

themeToggle.addEventListener('change', function() {
  if (this.checked) {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
  }
  updateModeSwitchIcon();
});

// Call the function once on load to set the initial icon
updateModeSwitchIcon();
