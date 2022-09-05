function initializeTheGame() {
  const ceils = document.querySelectorAll(".row div");
  let gameover = false;
  let COMPUTER = true;
  let computerTurn = false;
  let X_OR_O = false;
  let level = "hard";
  const winnerContainer = document.querySelector(".winner");
  const unplayed = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const WIN_COMPONATIONS = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  ceils.forEach((ceil) => {
    ceil.addEventListener("click", handleClick);
  });

  const hard = () => {
    let thenumber = [];
    let winCeil = [];
    WIN_COMPONATIONS.map((value) => {
      value.map((a, b) => {
        const result = [];
        result.push(
          value[b],
          value[b + 1 == value.length ? 0 : b + 1],
          value[b == 0 ? 2 : b == 2 ? 1 : 0]
        );
        if (
          document.querySelector(`[data-number="${result[0]}"]`).dataset
            .type === "O" &&
          document.querySelector(`[data-number="${result[1]}"]`).dataset
            .type === "O" &&
          !document.querySelector(`[data-number="${result[2]}"]`).dataset.type
        ) {
          winCeil.push(result[2]);
        }
      });
    });

    WIN_COMPONATIONS.map((value) => {
      value.map((a, b) => {
        const result = [];
        result.push(
          value[b],
          value[b + 1 == value.length ? 0 : b + 1],
          value[b == 0 ? 2 : b == 2 ? 1 : 0]
        );
        if (
          document.querySelector(`[data-number="${result[0]}"]`).dataset
            .type === "X" &&
          document.querySelector(`[data-number="${result[1]}"]`).dataset
            .type === "X" &&
          !document.querySelector(`[data-number="${result[2]}"]`).dataset.type
        ) {
          thenumber.push(result[2]);
        }
      });
    });
    return winCeil.length > 0 ? winCeil : thenumber;
  };

  const changeType = () => {
    X_OR_O = !X_OR_O;
    return X_OR_O ? "X" : "O";
  };

  const winner = (type) => {
    return WIN_COMPONATIONS.some((componation) => {
      return componation.every(
        (value) =>
          document.querySelector(`[data-number="${value}"]`).dataset.type ==
          type
      );
    });
  };

  function handleClick(e, event) {
    if (!gameover) {
      const target = event ? e : e.target;

      if (COMPUTER) {
        if (!computerTurn) {
          enterValue(target);
          computerTurn = true;

          setTimeout(() => {
            computerFun();
            computerTurn = false;
          }, 500);
        }
      } else {
        enterValue(target);
      }
    }
  }

  const enterValue = (target) => {
    const type = changeType();
    target.textContent = type;
    target.dataset.type = type;
    unplayed.splice(unplayed.indexOf(+target.dataset.number), 1);

    if (winner(type)) {
      gameover = true;
      winnerContainer.style.display = "flex";
      winnerContainer.querySelector("p").innerText = type;
      winnerContainer.querySelector("button").addEventListener("click", () => {
        winnerContainer.style.display = "none";
        location.reload();
      });
    }
    target.removeEventListener("click", handleClick);
  };

  const computerFun = (type) => {
    let ceil;
    ceil = unplayed[Math.floor(Math.random() * unplayed.length)];
    if (level === "easy") {
    } else {
      const theValue = hard();
      ceil = theValue.length > 0 ? theValue[0] : ceil;
    }
    const target = document.querySelector(`[data-number="${ceil}"]`);
    enterValue(target, type);
  };
}

document.addEventListener("DOMContentLoaded", () => {
  initializeTheGame();
});
