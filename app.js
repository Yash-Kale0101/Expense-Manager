function updateTotalDisplay(expensesList) {
    let total = 0;
    for (let i = 0; i < expensesList.length; i++) {
        total = total + expensesList[i].amount;
    }
    
    let display = document.getElementById('total-display');
    display.innerText = 'Rs. ' + total.toFixed(2);
}
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
        
        if(desc === "" || amount === "" || date === "") {
            alert("Please fill all fields");
            return;
        }

        addExpenseData(desc, amount, category, date);
        
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
    if (e.target.tagName === 'BUTTON') {
        let id = e.target.getAttribute('data-id');
        id = parseInt(id);

        deleteExpenseById(id);

        let month = document.getElementById('filter-month').value;
        let year = document.getElementById('filter-year').value;

        let updatedData = getFilteredData(month, year);

        updateTotalDisplay(updatedData);
        updateCategoryList(updatedData);
        renderCharts(updatedData);
        renderExpenseList(updatedData);
    }
});
});
