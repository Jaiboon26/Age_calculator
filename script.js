const input_day = document.getElementById('input-day');
const input_month = document.getElementById('input-month');
const input_year = document.getElementById('input-year');
const button_cal = document.getElementById('button-cal');

const month30 = ['4', '6', '9', '11'];

const today = new Date();

button_cal.addEventListener('click', () => {
    if (!input_day.value || !input_month.value || !input_year.value) {
        checkemp();
    } else {
        if (
            input_day.value >= 32 ||
            input_day.value <= 0 ||
            input_month.value >= 13 ||
            input_month <= 0 ||
            input_year.value > today.getFullYear() ||
            input_year.value <= 0
        ) {
            checkvalue();
        } else {
            const isValidMonth30 = month30.includes(input_month.value);
            if (isValidMonth30 && (input_day.value >= 31 || input_day.value <= 0)) {
                showError(input_day, 'error-text', 'Must be a valid date');
                showError(input_month, 'error-text2', 'Must be a valid month');
                showError(input_year, 'error-text3', 'Must be in the past');
            } 
            else if ((input_month.value === '2' || input_month.value === '02') && input_day.value > 28) {
                showError(input_day, 'error-text', 'Must be a valid date');
                showError(input_month, 'error-text2', '');
                showError(input_year, 'error-text3', '');
            }
            else {
                clearError(input_day, 'error-text');
                clearError(input_month, 'error-text2');
                clearError(input_year, 'error-text3');
                compute(input_day.value, input_month.value, input_year.value);
            }
        }
    }
});

input_day.addEventListener('focus', () => {
    clearError(input_day, 'error-text');
});

input_month.addEventListener('focus', () => {
    clearError(input_month, 'error-text2');
});

input_year.addEventListener('focus', () => {
    clearError(input_year, 'error-text3');
});

function showError(input, errorTextId, errorMessage) {
    input.style.border = '1px solid red';
    document.getElementById(errorTextId).innerHTML = errorMessage;
    document.getElementById(errorTextId).style.display = 'block';
    input.previousElementSibling.style.color = 'red';
}

function clearError(input, errorTextId) {
    input.style.border = '';
    document.getElementById(errorTextId).style.display = 'none';
    input.previousElementSibling.style.color = '';
}

function checkvalue() {
    if (input_day.value >= 32 || input_day.value <= 0) {
        showError(input_day, 'error-text', 'Must be a valid day');
    }
    if (input_month.value >= 13 || input_month <= 0) {
        showError(input_month, 'error-text2', 'Must be a valid month');
    }
    if (input_year.value > today.getFullYear() || input_year.value <= 0) {
        showError(input_year, 'error-text3', 'Must be in the past');
    }
}

function checkemp() {
    if (!input_day.value) {
        showError(input_day, 'error-text', 'This field is required');
    } else {
        clearError(input_day, 'error-text');
    }

    if (!input_month.value) {
        showError(input_month, 'error-text2', 'This field is required');
    } else {
        clearError(input_month, 'error-text2');
    }

    if (!input_year.value) {
        showError(input_year, 'error-text3', 'This field is required');
    } else {
        clearError(input_year, 'error-text3');
    }
}

function compute(day, month, year) {
    const inputDate = new Date(year, month - 1, day);

    const today = new Date();

    const yearDiff = today.getFullYear() - inputDate.getFullYear();
    const monthDiff = today.getMonth() - inputDate.getMonth();
    const dayDiff = today.getDate() - inputDate.getDate();

    let yearResult = yearDiff;
    let monthResult = monthDiff;
    let dayResult = dayDiff;

    if (dayDiff < 0) {
        monthResult--;
        const daysInPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        dayResult = daysInPreviousMonth + dayDiff;
    }
    if (monthDiff < 0) {
        yearResult--;
        monthResult += 12;
    }

    document.getElementById('result-day').innerHTML = dayResult;
    document.getElementById('result-month').innerHTML = monthResult;
    document.getElementById('result-year').innerHTML = yearResult;

    console.log(`${yearResult} years, ${monthResult} months, ${dayResult} days`);
}