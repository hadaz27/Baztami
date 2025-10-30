const popup_add = document.getElementById("add_popup")
const open_btn = document.getElementById("add_button")
const close_btn = document.getElementById("close_button")
const add_income_btn = document.getElementById("add_income_button")
const log_container = document.getElementById("transaction_container")
const show_all_btn = document.getElementById("show_all_button")
const show_all_close_btn = document.getElementById("show_all_close_button")
const popup_show = document.getElementById("show_all_popup")
const all_logs_container = document.getElementById("all_transactions_log")
// log_container.innerHTML = ""
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let editIndex = null;
let totalIncome = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
document.getElementById("solde_positif").innerText = "+" + totalIncome + "DH";
// show_all_popup.addEventListener("click",() => {
//     event.preventDefault()

// })
function displayLog() {
    log_container.innerHTML = "";
    transactions.slice(-3).reverse().forEach((transaction, i) => {
        // Calcule l'index réel par rapport au tableau original
        let idx = transactions.length - 1 - i;
        const div = document.createElement("div");
        div.className = "row-span-1 bg-[#02D302] border-2 border-white rounded-lg w-3/4 h-16 text-xl";
        div.innerHTML = `
    <div class="grid grid-cols-4 w-full">
        <div class="col-span-1 flex flex-col justify-center">
            <p class="text-black">Le ${transaction.date}</p>
            <p class="font-bold">+${transaction.amount}DH</p>
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
`;
        ;
        log_container.appendChild(div);
    });
}

function edit_delete_buttons() {
    const edit_btn = event.target.closest(".edit_button")
    const delete_btn = event.target.closest(".delete_button")
    if (edit_btn) {
        let idx = Number(edit_btn.dataset.index)
        editIndex = idx
        document.getElementById("description").value = transactions[idx].description
        document.getElementById("amount").value = transactions[idx].amount
        document.getElementById("date").value = transactions[idx].date
        popup_add.classList.remove("hidden")
        return
    }
    if (delete_btn) {
        let idx = Number(delete_btn.dataset.index)
        transactions.splice(idx, 1)
        localStorage.setItem("transactions", JSON.stringify(transactions))
        let totalIncome = transactions.reduce((sum, t) => sum + Number(t.amount), 0)
        document.getElementById("solde_positif").innerText = "+" + totalIncome + "DH"
        localStorage.setItem("totalIncome", totalIncome)
        displayLog()
        return
    }
}

displayLog()
log_container.addEventListener("click", edit_delete_buttons)
all_logs_container.addEventListener("click", edit_delete_buttons)

popup_add.addEventListener("submit", () => {
    event.preventDefault()
    let transaction = {
        description: document.getElementById("description").value,
        amount: document.getElementById("amount").value,
        date: document.getElementById("date").value
    }
    transactions.push(transaction)
    displayLog()
    localStorage.setItem("transactions", JSON.stringify(transactions));
    let totalIncome = transactions.reduce((sum, t) => sum + Number(t.amount), 0)
    document.getElementById("solde_positif").innerText = "+" + totalIncome + "DH"
    localStorage.setItem("totalIncome", totalIncome)
    displayLog()
})

open_btn.addEventListener("click", () => {
    popup_add.classList.remove("hidden")
})

close_btn.addEventListener("click", () => {
    popup_add.classList.add("hidden")
    event.preventDefault()
})
show_all_close_btn.addEventListener("click", () => {
    popup_show.classList.add("hidden")
    event.preventDefault()
})
show_all_btn.addEventListener("click", () => {
    popup_show.classList.remove("hidden")
    event.preventDefault()
    all_logs_container.innerHTML = ""
    transactions.slice().reverse().forEach((transaction, i) => {
        // Calcul de l'index réel dans le tableau principal
        let idx = transactions.length - 1 - i;
        const div = document.createElement("div");
        div.className = "bg-[#02D302] border-2 border-white rounded-lg w-3/4 h-16 text-xl";
        div.innerHTML = `
    <div class="grid grid-cols-4 w-full">
        <div class="col-span-1 flex flex-col justify-center">
            <p class="text-black">Le ${transaction.date}</p>
            <p class="font-bold">+${transaction.amount}DH</p>
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
    popup_add.classList.remove("hidden")
})


