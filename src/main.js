import "./css/index.css"
import IMask from "imask"
import { setCard } from "./select-card"

const cardNumber = document.querySelector("input#card-number")
const cardNumberMask = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundedMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    return foundedMask
  },
}

const maskingCardNumber = IMask(cardNumber, cardNumberMask)

maskingCardNumber.on("accept", () => {
  const cardType = maskingCardNumber.masked.currentMask.cardtype
  setCard(cardType)
  updateCardNumber(cardNumberMask.value)
})

function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = number.length === 0 ? "1234 4567 8901 2345" : number
}

const expirationDate = document.querySelector("#expiration-date")
const expirationDateMask = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
}

const securityCodeInput = document.querySelector("#security-code")
const securityCodeInputMask = {
  mask: "000",
}
const securityCodeInputMasked = IMask(securityCodeInput, securityCodeInputMask)

function updateSecurityCodeNumberLabel(code) {
  const SecurityCodeNumberlabel = document.querySelector(".cc-security .value")
  SecurityCodeNumberlabel.innerText = code.length ? code : "123"
}

securityCodeInputMasked.on("accept", () => {
  updateSecurityCodeNumberLabel(securityCodeInputMasked.value)
})

const nameInput = document.querySelector("#card-holder")
nameInput.addEventListener("input", () => {
  const nameLabel = document.querySelector(".cc-holder .value")
  nameLabel.innerText = nameInput.value.length
    ? nameInput.value
    : "Fulano de Tal"
})
