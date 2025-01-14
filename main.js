const btn = document.querySelector('.btn');
const nametov = document.querySelector('#nametov');
const amount = document.querySelector('#amount');
const date = document.querySelector('#date');
const transactions = document.querySelector('.transactions');
const totalBalance = document.querySelector('#total-balance');
const expence = document.querySelector('#expence');
const income = document.querySelector('#income');
const incomeBtn = document.getElementById('income-btn');
const expenceBtn = document.getElementById('expence-btn');
const close = document.querySelector('close');

let transactionType = '';
let totalIncome = 0;
let totalExpense = 0;

incomeBtn.addEventListener('click', () => {
    transactionType = 'income';
    incomeBtn.style.backgroundColor = 'rgb(179, 249, 194)';
    expenceBtn.style.backgroundColor = '';
});

expenceBtn.addEventListener('click', () => {
    transactionType = 'expence';
    expenceBtn.style.backgroundColor = 'rgb(179, 249, 194)';
    incomeBtn.style.backgroundColor = '';
});

date.setAttribute('max', new Date().toISOString().split('T')[0]);

btn.addEventListener('click', () => {
    if (!nametov.value || !amount.value || !date.value) {
        alert('Please fill in all fields!');
        return;
    }

    if(nametov.value.length <= 2){
        alert('string must be more than 2 symbols');
        return;
    }

    if (!/^\d+(\.\d+)?$/.test(amount.value)) {
        alert('You need to write only numbers');
        return;
    }

    const selectedDate = new Date(date.value);
    const currentDate = new Date();

    if(selectedDate > currentDate){
        alert('you can\'t choose future date');
        return;
    }

    const currentBalance = parseFloat(totalBalance.textContent.replace('$', ''));
    const transactionAmount = parseFloat(amount.value);

    if(transactionType === 'expence' && (currentBalance === 0 || transactionAmount > currentBalance)){
        alert('you have not money on balance for this transaction!');
        return;
    }

    if(!isNaN(transactionAmount) && transactionAmount > 0){
        if(transactionType === 'expence'){
            transactions.innerHTML += 
            `<div class="transactions-block">
                <h5 class="transactions-block-title">${nametov.value}</h5>
                <span class="date">${date.value}</span>
                <p class="transactions-block-suma" style="color: red">-$${transactionAmount}</p>
            </div>`;
            totalExpense += transactionAmount;
            expence.textContent = `$${totalExpense.toFixed(2)}`;
        }else if(transactionType === 'income'){
            transactions.innerHTML += 
           `<div class="transactions-block">
                <h5 class="transactions-block-title">${nametov.value}</h5>
                <span class="date">${date.value}</span>
                <p class="transactions-block-suma" style="color: green">+$${transactionAmount}</p>
            </div>`;
            totalIncome += transactionAmount;
            income.textContent = `$${totalIncome.toFixed(2)}`;
        }
        
        const newBalance = currentBalance + (transactionType === 'expence' ? -transactionAmount : transactionAmount);
        totalBalance.textContent = `$${newBalance.toFixed(2)}`;
    }
   
    if(transactionType === ''){
        alert('choose type of transaction!');
        return;
    }

    nametov.value = '';
    date.value = '';
    amount.value = '';
});