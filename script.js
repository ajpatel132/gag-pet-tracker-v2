let items = [];

function renderItems() {
  const list = document.getElementById('item-list');
  list.innerHTML = '';

  items.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'item';

    const nameSpan = document.createElement('span');
    nameSpan.textContent = item.name + (item.checkedOut ? ` (Checked out by ${item.user})` : ' (Available)');

    const btn = document.createElement('button');
    btn.textContent = item.checkedOut ? 'Check In' : 'Check Out';
    btn.onclick = () => handleItem(index);

    div.appendChild(nameSpan);
    div.appendChild(btn);

    list.appendChild(div);
  });
}

function handleItem(index) {
  const item = items[index];

  if (item.checkedOut) {
    const code = prompt('Enter the 6-digit check-in code:');
    if (code === item.code) {
      alert(`Item "${item.name}" checked in successfully!`);
      item.checkedOut = false;
      item.user = null;
      item.code = null;
    } else {
      alert('Incorrect code. Item not checked in.');
    }
  } else {
    const user = prompt('Enter your name to check out:');
    if (!user) return;

    const code = generateCode();
    alert(`You have checked out "${item.name}". Your check-in code is: ${code}
Please save this code!`);

    item.checkedOut = true;
    item.user = user;
    item.code = code;
  }

  renderItems();
}

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit random code
}

function addItem() {
  const input = document.getElementById('newItemName');
  const name = input.value.trim();
  if (name === '') return;

  const password = prompt('Enter the add-item password:');
  if (password !== 'ajpatel') {
    alert('Incorrect password. Item not added.');
    return;
  }

  items.push({ name: name, checkedOut: false, user: null, code: null });
  input.value = '';
  renderItems();
}

renderItems();
