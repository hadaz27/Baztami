const popup_add = document.getElementById("add_popup")
const open_btn = document.getElementById("add_button")
const close_btn = document.getElementById("close_button")
const add_income_btn = document.getElementById("add_income_button")


open_btn.addEventListener("click", () => {
    popup_add.classList.toggle("hidden")
})

close_btn.addEventListener("click", () => {
    popup_add.classList.toggle("hidden")
})


