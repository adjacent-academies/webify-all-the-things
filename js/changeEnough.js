const changeEnough = {
  v1: (change, amountDue) => {
    // always work in pennies so we don't get floating point errors
    const amountDueInPennies = amountDue * 100;

    // assume change comes in as [quarters, dimes, nickels, pennies]
    const quarter = 25;
    const dime = 10;
    const nickel = 5;
    const penny = 1;
    const pennies = [quarter, dime, nickel, penny]; // v1

    // add up all the change in my pocket, call it total
    let total = 0;

    for (let index = 0; index < change.length; index++) {
      let number = change[index];
      let totalPennies = pennies[index] * number;
      total += totalPennies;
    }

    // compare to the amountDue
    return total >= amountDueInPennies;
  },
  v2: (change, amountDue) => {
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

      switch (index) {
        case 0:
          totalPennies = quarter * number;
          break;
        case 1:
          totalPennies = dime * number;
          break;
        case 2:
          totalPennies = nickel * number;
          break;
        case 3:
          totalPennies = penny * number;
          break;
      }

      total += totalPennies;
    }

    // compare to the amountDue
    return total >= amountDueInPennies;
  },
  v3: (change, amountDue) => {
    // always work in pennies so we don't get floating point errors
    const amountDueInPennies = amountDue * 100;

    // assume change comes in as [quarters, dimes, nickels, pennies]
    const quarter = 25;
    const dime = 10;
    const nickel = 5;
    const penny = 1;
    const pennies = [quarter, dime, nickel, penny]; // v1

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
  },
  v4: (change, amountDue) => {
    return (
      amountDue * 100 <=
      change[0] * 25 + change[1] * 10 + change[2] * 5 + change[3] * 1
    );
  },
  v5: (change, amountDue) => {
    const quarter = 25;
    const dime = 10;
    const nickel = 5;
    const penny = 1;
    const pennies = [quarter, dime, nickel, penny];

    let total = change.reduce(
      (acc, number, idx) => (acc += pennies[idx] * number),
      0
    );
    return total >= amountDue * 100;
  }
};

$(() => {
  const dom = {
    form: document.querySelector("form"),
    pocket: document.querySelector("#pocket"),
    check: document.querySelector("#check"),
    yes: document.querySelector("#yes"),
    no: document.querySelector("#no"),
    movie: document.querySelector("#movie"),
    cost: document.querySelector("#cost"),
  };

  pickRandomMovie(dom.movie, dom.cost);

  dom.check.addEventListener("click", () => {
    showProgress()
    let money = [];
    let cost = +dom.cost.innerText;

    for (const input of dom.form) {
      money.push(+input.value);
    }

    let result = changeEnough.v2(money, cost);

    if (result) {
      dom.no.style.display = "none";
      dom.yes.style.display = "block";
    } else {
      dom.yes.style.display = "none";
      dom.no.style.display = "block";
    }
  });
});

function showProgress(interval = 100) {
  const id = setInterval(() => {
    $("#progress").progress("increment");
    let progress = $("#progress").progress("get value");
    if (progress === 10) {
      clearInterval(id);
    }
  }, interval);
}

function pickRandomMovie(movie, cost) {
  // prettier-ignore
  const movies = {
    "Django Unchained"                          : "https://image.tmdb.org/t/p/w300_and_h450_bestv2/qUcmEqnzIwlwZxSyTf3WliSfAjJ.jpg",
    "Hellboy"                                   : "https://image.tmdb.org/t/p/w300_and_h450_bestv2/5BkSkNtfrnTuKOtTaZhl8avn4wU.jpg",
    "Men in Black"                              : "https://image.tmdb.org/t/p/w300_and_h450_bestv2/cITp4EM8HEKrlhXDEeGNy2IB8D9.jpg",
    "Shazam"                                    : "https://image.tmdb.org/t/p/w300_and_h450_bestv2/OIGX2lm5tmlCKvZUghtwHzoxxO.jpg",
    "Harry Potter and the Philospher's Stone"   : "https://image.tmdb.org/t/p/w300_and_h450_bestv2/hziiv14OpD73u9gAak4XDDfBKa2.jpg",
    "Thor: Ragnarok"                            : "https://image.tmdb.org/t/p/w300_and_h450_bestv2/kaIfm5ryEOwYg8mLbq8HkPuM1Fo.jpg"
  }

  let random = Math.floor(Math.random() * Object.keys(movies).length)

  console.log(movies[Object.keys(movies)[random]]);

  movie.src = movies[Object.keys(movies)[random]]
  cost.innerText = (Math.random() * 20.0).toFixed(2)

}
