/* 1) What this program do?    
        Program is moving Your Rover called Momo (the main robot) on a grid according to orders (l r f b --- > left / right / forward / backward) which got from you.
        Momo can meet an obstacle like '#' which program generate randomly.
        Momo can also have collisions with other robots.
        Momo starts from [x:0, y:0] (if you don't change it).

   2) What you can modify to play?
        You can use letters: l r f b (left / right / forward / backward) to tell Momo where to go.
        you simply replace letters on the end of the code: (rover, "lfbblfffffrrffbrffffrbbbb");

        You can also modify directions, x, y of rovers objects.
        You can uncomment 3 additional Rovers.

        You can also modify numbers of totalObstacles.
    Enjoy!
    Monika Swidzinska
    https://github.com/mswidzinska
 */
// Rover Object
let rover = {
    name: "",
    direction: "",
    x: 0,
    y: 0,
    travelLog: []
};
let rovers = [{
        name: "Momo",
        direction: "N",
        x: 0,
        y: 0,
        travelLog: []
    },
    {
        name: "Koko",
        direction: "S",
        x: 2,
        y: 0,
        travelLog: []
    },
    {
        name: "Loko",
        direction: "E",
        x: 5,
        y: 7,
        travelLog: []
    },
    //More robots for testing
    /*{
        name: "Fomo",
        direction: "S",
        x: 6,
        y: 3,
        travelLog: []
    },
    {
        name: "Simo",
        direction: "W",
        x: 7,
        y: 4,
        travelLog: []
    },
    {
        name: "Pimo",
        direction: "N",
        x: 2,
        y: 3,
        travelLog: []
    }*/

]
let yourRover = rovers[0]; //Your Main Rover (Momo) is the first Rover Object from the rovers grid.

//Grid

//Size of the grid
let gridSize = {
    x: 10,
    y: 10
};
let totalObstacles = 15; // number of obstacles on the grid

let grid = [];

//The for loop is generating an array
for (let i = 0; i < 10; i++) {
    grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}


/*Funtcion puts random generated obstacles on the grid, but it is also checking if the place is empty. 
When there is no Rovers and an no obstacle, function puts an obstacle ('#'). 
Othervise (if finds an rover or an obstacle) it doesn't put an obstacles, but it waste one chance to try to do it. By i-=1 function is giving this "waste chance" back*/
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

//Function checks if your Rover Momo has a collision with an obstacle and print an alert when it finds '#' in array.
function checkCollision(grid, yourRover) {
    if ((grid[yourRover.x][yourRover.y] === '#') && (yourRover.name === "Momo")) {
        console.log('Collision with an obstacle! I can not move! Help me!');
        return true;
    } else
        return false;
}

//Function checks if your Rover Momo has a collision with another Rover(s) and print an alert.
function checkRobotsCollision(yourRover, rovers) {
    for (let i = 1; i < rovers.length; i++) {
        if ((yourRover.x == rovers[i].x) && (yourRover.y == rovers[i].y)) {
            console.log("Alert! ROVERS collision! Boooom!");
            return true;
        } else
            return false;
    }
}

//Function prints information only for your Rover Momo. It is used in functions for turning and moving.
function turnMove(rover, dir) {
    if (rover.name === "Momo") {
        switch (dir) {
            case "left":
                console.log("<<< turn LEFT <<<");
                break;
            case "right":
                console.log(">>> turn RIGHT >>>");
                break;
            case "forward":
                console.log("--- move FORWARD ---");
                break;
            case "backward":
                console.log("--- move BACKWARD ---");
                break;
        }
    }
}

//Function prints text when your Rover Momo touch the border of the grid.
function gridBorder(rover) {
    if (rover.name === "Momo") {
        console.log("You can't place Rover outside of the board! Turn Rover l/r (left/right).");
    }
}

//Turn Left, Turn Right functions based on its current direction. Printing a direction, x and y only for your Rover Momo. (Uncoment commented line, and comment if statament to see every robots details)
function turnLeft(rover) {
    turnMove(rover, "left");
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
    // console.log(`direction: ${rover.name}, '${rover.direction}', [ x:${rover.x}, y:${rover.y} ]`);
    if (rover.name === "Momo") {
        console.log(`direction: ${rover.name}, '${rover.direction}', [ x:${rover.x}, y:${rover.y} ]`);
    }
}

function turnRight(rover) {
    turnMove(rover, "right");
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
    //console.log(`direction: ${rover.name}, '${rover.direction}', [ x:${rover.x}, y:${rover.y} ]`);
    if (rover.name === "Momo") {
        console.log(`direction: ${rover.name}, '${rover.direction}', [ x:${rover.x}, y:${rover.y} ]`);
    }
}

/*Move forward and backward functions based on its current direction. 
With checking if(1) rover doesn't go further that the 10x10 array
and if(2) there is collision with an obstacle or another Rover - then it stops rover's moves (and show the previous position till rover can go further) 
On the end function prints a direction, x and y only for your Rover Momo. (Uncoment commented line, and comment if statament to see every robots details)*/

function moveForward(rover) {
    turnMove(rover, "forward");
    switch (rover.direction) {
        case "S":
            if (rover.y >= 0 && rover.y < 9) {
                let prevY = rover.y;
                rover.y++;
                if (checkCollision(grid, rover) || checkRobotsCollision(yourRover, rovers)) {
                    rover.y = prevY;
                }
                break;
            } else {
                gridBorder(rover);
                break;
            }
        case "N":
            if (rover.y > 0 && rover.y <= 9) {
                let prevY = rover.y;
                rover.y--;
                if (checkCollision(grid, rover) || checkRobotsCollision(yourRover, rovers)) {
                    rover.y = prevY;
                }
                break;
            } else {
                gridBorder(rover);
                break;
            }
        case "E":
            if (rover.x >= 0 && rover.x < 9) {
                let prevX = rover.x;
                rover.x++;
                if (checkCollision(grid, rover) || checkRobotsCollision(yourRover, rovers)) {
                    rover.x = prevX;
                }
                break;
            } else {
                gridBorder(rover);
                break;
            }
        case "W":
            if (rover.x > 0 && rover.x <= 9) {
                let prevX = rover.x;
                rover.x--;
                if (checkCollision(grid, rover) || checkRobotsCollision(yourRover, rovers)) {
                    rover.x = prevX;
                }
                break;
            } else {
                gridBorder(rover);
                break;
            }
    }

    //console.log(`direction: ${rover.name}, '${rover.direction}', [ x:${rover.x}, y:${rover.y} ]`);
    if (rover.name === "Momo") {
        console.log(`direction: ${rover.name}, '${rover.direction}', [ x:${rover.x}, y:${rover.y} ]`);
    }
}

function moveBackward(rover) {
    turnMove(rover, "backward");
    switch (rover.direction) {
        case "S":
            if (rover.y > 0 && rover.y <= 9) {
                let prevY = rover.y;
                rover.y--;
                if (checkCollision(grid, rover) || checkRobotsCollision(yourRover, rovers)) {
                    rover.y = prevY;
                }
                break;
            } else {
                gridBorder(rover);
                break;
            }
        case "N":
            if (rover.y >= 0 && rover.y < 9) {
                let prevY = rover.y;
                rover.y++;
                if (checkCollision(grid, rover) || checkRobotsCollision(yourRover, rovers)) {
                    rover.y = prevY;
                }
                break;
            } else {
                gridBorder(rover);
                break;
            }
        case "E":
            if (rover.x > 0 && rover.x <= 9) {
                let prevX = rover.x;
                rover.x--;
                if (checkCollision(grid, rover) || checkRobotsCollision(yourRover, rovers)) {
                    rover.x = prevX;
                }
                break;
            } else {
                gridBorder(rover);
                break;
            }
        case "W":
            if (rover.x >= 0 && rover.x < 9) {
                let prevX = rover.x;
                rover.x++;
                if (checkCollision(grid, rover) || checkRobotsCollision(yourRover, rovers)) {
                    rover.x = prevX;
                }
                break;
            } else {
                gridBorder(rover);
                break;
            }
    }
    // console.log(`direction: ${rover.name}, '${rover.direction}', [ x:${rover.x}, y:${rover.y} ]`);
    if (rover.name === "Momo") {
        console.log(`direction: ${rover.name}, '${rover.direction}', [ x:${rover.x}, y:${rover.y} ]`);
    }
}



/*Function command is taking orders: l (TURN left), r (TURN right), f (MOVE forward), b (MOVE backward) and only this orders!!!! Otherwise it prints an allert.
Depending on the command (l/r/f/b) it using corresponding function from above.
This function is also logging all your 's Rover Momo steps and prints them all on the end, as a one row of informations.*/
function commands(rover, orders) {
    for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        for (let j = 0; j < rovers.length; j++) {
            rover = rovers[j];
            if (order === "l" || order === "r" || order === "f" || order === "b") {
                switch (order) {
                    case "l":
                        turnLeft(rover);
                        rover.travelLog.push(` --- dir:${rover.direction} ---`);
                        break;
                    case "r":
                        turnRight(rover);
                        rover.travelLog.push(` --- dir:${rover.direction} ---`);
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

    }
    console.log(`Rover's travel log: [${rover.travelLog}]`);
}


addObstacles(grid, totalObstacles, gridSize); //call function adding obstacles
console.table(grid); // printing a table/ grid


//Change commands here. You can use: l (TURN left), r (TURN right), f (MOVE forward), b (MOVE backward). Remember to keep the quotation marks! :)
commands(rover, "lfbblfffffrrffbrffffrbbbb");