const popup_add = document.getElementById("add_popup")
const open_btn = document.getElementById("add_button")
const close_btn = document.getElementById("close_button")
const add_income_btn = document.getElementById("add_income_button")
const confirm_btn = document.getElementById("confirm_button")

let transactions = []
confirm_btn.addEventListener("click", () => {
    let transaction = {
        description : document.getElementById("description"),
        amount : document.getElementById("amount"),
        date : document.getElementById("date")
    }
    transactions.push(transaction)
    let log_description = document.getElementById("log_description")
    console.log()
})


open_btn.addEventListener("click", () => {
    popup_add.classList.toggle("hidden")
})

close_btn.addEventListener("click", () => {
    popup_add.classList.toggle("hidden")
})

add_income_btn.addEventListener("click",() => {
    popup_add.classList.toggle("hidden")
})



