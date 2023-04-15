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
const specialityDropdown = document.querySelector('#speciality-dropdown'); 
const thirdSubDropdown = document.querySelector('#third-subject '); 





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

specialityDropdown.addEventListener("change", function() {
  var spec = specialityDropdown.value;
  console.log(spec);
  fetch(apiConfig.apiBaseUrl + apiConfig.endpoints.getSpecialities)
        .then((response) => {
            response.json().then((data) =>{
   addSubjectOptions(data, spec)})
})
});



form.addEventListener("submit", (e) => {
    e.preventDefault();    
    var ukrInput = document.getElementById('ukrInput');
    var mathInput = document.getElementById('mathInput');
    var thirdSub = document.getElementById('thirdSub');
    var ukrValue = parseFloat(ukrInput.value); 
    var mathValue = parseFloat(mathInput.value);
    var thirdValue = parseFloat(thirdSub.value);

    const select = form.querySelector("select:first-of-type");
    const spec = select.options[select.selectedIndex].text;
    const speciality = specialityDropdown.value;
    const thirdSubject = thirdSubDropdown.value;
    score = calculateScore(ukrValue, mathValue, thirdValue, thirdSubject, speciality);
    if (score > 200){
      score = 200;
    }
    const resultText = `Ваш результат для спеціальності "${spec}": ${score} бал(ів)`;
    result.textContent = resultText;

    form.style.display = "none";
    resultContainer.style.display = "block";
});

function calculateScore(ukrValue, mathValue, thirdValue, thirdSubject, speciality){
  data  =1;
    return data;
}

const addSpecialitiesOptions = (specialities) => {
    console.log(specialities);
    specialityDropdown.innerHTML = "<option value=''>Оберіть значення</option>";
    specialities.forEach((spec) => {
        const option = document.createElement('option');
        option.value = spec.code;
        option.innerHTML = spec.code + " " + spec.title;
        specialityDropdown.appendChild(option);
    })
}

const addSubjectOptions = (data, spec) => {
  thirdSubDropdown.innerHTML = "<option value=''>Оберіть значення</option>";
  const selectedData = data.find(item => item.code == spec);
  const subjects = selectedData.secondarySubjects.map(subject => subject.title);
  console.log(subjects);
  subjects.forEach((subj)=>{
      const option = document.createElement('option');
      option.value = subj;
      option.innerHTML = subj;
      thirdSubDropdown.appendChild(option);      
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
