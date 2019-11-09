// Rover Object
let rover = {
    direction: "N",
    x: 0,
    y: 0,
    travelLog: []
};
//Grid
let gridSize = {
    x: 10,
    y: 10
};
let totalObstacles = 15; // number of obstacles on the grid
let grid = [];
for (let i = 0; i < 10; i++) {
    grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}


//Funtcion puts random generated obstacles on the grid, but it is also checking if the place is empty. When there is no Rover and an no obsticle, function puts an obstacle ('#'). Othervise (if finds an rover and an obsticle) it doesn't put an obsticles, and i-=1 means that, then the function havs one more chance to try put an obsticle)
function addObstacles(grid, totalObstacles, gridSize) {
    for (let i = 1; i <= totalObstacles; i++) {
        let x = Math.floor(Math.random() * gridSize.x);
        let y = Math.floor(Math.random() * gridSize.y);
        if (!grid[x][y] || !grid[x][y] === '#') {
            grid[x][y] = '#';
        } else {
            i -= 1;
        }
    }
}
//Function is checking if rover has a collision with an obsticle. It returns TRUE when it finds '#' in array.
function checkCollision(grid, rover) {
    if (grid[rover.y][rover.x] === '#') {
        console.log('Collision with an obstacle! I can not move! Help me!');
        return true;
    } else
        return false;
}

// Turn Left, Turn Right functions based on its current direction. Printing a direction, x and y.
function turnLeft(rover) {
    console.log("<<< turn LEFT <<<");
    switch (rover.direction) {
        case "N":
            rover.direction = "W";
            break;
        case "W":
            rover.direction = "S";
            break;
        case "S":
            rover.direction = "E";
            break;
        case "E":
            rover.direction = "W";
            break;
    }
    console.log(`direction: '${rover.direction}', [ x:${rover.x}, y:${rover.y} ]`);
}

function turnRight(rover) {
    console.log(">>> turn RIGHT >>>");
    switch (rover.direction) {
        case "N":
            rover.direction = "E";
            break;
        case "E":
            rover.direction = "S";
            break;
        case "S":
            rover.direction = "W";
            break;
        case "W":
            rover.direction = "N";
            break;

    }
    console.log(`direction: '${rover.direction}', [ x:${rover.x}, y:${rover.y} ]`);
}

/*Move forward and backward functions based on its current direction. 
With checking if(1) rover doesn't go further that the 10x10 array
and if (2) there is collision with an obsticle it stops rover's moves (and show the previous position till rover can go further) On the first attempt I used simple: 
if (rover.y >= 0 && rover.y < 10) {
    rover.y++;
    if (checkCollision(grid, rover)) {
        rover.y = rover.y--;
    }
break;
On the end it is printing a direction, x and y.*/

function moveForward(rover) {
    console.log("--- move FORWARD ---");
    switch (rover.direction) {
        case "S":
            if (rover.y >= 0 && rover.y < 10) {
                let prevY = rover.y
                rover.y++;
                if (checkCollision(grid, rover)) {
                    rover.y = prevY;
                }
                break;
            } else {
                console.log("You can't place Rover outside of the board! Turn Rover l/r (left/right).");
                break;
            }
        case "N":
            if (rover.y > 0 && rover.y <= 10) {
                let prevY = rover.y
                rover.y--;
                if (checkCollision(grid, rover)) {
                    rover.y = prevY;
                }
                break;
            } else {
                console.log("You can't place Rover outside of the board! Turn Rover l/r (left/right).");
                break;
            }
        case "E":
            if (rover.x >= 0 && rover.x < 10) {
                let prevX = rover.x
                rover.x++;
                if (checkCollision(grid, rover)) {
                    rover.x = prevX;
                }
                break;
            } else {
                console.log("You can't place Rover outside of the board! Turn Rover l/r (left/right).");
                break;
            }
        case "W":
            if (rover.x > 0 && rover.x <= 10) {
                let prevX = rover.x
                rover.x--;
                if (checkCollision(grid, rover)) {
                    rover.x = prevX;
                }
                break;
            } else {
                console.log("You can't place Rover outside of the board! Turn Rover l/r (left/right).");
                break;
            }
    }
    console.log(`direction: '${rover.direction}', [ x:${rover.x}, y:${rover.y} ]`);
}

function moveBackward(rover) {
    console.log("--- move BACKWARD ---");
    switch (rover.direction) {
        case "S":
            if (rover.y > 0 && rover.y <= 10) {
                let prevY = rover.y
                rover.y--;
                if (checkCollision(grid, rover)) {
                    rover.y = prevY;
                }
                break;
            } else {
                console.log("You can't place Rover outside of the board! Turn Rover l/r (left/right).");
                break;
            }
        case "N":
            if (rover.y >= 0 && rover.y < 10) {
                let prevY = rover.y
                rover.y++;
                if (checkCollision(grid, rover)) {
                    rover.y = prevY;
                }
                break;
            } else {
                console.log("You can't place Rover outside of the board! Turn Rover l/r (left/right).");
                break;
            }
        case "E":
            if (rover.x > 0 && rover.x <= 10) {
                let prevX = rover.x
                rover.x--;
                if (checkCollision(grid, rover)) {
                    rover.x = prevX;
                }
                break;
            } else {
                console.log("You can't place Rover outside of the board! Turn Rover l/r (left/right).");
                break;
            }
        case "W":
            if (rover.x >= 0 && rover.x < 10) {
                let prevX = rover.x
                rover.x++;
                if (checkCollision(grid, rover)) {
                    rover.x = prevX;
                }
                break;
            } else {
                console.log("You can't place Rover outside of the board! Turn Rover l/r (left/right).");
                break;
            }
    }
    console.log(`direction: '${rover.direction}', [ x:${rover.x}, y:${rover.y} ]`);
}


//Function command taking orders: l (TURN left), r (TURN right), f (MOVE forward), b (MOVE backward) and only this orders!!!! Otherwise it prints an allert.
//Depending on the command (l/r/f/b) it using corresponding function from above.
//This function is also logging the next steps of rover and prints them all on the end, as a one row of informations.
function commands(rover, orders) {
    for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        if (order === "l" || order === "r" || order === "f" || order === "b") {
            switch (order) {
                case "l":
                    turnLeft(rover);
                    rover.travelLog.push(` (-- dir:${rover.direction} --)`);
                    break;
                case "r":
                    turnRight(rover);
                    rover.travelLog.push(` (-- dir:${rover.direction} --)`);
                    checkCollision(grid, rover);
                    break;
                case "f":
                    moveForward(rover);
                    rover.travelLog.push(` x:${rover.x}|y:${rover.y}`);
                    checkCollision(grid, rover);
                    break;
                case "b":
                    moveBackward(rover);
                    rover.travelLog.push(` x:${rover.x}|y:${rover.y}`);
                    break;
            }
        } else {
            console.log("Wrong command! Available commands for Rover: l r f b --- > left / right / forward / backward ");
            break;
        }
    }
    console.log(`Rover's travel log: [${rover.travelLog}]`);
}



addObstacles(grid, totalObstacles, gridSize); //call function adding obstacles
console.table(grid); // printing a table/ grid
checkCollision(grid, rover) // checking collision with an obstacle '#'

//Change commands here. You can use: l (TURN left), r (TURN right), f (MOVE forward), b (MOVE backward). Remember to keep the quotation marks! :)
//If you want to test obstacles collision faster go to 13 line: let totalObstacles = 10; and increase the number.
commands(rover, "lflfffffrbbbbbblfflfff");