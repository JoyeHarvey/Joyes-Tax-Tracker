document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("entry-form");
  const tableBody = document.getElementById("entries-body");
  const balanceDisplay = document.getElementById("balance");
  const amountInput = document.getElementById("amount");
  const beginningBalanceInput = document.getElementById("beginning-balance");

  let entries = [];
  let beginningBalance = 0;

  // Load from local storage
  if (localStorage.getItem("entries")) {
    entries = JSON.parse(localStorage.getItem("entries"));
    beginningBalance = parseFloat(localStorage.getItem("beginningBalance")) || 0;
    beginningBalanceInput.value = beginningBalance.toFixed(2);
    updateTable();
    updateBalance();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;
    const amount = parseFloat(amountInput.value);
    const category = document.getElementById("category").value;

    if (!isNaN(amount)) {
      entries.push({ date, description, amount, category });
      localStorage.setItem("entries", JSON.stringify(entries));
      updateTable();
      updateBalance();
      form.reset();
      document.getElementById("date").focus();
    }
  });

  beginningBalanceInput.addEventListener("change", function () {
    beginningBalance = parseFloat(beginningBalanceInput.value) || 0;
    localStorage.setItem("beginningBalance", beginningBalance);
    updateBalance();
  });

  function updateTable() {
    tableBody.innerHTML = "";
    entries.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.date}</td>
        <td>${entry.description}</td>
        <td>${entry.category}</td>
        <td>$${entry.amount.toFixed(2)}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  function updateBalance() {
    const total = entries.reduce((sum, entry) => sum + entry.amount, 0);
    const finalBalance = beginningBalance + total;
    balanceDisplay.textContent = finalBalance.toFixed(2);
  }
});
