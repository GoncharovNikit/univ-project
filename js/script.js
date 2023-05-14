const result = document.querySelector(".result")
const specialityDropdown = document.querySelector("#speciality-dropdown")
const thirdSubDropdown = document.querySelector("#third-subject")

document.addEventListener("DOMContentLoaded", () => {
    updateModeSwitchIcon()

    addSpecialitiesOptions(getSpecialities())
    addSecondarySubjectOptions(specialityDropdown.value)
    displayProgram(specialityDropdown.value)
    displayPassingScore(specialityDropdown.value)
    displayCoefs(specialityDropdown.value)
})

specialityDropdown.addEventListener("change", () => {
    addSecondarySubjectOptions(specialityDropdown.value)
    displayProgram(specialityDropdown.value)
    displayPassingScore(specialityDropdown.value)
    displayCoefs(specialityDropdown.value)
})

thirdSubDropdown.addEventListener("change", () => {
    displayCoefs(specialityDropdown.value)
})

document.querySelectorAll(".mark-input").forEach((markInput) => {
    markInput.addEventListener("input", (e) => {
        let userInput = e.target.value
        e.target.style.color =
            !/^\d{3}$/.test(userInput) || userInput < 100 || userInput > 200 ? "red" : "black"
    })
})

document.querySelector(".form").addEventListener("submit", (e) => {
    e.preventDefault()
    const ukrValue = +(document.getElementById("ukr-input").value)
    const mathValue = +(document.getElementById("math-input").value)
    const thirdValue = +(document.getElementById("third-sub").value)

    const specialityCode = specialityDropdown.value
    const thirdSubject = thirdSubDropdown.value

    const score = calculateScore(specialityCode, thirdSubject, ukrValue, mathValue, thirdValue)

    result.textContent = score.toFixed(2)
})

function calculateScore(specialityCode, thirdSubject, ukrValue, mathValue, thirdValue) {
    const speciality = findSpeciality(specialityCode)

    const ukrCoef = speciality.mainSubjects[0].coef
    const ukrScore = ukrCoef * ukrValue
    const mathCoef = speciality.mainSubjects[1].coef
    const mathScore = mathCoef * mathValue
    const thirdCoef = speciality.secondarySubjects.find((subj) => subj.title === thirdSubject).coef
    const thirdScore = thirdCoef * thirdValue

    // ADD YOUR COEF INSTEAD OF [* 1]
    return ((ukrScore + mathScore + thirdScore) / (ukrCoef + mathCoef + thirdCoef)) * 1
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

const findSpeciality = (specialityCode) =>
    getSpecialities().find((speciality) => speciality.code === specialityCode)

const getSecondarySubjects = (specialityCode) => {
    const speciality = findSpeciality(specialityCode)

    return speciality.secondarySubjects.map((subject) => subject.title)
}

const displayProgram = (specialityCode) => {
    const speciality = findSpeciality(specialityCode)

    document.querySelector("#program-placeholder").innerHTML =
        "Освітні програми: " + speciality.program
}

const displayCoefs = (specialityCode) => {
    const speciality = findSpeciality(specialityCode)

    document.querySelector(".subject-1-coef").innerHTML =
        "Коефіцієнт: " + speciality.mainSubjects[0].coef.toFixed(2)
    document.querySelector(".subject-2-coef").innerHTML =
        "Коефіцієнт: " + speciality.mainSubjects[1].coef.toFixed(2)

    const subject3 = speciality.secondarySubjects.find(
        ({ title }) => title === thirdSubDropdown.value
    )
    document.querySelector(".subject-3-coef").innerHTML = "Коефіцієнт: " + subject3.coef.toFixed(2)
}

const displayPassingScore = (specialityCode) => {
    const speciality = findSpeciality(specialityCode)

        document.getElementById("score-contract").innerHTML = speciality.minContract
            ? "Мінімальний бал на контракт: " + speciality.minContract
            : ""
}

const subjects = [
    {
        code: "022",
        title: "Дизайн",
        program: "Бізнес-дизайн",
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
        program:
            "Бізнес-статистика і аналітика, Економіка підприємства, Економіка та економічна політика, Економічна кібернетика, Міжнародна економіка, Управління персоналом в бізнесі, Цифрова економіка",
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
        program: "Національна безпека",
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
        program: "Психологія бізнесу",
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
        program: "Медіа-комунікації, Реклама і PR",
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
        program: "Облік і аудит",
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
        program:
            "Митна справа, Фінанси і кредит, Фінансовий продакт-менеджмент, Фінансові послуги та віртуальні активи",
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
        program:
            "Бізнес-адміністрування, Логістика, Менеджмент інноваційної діяльності, Менеджмент креативних індустрій, Менеджмент організацій і адміністрування, Міжнародний менеджмент (ІТ-менеджмент)",
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
        program: "Маркетинг",
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
        program:
            "Електронна комерція, Міжнародна торгівля, Підприємництво, торгівля та біржова діяльність",
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
        program: "Правове регулювання економіки",
        minContract: 120,
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
        program: "Інженерія програмного забезпечення",
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
        program: "Комп’ютерні науки",
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
        program: "Управління складними системами",
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
        program: "Кібербезпека",
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
        program: "Інформаційні системи та технології",
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
        program: "Технології електронних мультимедійних видань",
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
        program: "Управління соціальною сферою",
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
        program: "Готельно-ресторанний бізнес",
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
        program: "Туризм",
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
        program: "Публічне управління",
        minContract: 120,
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
        program: "Міжнародні відносини, суспільні комунікації та регіональні студії",
        minContract: 120,
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
        program: "Міжнародний бізнеc",
        minContract: 120,
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
