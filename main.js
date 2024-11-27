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
    }

    if(amount.value != /^\d+$/){
        alert('you need to write only numbers');
    }

    const selectedDate = new Date(date.value);
    const currentDate = new Date();

    if(selectedDate > currentDate){
        alert('you can\'t choose future date');
        return;
    }

    const currentBalance = parseFloat(totalBalance.textContent.replace('$', ''));
    const expenceAmount = parseFloat(amount.value);
    const incomeAmount = parseFloat(amount.value);
    const currentExpence = parseFloat(expence.textContent.replace('$', ''));
    const currentIncome = parseFloat(income.textContent.replace('$', ''));


    if(!isNaN(expenceAmount) && expenceAmount > 0){

        if(transactionType === 'expence'){
            transactions.innerHTML += 
            `<div class="transactions-block">
                <h5 class="transactions-block-title">${nametov.value}</h5>
                <span class="date">${date.value}</span>
                <p class="transactions-block-suma" style="color: red">-$${amount.value}</p>
            </div>`
            ;
            const newExpence = currentExpence + expenceAmount;
            expence.textContent = `$${newExpence}`;


        }else if(transactionType === 'income'){
            transactions.innerHTML += 
           `<div class="transactions-block">
                <h5 class="transactions-block-title">${nametov.value}</h5>
                <span class="date">${date.value}</span>
                <p class="transactions-block-suma" style="color: green">+$${amount.value}>\u00d7</span></p>
                
            </div>`
            ; 
            
            const newIncome = currentIncome + incomeAmount;
            income.textContent = `$${newIncome}`;
        }
        
        const newBalance = transactionType === 'expence'
                            ? currentBalance - expenceAmount
                            : currentBalance + expenceAmount;

        totalBalance.textContent = `$${newBalance}`;
    }
   
    

    nametov.value = '';
    date.value = '';
    amount.value = '';


});


