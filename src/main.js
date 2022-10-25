import "./css/index.css"
import IMask from "imask"

function setCard(flag) {
  const bgColor1 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
  const bgColor2 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
  const logo = document.querySelector(".cc-logo span:nth-child(2) img")

  const colors = {
    visa: ["blue", "lightblue"],
    mastercard: ["orange", "lightorange"],
    default: ["gray", "lightgray"],
  }

  bgColor1.setAttribute("fill", colors[flag][0])
  bgColor2.setAttribute("fill", colors[flag][1])
  logo.setAttribute("src", `${flag}.svg`)
}

const cardNumber = document.querySelector("input#card-number")
const maskCardNumber = {
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

const cardNumberMask = IMask(cardNumber, maskCardNumber)

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

globalThis.setCard = setCard
