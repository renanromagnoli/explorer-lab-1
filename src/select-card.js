export function setCard(flag) {
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

  console.log(`Cartão ${flag}`)
}
