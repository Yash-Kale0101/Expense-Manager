let allExpenses = [];

function loadData() {
    let stored = localStorage.getItem('my_expenses_v1');
    if (stored) {
        allExpenses = JSON.parse(stored);
    } else {
        allExpenses = [];
    }
}

function saveData() {
    let stringData = JSON.stringify(allExpenses);
    localStorage.setItem('my_expenses_v1', stringData);
}

function addExpenseData(desc, amount, category, date) {
    let newExpense = {
        id: Date.now(),
        desc: desc,
        amount: parseFloat(amount),
        category: category,
        date: date
    };
    
    allExpenses.push(newExpense);
    saveData();
}

function getFilteredData(month, year) {
    let result = [];
    
    for (let i = 0; i < allExpenses.length; i++) {
        let item = allExpenses[i];
        let parts = item.date.split('-');
        let y = parts[0];
        let m = parts[1];

        if (month === 'all') {
            if (y === year) {
                result.push(item);
            }
        } else {
            if (y === year && m === month) {
                result.push(item);
            }
        }
    }

    return result;
}


function deleteExpenseById(id) {
    let newList = [];

    for (let i = 0; i < allExpenses.length; i++) {
        if (allExpenses[i].id !== id) {
            newList.push(allExpenses[i]);
        }
    }

    allExpenses = newList;
    saveData();
}
