const changeEnough = (change, amountDue) => {
  // always work in pennies so we don't get floating point errors
  const amountDueInPennies = amountDue * 100;

  // assume change comes in as [quarters, dimes, nickels, pennies]
  const quarter = 25;
  const dime = 10;
  const nickel = 5;
  const penny = 1;

  // add up all the change in my pocket, call it total
  let total = 0;

  for (let index = 0; index < change.length; index++) {
    let number = change[index];

    let totalPennies = 0;

    if (index === 0) {
      totalPennies = quarter * number;
    } else if (index === 1) {
      totalPennies = dime * number;
    } else if (index === 2) {
      totalPennies = nickel * number;
    } else if (index === 3) {
      totalPennies = penny * number;
    }

    total += totalPennies;
  }

  // compare to the amountDue
  return total >= amountDueInPennies;
};

document.addEventListener("DOMContentLoaded", () => {
  const quarters = document.querySelector("input[name=quarters]");
  const dimes = document.querySelector("input[name=dimes]");
  const nickels = document.querySelector("input[name=nickels]");
  const pennies = document.querySelector("input[name=pennies]");

  const cost = document.querySelector("input[name=cost]");

  const button = document.querySelector("button");

  const affordable = document.querySelector("#affordable");

  button.addEventListener("click", () => {
    const pocket = [
      +quarters.value,
      +dimes.value,
      +nickels.value,
      +pennies.value
    ];

    let result = changeEnough(pocket, +cost.value);
    console.log(pocket, result);

    if (result) {
      affordable.innerText = "Yes!";
    } else {
      affordable.innerText = "No :(";
    }
  });
});
