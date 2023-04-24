const result = document.querySelector(".result")
const specialityDropdown = document.querySelector("#speciality-dropdown")
const thirdSubDropdown = document.querySelector("#third-subject")

document.addEventListener("DOMContentLoaded", (e) => {
    updateModeSwitchIcon()

    addSpecialitiesOptions(getSpecialities())
    addSecondarySubjectOptions(specialityDropdown.value)
    displayProgram(specialityDropdown.value)
    passingScore(specialityDropdown.value)
})

specialityDropdown.addEventListener("change", () => {
    addSecondarySubjectOptions(specialityDropdown.value)
    displayProgram(specialityDropdown.value)
    passingScore(specialityDropdown.value)
})

document.querySelectorAll(".mark-input").forEach((markInput) => {
    markInput.addEventListener("input", (e) => {
        let userInput = e.target.value
        e.target.style.color =
            !/^\d{3}$/.test(userInput) || userInput < 100 || userInput > 200
                ? "red"
                : "black"
    })
})

document.querySelector(".form").addEventListener("submit", (e) => {
    e.preventDefault()
    let ukrValue = parseInt(document.getElementById("ukr-input").value)
    let mathValue = parseInt(document.getElementById("math-input").value)
    let thirdValue = parseInt(document.getElementById("third-sub").value)

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
    const speciality = getSpecialities().find(
        (speciality) => speciality.code === specialityCode
    )

    const ukrCoef = speciality.mainSubjects[0].coef
    const ukrScore = ukrCoef * ukrValue
    const mathCoef = speciality.mainSubjects[1].coef
    const mathScore = mathCoef * mathValue
    const thirdCoef = speciality.secondarySubjects.find(
        (subj) => subj.title === thirdSubject
    ).coef
    const thirdScore = thirdCoef * thirdValue

    return (
        ((ukrScore + mathScore + thirdScore) /
            (ukrCoef + mathCoef + thirdCoef)) *
        1
    )
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

const getSecondarySubjects = (specialityCode) => {
    const speciality = getSpecialities().find(
        (speciality) => speciality.code === specialityCode
    )

    return speciality.secondarySubjects.map((subject) => subject.title)
}

const displayProgram = (specialityCode) => {
    const speciality = getSpecialities().find(
        (speciality) => speciality.code === specialityCode
    )

    document.querySelector("#program-placeholder").innerHTML =
        "Освітні програми: " + speciality.program
}

const passingScore = (specialityCode) => {
    const speciality = getSpecialities().find(
        (speciality) => speciality.code === specialityCode
    )
    document.getElementById("score-budget").innerHTML =
        "Мінімальний бал на бюджет: " + speciality.minBudget
    document.getElementById("score-contract").innerHTML =
        "Мінімальний бал на контракт: " + speciality.minContract
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
        program:
            "Бізнес-статистика і аналітика, Економіка підприємства, Економіка та економічна політика, Економічна кібернетика, Міжнародна економіка, Управління персоналом в бізнесі, Цифрова економіка",
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
        minBudget: 130,
        minContract: 100,
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
            "Електронна комерція, Електронна комерція, Підприємництво, торгівля та біржова діяльність",
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
        minBudget: 140,
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
        minBudget: 130,
        minContract: 100,
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
        minBudget: 130,
        minContract: 100,
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
        minBudget: 130,
        minContract: 100,
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
        minBudget: 130,
        minContract: 100,
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
        minBudget: 130,
        minContract: 100,
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
        minBudget: 130,
        minContract: 100,
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
        code: "241",
        title: "Готельно-ресторанна справа",
        program: "Готельно-ресторанний бізнес",
        minBudget: 130,
        minContract: 100,
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
        minBudget: 130,
        minContract: 100,
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
        minBudget: 140,
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
        program:
            "Міжнародні відносини, суспільні комунікації та регіональні студії",
        minBudget: 140,
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
        minBudget: 140,
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
