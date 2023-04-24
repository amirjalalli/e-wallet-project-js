
showTotalIncome()
showTotalExpens()
showTotalBalance()

function getFormattedTime() {
  const now = new Date().toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  console.log(now);
  const date = now.split(",")[0].split(" ");
  const time = now.split(",")[1];
  return `${date[1]} ${date[0]},${time}`;
}

document.querySelector(".form-wallet").addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("done");
  const time = getFormattedTime();
  const type = document.querySelector(".select-box").value;
  const desc = document.querySelector(".input-text").value;
  const value = document.querySelector(".input-number").value;
  if (desc.length > 0 && value.length > 0) {
    addItems(type, desc, value);
    resetForm();
  }

  const collection = document.querySelector(".content-product");
  collection.insertAdjacentHTML("afterbegin", newHtml);

  additemsFromLS(type, desc, value, time);
});
showItems();
function showItems() {
  const data = getItemsFromLS();
  const collection = document.querySelector(".content-product");

  const newHtml = data?.map((item) => {
    console.log(item);
    return ` <div class="choese-product">
                <div class="product-name">
                    <h2>${item?.desc}</h2>
                    <span>${item?.time}</span>
              </div>
              <div class="price">
                <p class=${
                  item?.type === "+" ? "income-price" : "expenses-price"
                }>${item?.type}$${sep(item?.value)}</p>
              </div>
            </div>`;
  });

  collection.insertAdjacentHTML("afterbegin", newHtml);
}

function addItems(type, desc, value) {
  const time = getFormattedTime();

  const newHtml = `
    <div class="choese-product">
        <div class="product-name">
            <h2>${desc}</h2>
            <span>${time}</span>
        </div>
        <div class="price">
            <p class=${
              type === "+" ? "income-price" : "expenses-price"
            }>${type}$${sep(value)}</p>
        </div>
    </div>
`;


const collection = document.querySelector(".content-product");
collection.insertAdjacentHTML("afterbegin", newHtml);
additemsFromLS(type, desc,value, time)

showTotalIncome()
showTotalExpens()
showTotalBalance()

}
function resetForm() {
  document.querySelector(".select-box").value = "+";
  document.querySelector(".input-text").value = "";
  document.querySelector(".input-number").value = "";
}

function additemsFromLS(type, desc, value, time) {
  let items = getItemsFromLS();
  items.push({
    desc,
    time,
    type,
    value,
  });

  localStorage.setItem("items", JSON.stringify(items));
}
function getItemsFromLS() {
  let items = localStorage.getItem("items");
  console.log(items);
  if (items) {
    items = JSON.parse(items);
    console.log("items", items);
  } else {
    items = [];
    console.log("array", items);
  }
  return items;
}

function showTotalIncome() {
  let items = getItemsFromLS();
  let totalInCome = 0;
  for (let item of items) {
    if (item.type === "+") {
      totalInCome += parseInt(item?.value);
    }
  }
  console.log(totalInCome);
  document.querySelector(".heder-incomes p").innerText = `${sep(totalInCome)}$`;
}

function showTotalExpens() {
  let items = getItemsFromLS();
  let totalExpens = 0;
  for (let item of items) {
    if (item?.type === "-") {
      totalExpens += parseInt(item?.value);
    }
  }
  document.querySelector(".heder-expenses p").innerText = `${sep(totalExpens)}$`;
  console.log("totalExpens", totalExpens);
}

function showTotalBalance () {
  let items = getItemsFromLS()
  let balance = 0
  for(let item of items) {
    if(item?.type === "+") {
      balance += parseInt(item?.value)
    }else {
      balance -= parseInt(item?.value)
    }
  }
  document.querySelector(".total-header h3").innerText = sep(balance)
}

function sep (amount) {
  amount = parseInt(amount)
  return amount.toLocaleString()
}