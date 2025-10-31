const popup_add_income = document.getElementById("add_income_popup")
const popup_add_expense = document.getElementById("add_expense_popup")
const expense_btn = document.getElementById("add_expense_button")
const close_btn_expense = document.getElementById("close_button_expense")
const popup_edit = document.getElementById("edit_popup")
const close_btn = document.getElementById("close_button")
const close_btn_edit = document.getElementById("close_button_edit")
const add_income_btn = document.getElementById("add_income_button")
const log_container = document.getElementById("transaction_container")
const show_all_btn = document.getElementById("show_all_button")
const show_all_close_btn = document.getElementById("show_all_close_button")
const popup_show = document.getElementById("show_all_popup")
const all_logs_container = document.getElementById("all_transactions_log")

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let editIndex = null;
update_balances()
function display_log() {
    log_container.innerHTML = "";
    transactions.slice(-3).reverse().forEach((transaction, i) => {
        // Calcule l'index réel par rapport au tableau original
        let idx = transactions.length - 1 - i;
        let color = transaction.type === "income" ? "#02D302" : "#FF4E4E";
        let sign = transaction.type === "income" ? "+" : "-";
        const div = document.createElement("div");
        div.style.backgroundColor = color;
        div.className = `row-span-1 border-2 border-white rounded-lg w-3/4 h-16 text-xl`
        div.innerHTML = `
    <div class="grid grid-cols-4 w-full">
        <div class="col-span-1 flex flex-col justify-center">
            <p class="text-black">Le ${transaction.date}</p>
            <p class="font-bold">${sign}${transaction.amount}DH</p>
        </div>
        <div class="col-span-2 flex flex-col justify-center">
            <p class="text-black">Description :</p>
            <p id="log_description">${transaction.description}</p>
        </div>
        <div class="flex gap-4 justify-center items-center">
            <button class="edit_button" data-index="${idx}"><img class="w-10" src="images/edit.svg" alt="Edit"></button>
            <button class="delete_button" data-index="${idx}"><img class="w-10" src="images/trash.svg" alt="Trash"></button>
        </div>
    </div>
`
            ;
        log_container.appendChild(div);
    });
}
display_log()
function update_balances() {
    let total_income = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0);
    let total_expense = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);
    let balance = total_income - total_expense;

    document.getElementById("solde_positif").innerText = "+" + total_income + "DH";
    document.getElementById("solde_negatif").innerText = "-" + total_expense + "DH";
    document.getElementById("balance").innerText = balance + "DH";
    localStorage.setItem("total_income", total_income);
    localStorage.setItem("total_expense", total_expense);
    localStorage.setItem("balance", balance);
}
function edit_delete_buttons() {
    const edit_btn = event.target.closest(".edit_button")
    const delete_btn = event.target.closest(".delete_button")
    if (edit_btn) {
        let idx = Number(edit_btn.dataset.index)
        editIndex = idx
        document.getElementById("edit_description").value = transactions[idx].description
        document.getElementById("edit_amount").value = transactions[idx].amount
        document.getElementById("edit_date").value = transactions[idx].date
        popup_edit.classList.remove("hidden")
        return
    }
    if (delete_btn) {
        let idx = Number(delete_btn.dataset.index)
        transactions.splice(idx, 1)
        localStorage.setItem("transactions", JSON.stringify(transactions))
        update_balances()
        display_log()
        return
    }
}
popup_edit.addEventListener("submit", (event) => {
    event.preventDefault()
    let transaction = {
        description: document.getElementById("edit_description").value,
        amount: document.getElementById("edit_amount").value,
        date: document.getElementById("edit_date").value,
        type: transactions[editIndex].type

    }
    transactions[editIndex] = transaction
    localStorage.setItem("transactions", JSON.stringify(transactions))
    update_balances()
    display_log()
    popup_edit.classList.add("hidden")
    editIndex = null
})

popup_add_income.addEventListener("submit", (event) => {
    event.preventDefault()
    let transaction = {
        description: document.getElementById("description").value,
        amount: document.getElementById("amount").value,
        date: document.getElementById("date").value,
        type: "income"
    }
    transactions.push(transaction)
    localStorage.setItem("transactions", JSON.stringify(transactions));
    update_balances()
    display_log()
})

popup_add_expense.addEventListener("submit", (event) => {
    event.preventDefault()
    let transaction = {
        description: document.getElementById("expense_description").value,
        amount: document.getElementById("expense_amount").value,
        date: document.getElementById("expense_date").value,
        type: "expense"
    }
    transactions.push(transaction)
    update_balances()
    display_log()

})

close_btn.addEventListener("click", (event) => {
    popup_add_income.classList.add("hidden")
    event.preventDefault()
})
close_btn_edit.addEventListener("click", (event) => {
    popup_edit.classList.add("hidden")
})
show_all_close_btn.addEventListener("click", (event) => {
    popup_show.classList.add("hidden")
    event.preventDefault()
})

show_all_btn.addEventListener("click", (event) => {
    popup_show.classList.remove("hidden")
    event.preventDefault()
    all_logs_container.innerHTML = ""
    transactions.slice().reverse().forEach((transaction, i) => {
        // Calcul de l'index réel dans le tableau principal
        let idx = transactions.length - 1 - i;
        let sign = transaction.type === "income" ? "+" : "-";
        const div = document.createElement("div")
        let color = transaction.type === "income" ? "#02D302" : "#FF4E4E"
        div.style.backgroundColor = color
        div.className = "border-2 border-white rounded-lg w-3/4 h-16 text-xl"
        div.innerHTML = `
    <div class="grid grid-cols-4 w-full">
        <div class="col-span-1 flex flex-col justify-center">
            <p class="text-black">Le ${transaction.date}</p>
            <p class="font-bold">${sign}${transaction.amount}DH</p>
        </div>
        <div class="col-span-2 flex flex-col justify-center">
            <p class="text-black">Description :</p>
            <p id="log_description">${transaction.description}</p>
        </div>
        <div class="flex gap-4 justify-center items-center">
            <button class="edit_button" data-index="${idx}"><img class="w-10" src="images/edit.svg" alt="Edit"></button>
            <button class="delete_button" data-index="${idx}"><img class="w-10" src="images/trash.svg" alt="Trash"></button>
        </div>
    </div>
`

        all_logs_container.appendChild(div);
    })

})
add_income_btn.addEventListener("click", () => {
    popup_add_income.classList.remove("hidden")
})
expense_btn.addEventListener("click", () => {
    popup_add_expense.classList.remove("hidden")
})
close_btn_expense.addEventListener("click", (event) => {
    popup_add_expense.classList.add("hidden");
    event.preventDefault();
})

document.addEventListener("click", function (event) {
    if (event.target.closest(".edit_button") || event.target.closest(".delete_button")) {
        edit_delete_buttons(event);
    }
})

