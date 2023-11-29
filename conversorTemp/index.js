const selection1 = document.getElementById('c1');
const selection2 = document.getElementById('c2');

const value1 = document.getElementById('valueC1');
const value2 = document.getElementById('valueC2');

const units = {
    'K': 'Kelvin',
    'F': 'Fahrenheit',
    'C': 'Celsius'
};

let selectedUnits = [null, null];

let options = `<option selected disabled value="">Select a Unit</option>
`;
for (const key in units) {
    const value = units[key];

    options += `<option value="${key}">${value}</option>
`;
}
selection1.innerHTML = options;
selection2.innerHTML = options;

function selected(e, id) {
    selectedUnits[id] = e.value; 
    if(selectedUnits[0] && selectedUnits[1])
        convert();
}

function convert(){

    if(value1.value === ''){
        value2.innerHTML = value1.value;
        return;
    }

    if(selectedUnits[0] === 'K'){
        if(selectedUnits[1] === 'F'){
            value2.innerHTML = ((Number(value1.value)-273.15)*9/5 + 32).toFixed(3);
            return;
        }
        if(selectedUnits[1] === 'C'){
            value2.innerHTML = (Number(value1.value)-273.15).toFixed(3);
            return;
        }
    }

    if(selectedUnits[0] === 'F'){
        if(selectedUnits[1] === 'K'){
            value2.innerHTML = ((Number(value1.value)-32)*5/9 + 273.15).toFixed(3);
            return;
        }
        if(selectedUnits[1] === 'C'){
            value2.innerHTML = ((Number(value1.value) - 32) * 5/9).toFixed(3);
            return;
        }
    }

    if(selectedUnits[0] === 'C'){
        if(selectedUnits[1] === 'K'){
            value2.innerHTML = (Number(value1.value)+273.15).toFixed(3);
            return;
        }
        if(selectedUnits[1] === 'F'){
            value2.innerHTML = ((Number(value1.value) * 9/5) + 32).toFixed(3);
            return;
        }
    }

    value2.innerHTML = value1.value;
}

selection1.addEventListener('change', (e) => { selected(e.target, 0); });
selection2.addEventListener('change', (e) => { selected(e.target, 1); });

value1.addEventListener('change', (e) => {
    if(selectedUnits[0] && selectedUnits[1])
        convert();
    });