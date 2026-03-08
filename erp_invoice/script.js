
document.getElementById('invoiceDate').valueAsDate = new Date();
const nextMonth = new Date();
nextMonth.setDate(nextMonth.getDate() + 30);
document.getElementById('dueDate').valueAsDate = nextMonth;


addRow();

function addRow() {
    const tbody = document.getElementById('lineItemsBody');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td><input type="text" placeholder="Item description" class="desc"></td>
        <td><input type="number" value="1" min="1" class="qty" oninput="calculateTotals()"></td>
        <td><input type="number" value="0.00" min="0" step="0.01" class="price" oninput="calculateTotals()"></td>
        <td><input type="number" value="10" min="0" max="100" class="tax" oninput="calculateTotals()"></td>
        <td class="row-total">$0.00</td>
        <td><button class="btn btn-danger" onclick="removeRow(this)">×</button></td>
    `;
    tbody.appendChild(row);
}

function removeRow(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
    calculateTotals();
}

function calculateTotals() {
    const rows = document.querySelectorAll('#lineItemsBody tr');
    let subtotal = 0;

    rows.forEach(row => {
        const qty = parseFloat(row.querySelector('.qty').value) || 0;
        const price = parseFloat(row.querySelector('.price').value) || 0;
        const taxRate = parseFloat(row.querySelector('.tax').value) || 0;

        const rowTotal = qty * price;
        const taxAmount = rowTotal * (taxRate / 100);
        const finalRowTotal = rowTotal + taxAmount;

        row.querySelector('.row-total').textContent = formatCurrency(finalRowTotal);
        
        subtotal += finalRowTotal;
    });

    document.getElementById('subtotalDisplay').textContent = formatCurrency(subtotal);
    
    document.getElementById('taxDisplay').textContent = formatCurrency(subtotal - (subtotal / (1 + 0.10))); 
    document.getElementById('totalDisplay').textContent = formatCurrency(subtotal);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function generateInvoice() {
    
    const data = {
        invoiceId: document.querySelector('input[readonly]').value,
        date: document.getElementById('invoiceDate').value,
        customer: document.getElementById('customerSelect').value,
        items: []
    };

    document.querySelectorAll('#lineItemsBody tr').forEach(row => {
        data.items.push({
            desc: row.querySelector('.desc').value,
            qty: row.querySelector('.qty').value,
            price: row.querySelector('.price').value,
            total: row.querySelector('.row-total').textContent
        });
    });

    
    console.log("Invoice Data:", data);
    localStorage.setItem('currentInvoice', JSON.stringify(data));
    alert("Invoice saved! Check console for JSON data.");
    window.print();
}