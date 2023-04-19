const form = document.querySelector(".form")
const resultContainer = document.querySelector(".result-container")
const result = document.querySelector(".result")
const specialityDropdown = document.querySelector("#speciality-dropdown")
const thirdSubDropdown = document.querySelector("#third-subject ")

document.addEventListener("DOMContentLoaded", (e) => {
    updateModeSwitchIcon()

    addSpecialitiesOptions(getSpecialities())
    addSecondarySubjectOptions(specialityDropdown.value)
})

specialityDropdown.addEventListener("change", () => {
    addSecondarySubjectOptions(specialityDropdown.value)
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let ukrValue = parseFloat(document.getElementById("ukrInput").value)
    let mathValue = parseFloat(document.getElementById("mathInput").value)
    let thirdValue = parseFloat(document.getElementById("thirdSub").value)

    const specialityCode = specialityDropdown.value
    const thirdSubject = thirdSubDropdown.value

    const score = calculateScore(
        specialityCode,
        thirdSubject,
        ukrValue,
        mathValue,
        thirdValue
    )

    result.textContent = score.toFixed(2)
})

function calculateScore(
    specialityCode,
    thirdSubject,
    ukrValue,
    mathValue,
    thirdValue
) {
    const speciality = getSpecialities().find((speciality) => speciality.code === specialityCode)

    const ukrCoef = speciality.mainSubjects[0].coef
    const ukrScore = ukrCoef * ukrValue
    const mathCoef = speciality.mainSubjects[1].coef
    const mathScore = mathCoef * mathValue
    const thirdCoef = speciality.secondarySubjects.find((subj) => subj.title === thirdSubject).coef
    const thirdScore = thirdCoef * thirdValue

    return (ukrScore + mathScore + thirdScore) / (ukrCoef + mathCoef + thirdCoef) * 1
}

const addSpecialitiesOptions = (specialities) => {
    specialities.forEach((spec) => {
        const option = document.createElement("option")
        option.value = spec.code
        option.innerHTML = spec.code + " " + spec.title
        specialityDropdown.appendChild(option)
    })
}

const addSecondarySubjectOptions = (specialityCode) => {
    thirdSubDropdown.innerHTML = ""

    getSecondarySubjects(specialityCode).forEach((subj) => {
        const option = document.createElement("option")
        option.value = subj
        option.innerHTML = subj
        thirdSubDropdown.appendChild(option)
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
    const icon = document.querySelector(".icon")
    if (themeToggle.checked) {
        icon.classList.add("rotate")
    } else {
        icon.classList.remove("rotate")
    }
}

const themeToggle = document.querySelector("#theme-toggle")
const switchElement = document.querySelector(".switch")

themeToggle.addEventListener("change", function () {
    if (this.checked) {
        document.body.classList.remove("light")
        document.body.classList.add("dark")
    } else {
        document.body.classList.remove("dark")
        document.body.classList.add("light")
    }
    updateModeSwitchIcon()
})

const getSpecialities = () => subjects

const getSecondarySubjects = (specialityCode) => {
    const speciality = getSpecialities().find(
        (speciality) => speciality.code === specialityCode
    )

    return speciality.secondarySubjects.map((subject) => subject.title)
}

const subjects = [
    {
        code: "022",
        title: "Дизайн",
        program: "Бізнес-дизайн",
        minBudget: 130,
        minContract: 100,
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.35,
            },
            {
                title: "Математика",
                coef: 0.4,
            },
        ],
        secondarySubjects: [
            {
                title: "Історія України",
                coef: 0.25,
            },
            {
                title: "Іноземна мова",
                coef: 0.25,
            },
            {
                title: "Фізика",
                coef: 0.25,
            },
            {
                title: "Хімія",
                coef: 0.25,
            },
            {
                title: "Біологія",
                coef: 0.25,
            },
        ],
    },
    {
        code: "051",
        title: "Економіка",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.35,
            },
            {
                title: "Математика",
                coef: 0.4,
            },
        ],
        secondarySubjects: [
            {
                title: "Історія України",
                coef: 0.25,
            },
            {
                title: "Іноземна мова",
                coef: 0.25,
            },
            {
                title: "Фізика",
                coef: 0.2,
            },
            {
                title: "Хімія",
                coef: 0.2,
            },
            {
                title: "Біологія",
                coef: 0.2,
            },
        ],
    },
    {
        code: "052",
        title: "Політологія",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.35,
            },
            {
                title: "Математика",
                coef: 0.4,
            },
        ],
        secondarySubjects: [
            {
                title: "Історія України",
                coef: 0.25,
            },
            {
                title: "Іноземна мова",
                coef: 0.25,
            },
            {
                title: "Фізика",
                coef: 0.2,
            },
            {
                title: "Хімія",
                coef: 0.2,
            },
            {
                title: "Біологія",
                coef: 0.2,
            },
        ],
    },
    {
        code: "053",
        title: "Психологія",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.35,
            },
            {
                title: "Математика",
                coef: 0.4,
            },
        ],
        secondarySubjects: [
            {
                title: "Біологія",
                coef: 0.4,
            },
            {
                title: "Історія України",
                coef: 0.25,
            },
            {
                title: "Іноземна мова",
                coef: 0.25,
            },
            {
                title: "Фізика",
                coef: 0.2,
            },
            {
                title: "Хімія",
                coef: 0.2,
            },
        ],
    },
    {
        code: "061",
        title: "Журналістика",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.45,
            },
            {
                title: "Математика",
                coef: 0.3,
            },
        ],
        secondarySubjects: [
            {
                title: "Іноземна мова",
                coef: 0.35,
            },
            {
                title: "Історія України",
                coef: 0.25,
            },
            {
                title: "Фізика",
                coef: 0.2,
            },
            {
                title: "Хімія",
                coef: 0.2,
            },
            {
                title: "Біологія",
                coef: 0.2,
            },
        ],
    },
    {
        code: "071",
        title: "Облік і оподаткування",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.35,
            },
            {
                title: "Математика",
                coef: 0.4,
            },
        ],
        secondarySubjects: [
            {
                title: "Історія України",
                coef: 0.25,
            },
            {
                title: "Іноземна мова",
                coef: 0.25,
            },
            {
                title: "Фізика",
                coef: 0.2,
            },
            {
                title: "Хімія",
                coef: 0.2,
            },
            {
                title: "Біологія",
                coef: 0.2,
            },
        ],
    },
    {
        code: "072",
        title: "Фінанси, банківська справа, страхування та фондовий ринок",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.35,
            },
            {
                title: "Математика",
                coef: 0.4,
            },
        ],
        secondarySubjects: [
            {
                title: "Історія України",
                coef: 0.25,
            },
            {
                title: "Іноземна мова",
                coef: 0.25,
            },
            {
                title: "Фізика",
                coef: 0.2,
            },
            {
                title: "Хімія",
                coef: 0.2,
            },
            {
                title: "Біологія",
                coef: 0.2,
            },
        ],
    },
    {
        code: "073",
        title: "Менеджмент",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.35,
            },
            {
                title: "Математика",
                coef: 0.4,
            },
        ],
        secondarySubjects: [
            {
                title: "Історія України",
                coef: 0.25,
            },
            {
                title: "Іноземна мова",
                coef: 0.25,
            },
            {
                title: "Фізика",
                coef: 0.2,
            },
            {
                title: "Хімія",
                coef: 0.2,
            },
            {
                title: "Біологія",
                coef: 0.2,
            },
        ],
    },
    {
        code: "075",
        title: "Маркетинг",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.35,
            },
            {
                title: "Математика",
                coef: 0.4,
            },
        ],
        secondarySubjects: [
            {
                title: "Історія України",
                coef: 0.25,
            },
            {
                title: "Іноземна мова",
                coef: 0.25,
            },
            {
                title: "Фізика",
                coef: 0.2,
            },
            {
                title: "Хімія",
                coef: 0.2,
            },
            {
                title: "Біологія",
                coef: 0.2,
            },
        ],
    },
    {
        code: "076",
        title: "Підприємництво та торгівля",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.35,
            },
            {
                title: "Математика",
                coef: 0.4,
            },
        ],
        secondarySubjects: [
            {
                title: "Історія України",
                coef: 0.25,
            },
            {
                title: "Іноземна мова",
                coef: 0.25,
            },
            {
                title: "Фізика",
                coef: 0.2,
            },
            {
                title: "Хімія",
                coef: 0.2,
            },
            {
                title: "Біологія",
                coef: 0.2,
            },
        ],
    },
    {
        code: "081",
        title: "Право",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.35,
            },
            {
                title: "Математика",
                coef: 0.4,
            },
        ],
        secondarySubjects: [
            {
                title: "Історія України",
                coef: 0.25,
            },
            {
                title: "Іноземна мова",
                coef: 0.25,
            },
            {
                title: "Фізика",
                coef: 0.2,
            },
            {
                title: "Хімія",
                coef: 0.2,
            },
            {
                title: "Біологія",
                coef: 0.2,
            },
        ],
    },
    {
        code: "121",
        title: "Інженерія програмного забезпечення",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.3,
            },
            {
                title: "Математика",
                coef: 0.5,
            },
        ],
        secondarySubjects: [
            {
                title: "Фізика",
                coef: 0.4,
            },
            {
                title: "Іноземна мова",
                coef: 0.3,
            },
            {
                title: "Історія України",
                coef: 0.2,
            },
            {
                title: "Біологія",
                coef: 0.2,
            },
            {
                title: "Хімія",
                coef: 0.2,
            },
        ],
    },
    {
        code: "122",
        title: "Комп’ютерні науки",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.3,
            },
            {
                title: "Математика",
                coef: 0.5,
            },
        ],
        secondarySubjects: [
            {
                title: "Фізика",
                coef: 0.4,
            },
            {
                title: "Іноземна мова",
                coef: 0.3,
            },
            {
                title: "Історія України",
                coef: 0.2,
            },
            {
                title: "Біологія",
                coef: 0.2,
            },
            {
                title: "Хімія",
                coef: 0.2,
            },
        ],
    },
    {
        code: "124",
        title: "Системний аналіз",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.3,
            },
            {
                title: "Математика",
                coef: 0.5,
            },
        ],
        secondarySubjects: [
            {
                title: "Фізика",
                coef: 0.4,
            },
            {
                title: "Іноземна мова",
                coef: 0.3,
            },
            {
                title: "Історія України",
                coef: 0.2,
            },
            {
                title: "Біологія",
                coef: 0.2,
            },
            {
                title: "Хімія",
                coef: 0.2,
            },
        ],
    },
    {
        code: "125",
        title: "Кібербезпека та захист інформації",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.3,
            },
            {
                title: "Математика",
                coef: 0.5,
            },
        ],
        secondarySubjects: [
            {
                title: "Фізика",
                coef: 0.4,
            },
            {
                title: "Іноземна мова",
                coef: 0.3,
            },
            {
                title: "Історія України",
                coef: 0.2,
            },
            {
                title: "Біологія",
                coef: 0.2,
            },
            {
                title: "Хімія",
                coef: 0.2,
            },
        ],
    },
    {
        code: "126",
        title: "Інформаційні системи та технології",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.3,
            },
            {
                title: "Математика",
                coef: 0.5,
            },
        ],
        secondarySubjects: [
            {
                title: "Фізика",
                coef: 0.4,
            },
            {
                title: "Іноземна мова",
                coef: 0.3,
            },
            {
                title: "Історія України",
                coef: 0.2,
            },
            {
                title: "Біологія",
                coef: 0.2,
            },
            {
                title: "Хімія",
                coef: 0.2,
            },
        ],
    },
    {
        code: "186",
        title: "Видавництво та поліграфія",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.3,
            },
            {
                title: "Математика",
                coef: 0.5,
            },
        ],
        secondarySubjects: [
            {
                title: "Фізика",
                coef: 0.5,
            },
            {
                title: "Хімія",
                coef: 0.5,
            },
            {
                title: "Іноземна мова",
                coef: 0.3,
            },
            {
                title: "Історія України",
                coef: 0.2,
            },
            {
                title: "Біологія",
                coef: 0.2,
            },
        ],
    },
    {
        code: "232",
        title: "Соціальне забезпечення",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.35,
            },
            {
                title: "Математика",
                coef: 0.4,
            },
        ],
        secondarySubjects: [
            {
                title: "Історія України",
                coef: 0.25,
            },
            {
                title: "Іноземна мова",
                coef: 0.25,
            },
            {
                title: "Фізика",
                coef: 0.25,
            },
            {
                title: "Хімія",
                coef: 0.25,
            },
            {
                title: "Біологія",
                coef: 0.25,
            },
        ],
    },
    {
        code: "241",
        title: "Готельно-ресторанна справа",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.4,
            },
            {
                title: "Математика",
                coef: 0.3,
            },
        ],
        secondarySubjects: [
            {
                title: "Іноземна мова",
                coef: 0.5,
            },
            {
                title: "Історія України",
                coef: 0.3,
            },
            {
                title: "Біологія",
                coef: 0.3,
            },
            {
                title: "Хімія",
                coef: 0.3,
            },
            {
                title: "Фізика",
                coef: 0.25,
            },
        ],
    },
    {
        code: "242",
        title: "Туризм і рекреація",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.4,
            },
            {
                title: "Математика",
                coef: 0.3,
            },
        ],
        secondarySubjects: [
            {
                title: "Іноземна мова",
                coef: 0.5,
            },
            {
                title: "Біологія",
                coef: 0.35,
            },
            {
                title: "Історія України",
                coef: 0.3,
            },
            {
                title: "Фізика",
                coef: 0.25,
            },
            {
                title: "Хімія",
                coef: 0.25,
            },
        ],
    },
    {
        code: "281",
        title: "Публічне управління та адміністрування",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.3,
            },
            {
                title: "Математика",
                coef: 0.4,
            },
        ],
        secondarySubjects: [
            {
                title: "Іноземна мова",
                coef: 0.5,
            },
            {
                title: "Історія України",
                coef: 0.3,
            },
            {
                title: "Фізика",
                coef: 0.2,
            },
            {
                title: "Хімія",
                coef: 0.2,
            },
            {
                title: "Біологія",
                coef: 0.2,
            },
        ],
    },
    {
        code: "291",
        title: "Міжнародні відносини, суспільні комунікації та регіональні студії",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.4,
            },
            {
                title: "Математика",
                coef: 0.3,
            },
        ],
        secondarySubjects: [
            {
                title: "Іноземна мова",
                coef: 0.5,
            },
            {
                title: "Історія України",
                coef: 0.3,
            },
            {
                title: "Фізика",
                coef: 0.2,
            },
            {
                title: "Хімія",
                coef: 0.2,
            },
            {
                title: "Біологія",
                coef: 0.2,
            },
        ],
    },
    {
        code: "292",
        title: "Міжнародні економічні відносини",
        mainSubjects: [
            {
                title: "Українська мова",
                coef: 0.3,
            },
            {
                title: "Математика",
                coef: 0.4,
            },
        ],
        secondarySubjects: [
            {
                title: "Іноземна мова",
                coef: 0.5,
            },
            {
                title: "Історія України",
                coef: 0.3,
            },
            {
                title: "Фізика",
                coef: 0.2,
            },
            {
                title: "Хімія",
                coef: 0.2,
            },
            {
                title: "Біологія",
                coef: 0.2,
            },
        ],
    },
]
