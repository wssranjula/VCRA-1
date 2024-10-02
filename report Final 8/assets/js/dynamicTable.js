// Dynamic Table functions
function addRowT0() {
    const tableBody = document.querySelector('#dynamicTable tbody');
    const newRow = document.createElement('tr');
    
    newRow.innerHTML = `
        <td><input type="text"></td>
        <td><input type="text"></td>
        <td><input type="text"></td>
        <td><input type="text"></td>
        <td><input type="text"></td>
        <td><input type="text"></td>
        <td><input type="text"></td>
    `;
    
    tableBody.appendChild(newRow);
}

function addRowT1() {
    const tableBody = document.querySelector('#dynamicTable1 tbody');
    const newRow = document.createElement('tr');
    
    newRow.innerHTML = `
        <td><input type="text"></td>
        <td><input type="text"></td>
        <td><input type="text"></td>
    `;
    
    tableBody.appendChild(newRow);
}

function addRowT2() {
    const tableBody = document.querySelector('#dynamicTable2 tbody');
    const newRow = document.createElement('tr');
    
    newRow.innerHTML = `
        <td><input type="text"></td>
        <td><input type="text" class="critical" oninput="calculateTotals()"></td>
        <td><input type="text" class="major" oninput="calculateTotals()"></td>
        <td><input type="text" class="minor" oninput="calculateTotals()"></td>
    `;
    
    tableBody.appendChild(newRow);
    calculateTotals();
}

function calculateTotals() {
    let criticalTotal = 0, majorTotal = 0, minorTotal = 0;
    
    document.querySelectorAll('.critical').forEach(input => {
        criticalTotal += Number(input.value) || 0;
    });
    document.querySelectorAll('.major').forEach(input => {
        majorTotal += Number(input.value) || 0;
    });
    document.querySelectorAll('.minor').forEach(input => {
        minorTotal += Number(input.value) || 0;
    });
    
    document.getElementById('criticalTotal').textContent = criticalTotal;
    document.getElementById('majorTotal').textContent = majorTotal;
    document.getElementById('minorTotal').textContent = minorTotal;
}