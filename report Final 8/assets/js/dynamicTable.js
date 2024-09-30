
// let currentPage = 1;
// const rowsPerPage = 10;

function addRowT1() {
    const tableBody = document.querySelector('#dynamicTable1 tbody');
    const newRow = document.createElement('tr');
    
    newRow.innerHTML = `
        <td><input type="text"></td>
        <td><input type="text"></td>
        <td><input type="text"></td>
        <td><input type="text"></td>
        <td><input type="text"></td>
    `;
    
    tableBody.appendChild(newRow);
    //paginateTable();
    //calculateTotals();
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
    //paginateTable();
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

// function paginateTable() {
//     const rows = document.querySelectorAll('#dynamicTable tbody tr');
//     const totalRows = rows.length;
//     const totalPages = Math.ceil(totalRows / rowsPerPage);

//     rows.forEach((row, index) => {
//         row.style.display = (index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage) ? '' : 'none';
//     });

//     if (currentPage > totalPages) {
//         currentPage = totalPages;
//     }
// }

// function nextPage() {
//     const rows = document.querySelectorAll('#dynamicTable tbody tr').length;
//     const totalPages = Math.ceil(rows / rowsPerPage);
//     if (currentPage < totalPages) {
//         currentPage++;
//         paginateTable();
//     }
// }

// function previousPage() {
//     if (currentPage > 1) {
//         currentPage--;
//         paginateTable();
//     }
// }

// Initial call to show the first page
//paginateTable();
