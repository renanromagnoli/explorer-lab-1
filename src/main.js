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

const cardNumber = document.querySelector(".cc-number")
const inputCardNumber = document.querySelector("input#card-number")
const maskNumber = {
  mask: "0000 0000 0000 0000",
}

function setCardNumber(number) {
  cardNumber.textContent = number
}
function maskNumberCard(inputNumberCardValue) {
  const mask = IMask(inputNumberCardValue, maskNumber)
  setCardNumber(mask.value)
}
inputCardNumber.addEventListener("input", () => {
  maskNumberCard(inputCardNumber)
})

globalThis.setCard = setCard
