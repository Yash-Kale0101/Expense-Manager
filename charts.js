let myPieChart = null;
let myBarChart = null;

function renderCharts(expensesList) {
    let foodTotal = 0;
let transportTotal = 0;
let entertainmentTotal = 0;
let shoppingTotal = 0;
let billsTotal = 0;
let otherTotal = 0;

for (let i = 0; i < expensesList.length; i++) {
    let item = expensesList[i];

    if (item.category === 'Food') foodTotal += item.amount;
    else if (item.category === 'Transport') transportTotal += item.amount;
    else if (item.category === 'Entertainment') entertainmentTotal += item.amount;
    else if (item.category === 'Shopping') shoppingTotal += item.amount;
    else if (item.category === 'Bills') billsTotal += item.amount;
    else otherTotal += item.amount;
}

let categories = ['Food','Transport','Entertainment','Shopping','Bills','Other'];
let dataValues = [
    foodTotal,
    transportTotal,
    entertainmentTotal,
    shoppingTotal,
    billsTotal,
    otherTotal
];

    let ctxPie = document.getElementById('pieChart').getContext('2d');
    let ctxBar = document.getElementById('barChart').getContext('2d');

    if (myPieChart) {
        myPieChart.destroy();
    }
    if (myBarChart) {
        myBarChart.destroy();
    }

    myPieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: dataValues,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    myBarChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Amount Spent',
                data: dataValues,
                backgroundColor: '#36A2EB'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
