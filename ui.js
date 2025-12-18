function updateCategoryList(expensesList) {
    let categories = {};
    
    for (let i = 0; i < expensesList.length; i++) {
        let cat = expensesList[i].category;
        let amt = expensesList[i].amount;
        
        if (categories[cat]) {
            categories[cat] = categories[cat] + amt;
        } else {
            categories[cat] = amt;
        }
    }

    let listDiv = document.getElementById('category-list');
    listDiv.innerHTML = ''; 

    let keys = Object.keys(categories);
    
    if (keys.length === 0) {
        listDiv.innerHTML = '<p>No expenses found for this period.</p>';
        return;
    }

    for (let k = 0; k < keys.length; k++) {
        let categoryName = keys[k];
        let categoryTotal = categories[categoryName];
        
        let div = document.createElement('div');
        div.className = 'summary-item';
        div.innerHTML = '<span>' + categoryName + '</span> <strong>Rs. ' + categoryTotal.toFixed(2) + '</strong>';
        
        listDiv.appendChild(div);
    }
}


function renderExpenseList(expensesList) {
    let box = document.getElementById('expense-list');
    box.innerHTML = '';

    if (expensesList.length === 0) {
        box.innerHTML = '<p>No expenses added.</p>';
        return;
    }

    for (let i = 0; i < expensesList.length; i++) {
        let item = expensesList[i];

        let div = document.createElement('div');
        div.className = 'summary-item';

        let html = '';
        html += '<span>';
        html += item.desc + ' - ₹' + item.amount;
        html += '</span>';
        html += '<button class="edit-btn" data-id="' + item.id + '">Edit</button>';
        html += '<button class="delete-btn" data-id="' + item.id + '">Delete</button>';

        div.innerHTML = html;
        box.appendChild(div);
    }
}
