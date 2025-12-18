function updateTotalDisplay(expensesList) {
    let total = 0;
    for (let i = 0; i < expensesList.length; i++) {
        total = total + expensesList[i].amount;
    }
    
    let display = document.getElementById('total-display');
    display.innerText = 'Rs. ' + total.toFixed(2);
}
let editingExpenseId = null;
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    
    let currentData = getFilteredData('all', '2025');
    
    updateTotalDisplay(currentData);
    updateCategoryList(currentData);
    renderCharts(currentData);
    renderExpenseList(currentData);

    let form = document.getElementById('expense-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let desc = document.getElementById('desc').value;
        let amount = document.getElementById('amount').value;
        let category = document.getElementById('category').value;
        let date = document.getElementById('date').value;
        
        if (desc.trim() === "") {
    alert("Description cannot be empty");
    return;
}

if (amount === "" || isNaN(amount) || Number(amount) <= 0) {
    alert("Please enter a valid amount greater than 0");
    return;
}

if (category === "") {
    alert("Please select a category");
    return;
}

if (date === "") {
    alert("Please select a date");
    return;
}

        if (editingExpenseId === null) {
    addExpenseData(desc, amount, category, date);
} else {
    for (let i = 0; i < allExpenses.length; i++) {
        if (allExpenses[i].id === editingExpenseId) {
            allExpenses[i].desc = desc;
            allExpenses[i].amount = parseFloat(amount);
            allExpenses[i].category = category;
            allExpenses[i].date = date;
            break;
        }
    }
    saveData();
    editingExpenseId = null;
    document.getElementById('add-btn').innerText = 'Add Expense';
        }
        
        form.reset();
        
        let monthFilter = document.getElementById('filter-month').value;
        let yearFilter = document.getElementById('filter-year').value;
        
        let newData = getFilteredData(monthFilter, yearFilter);
        
        updateTotalDisplay(newData);
        updateCategoryList(newData);
        renderCharts(newData);
        renderExpenseList(newData);
        
        alert("Expense Added!");
    });

    let filterBtn = document.getElementById('filter-btn');
    
    filterBtn.addEventListener('click', function() {
        let month = document.getElementById('filter-month').value;
        let year = document.getElementById('filter-year').value;
        
        let filtered = getFilteredData(month, year);
        
        updateTotalDisplay(filtered);
        updateCategoryList(filtered);
        renderCharts(filtered);
        renderExpenseList(filtered);
    });
    document.getElementById('expense-list').addEventListener('click', function(e) {

    if (e.target.className === 'delete-btn') {
        let id = parseInt(e.target.getAttribute('data-id'));

        deleteExpenseById(id);

        let month = document.getElementById('filter-month').value;
        let year = document.getElementById('filter-year').value;

        let updatedData = getFilteredData(month, year);

        updateTotalDisplay(updatedData);
        updateCategoryList(updatedData);
        renderCharts(updatedData);
        renderExpenseList(updatedData);
    }

    if (e.target.className === 'edit-btn') {
        let id = parseInt(e.target.getAttribute('data-id'));
        editingExpenseId = id;

        for (let i = 0; i < allExpenses.length; i++) {
            if (allExpenses[i].id === id) {
                document.getElementById('desc').value = allExpenses[i].desc;
                document.getElementById('amount').value = allExpenses[i].amount;
                document.getElementById('category').value = allExpenses[i].category;
                document.getElementById('date').value = allExpenses[i].date;
                break;
            }
        }

        document.getElementById('add-btn').innerText = 'Update Expense';
    }

});
});
