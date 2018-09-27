(function() {
    var currentPlayer = "player1";
    var gameOver = false;

    $(".column").on("click", function(e) {
        if (gameOver === true) {
            return;
        }
        var slotsInColumn = $(e.currentTarget).find(".slot");
        for (var i = 5; i >= 0; i--) {
            var slotHasPlayer1 = slotsInColumn.eq(i).hasClass("player1");
            var slotHasPlayer2 = slotsInColumn.eq(i).hasClass("player2");
            var slotIsFilled = slotHasPlayer1 || slotHasPlayer2;
            if (!slotIsFilled) {
                break;
            }
        }

        if (i >= 0) {
            slotsInColumn.eq(i).addClass(currentPlayer);
            if (checkGame()) {
                gameOver = true;
                $(".soccerField").addClass("won");
                if (currentPlayer === "player1") {
                    $(".gameOverMessageRed").addClass("show");
                    $(".restart").css({ display: "block" });
                } else {
                    $(".gameOverMessageYellow").addClass("show");
                    $(".restart").css({ display: "block" });
                }
            }
            var lengthPlayer1 = $(".player1").length;
            var lengthPlayer2 = $(".player2").length;
            if (lengthPlayer1 === 21 && lengthPlayer2 === 21) {
                $(".gameOverMessage").addClass("show");
                $(".restart").css({ display: "block" });
            }
            if (currentPlayer === "player1") {
                currentPlayer = "player2";
                $(".soccerField").removeClass("player1");
                $(".soccerField").addClass("player2");
            } else {
                currentPlayer = "player1";
                $(".soccerField").removeClass("player2");
                $(".soccerField").addClass("player1");
            }
        }
    });

    function getDisc(row, column) {
        var columnElement = $(".column").eq(column);
        var slotElement = columnElement.find(".slot").eq(row);

        if (slotElement.hasClass("player1")) {
            return 1;
        } else if (slotElement.hasClass("player2")) {
            return 2;
        } else {
            return 0;
        }
    }

    function markDisc(row, column) {
        var columnElement = $(".column").eq(column);
        var slotElement = columnElement.find(".slot").eq(row);
        slotElement.addClass("mark");
    }

    function checkDisc(slot1, slot2, slot3, slot4) {
        if (
            (slot1 === 1 && slot2 === 1 && slot3 === 1 && slot4 === 1) ||
            (slot1 === 2 && slot2 === 2 && slot3 === 2 && slot4 === 2)
        ) {
            return true;
        }
        return false;
    }

    function checkAndMarkDiscs(
        row1,
        column1,
        row2,
        column2,
        row3,
        column3,
        row4,
        column4
    ) {
        var slot1 = getDisc(row1, column1);
        var slot2 = getDisc(row2, column2);
        var slot3 = getDisc(row3, column3);
        var slot4 = getDisc(row4, column4);

        var fourDiscsFound = checkDisc(slot1, slot2, slot3, slot4);

        if (fourDiscsFound) {
            markDisc(row1, column1);
            markDisc(row2, column2);
            markDisc(row3, column3);
            markDisc(row4, column4);
        }
        return fourDiscsFound;
    }

    function checkDown(row, column) {
        if (row > 2) {
            return false;
        }
        return checkAndMarkDiscs(
            row,
            column,
            row + 1,
            column,
            row + 2,
            column,
            row + 3,
            column
        );
    }

    function checkRight(row, column) {
        if (column > 3) {
            return false;
        }
        return checkAndMarkDiscs(
            row,
            column,
            row,
            column + 1,
            row,
            column + 2,
            row,
            column + 3
        );
    }

    function checkDownRight(row, column) {
        if (column > 3 || row > 2) {
            return false;
        }
        return checkAndMarkDiscs(
            row,
            column,
            row + 1,
            column + 1,
            row + 2,
            column + 2,
            row + 3,
            column + 3
        );
    }

    function checkDownLeft(row, column) {
        if (column < 3 || row > 2) {
            return false;
        }
        return checkAndMarkDiscs(
            row,
            column,
            row + 1,
            column - 1,
            row + 2,
            column - 2,
            row + 3,
            column - 3
        );
    }

    function checkSlots(row, column) {
        if (
            checkDown(row, column) ||
            checkRight(row, column) ||
            checkDownLeft(row, column) ||
            checkDownRight(row, column)
        ) {
            return true;
        }
        return false;
    }

    function checkGame() {
        for (var row = 0; row <= 5; row++) {
            for (var column = 0; column <= 6; column++) {
                if (checkSlots(row, column)) {
                    return true;
                }
            }
        }
        return false;
    }

    $(".restart").on("click", function() {
        $(".slot").removeClass("player1");
        $(".slot").removeClass("player2");
        $(".slot").removeClass("mark");
        $(".soccerField").removeClass("won");
        $(".gameOverMessageYellow").removeClass("show");
        $(".gameOverMessageRed").removeClass("show");
        $(".gameOverMessage").removeClass("show");
        $(".restart").css({ display: "none" });
        $(".soccerField").removeClass("player2");
        $(".soccerField").addClass("player1");
        gameOver = false;
        currentPlayer = "player1";
    });
})();
