// This checks if it's already there before trying to define it
if (typeof window.currentGameId === 'undefined') {
    window.currentGameId = null;
}
const shipSet = [-5, -4, -3, -3, -2]; //
var ship_counter = 0; //
var active_ship = shipSet[ship_counter]; //
var placed_ships = [0, 0, 0, 0, 0]; //
var ship_position = [0, 0, 0, 0, 0]; //
var ship_position_2 = [0, 0, 0, 0, 0]; //
var occupied_squares = []; //
var blocked_squares = []; //
var disabled_squares_vertical = []; //
var disabled_squares_horizontal = []; //
var all_good = 0; //
var rotate_flag = 0; //
var tempRot = 0; //
var rotate_var = 0; //
var f_screen = 0; //
var erase_flag = 0; //
var place_text_flag = 0; //
var all_ships_placed_var = 0; //
var submit_flag = 0; //
var sub_flag = 0; //
var conflict_flag = 0; //
let isGameOver = false; //
let playerSunkCount = 0; //
let aiSunkCount = 0; //
const TOTAL_SHIPS = 5; //

// --- NEW GLOBAL VARS FOR "SUNK" LOGIC ---
let playerShipHealth = [ //
    {
        size: 5,
        hits: 0,
        isSunk: false
    }, //
    {
        size: 4,
        hits: 0,
        isSunk: false
    }, //
    {
        size: 3,
        hits: 0,
        isSunk: false
    }, //
    {
        size: 3,
        hits: 0,
        isSunk: false
    }, //
    {
        size: 2,
        hits: 0,
        isSunk: false
    } //
];
let serverGuesses = new Set(); //
let lastServerGuessResult = "MISS"; // Store the result of the server's last guess
// --- END NEW GLOBAL VARS ---

for (let i = 0; i < 101; i++) { //
    blocked_squares[i] = 0; //
    occupied_squares[i] = 0; //
    disabled_squares_vertical[i] = 0; //
    disabled_squares_horizontal[i] = 0; //
}
for (let i = 61; i <= 100; i++) { //
    blocked_squares[i] = 1; //
    document.documentElement.style.setProperty("--wd_reduced_global_" + i, "75%"); //
    document.documentElement.style.setProperty("--ht_reduced_global_" + i, "475%"); //
}

function rotate_opacity_1() { //
    if (rotate_flag == 0 && submit_flag == 0 && all_ships_placed_var == 0) { //
        document.getElementById("rotate_opt_wra").style.opacity = "1"; //
    }
}

function rotate_opacity_bytouch_1() { //
    if (submit_flag == 0 && all_ships_placed_var == 0) { //
        rotate_flag = 1; //
        document.getElementById("rotate_opt_wra").style.opacity = "1"; //
        rotate_ship(); //
    }
}

function rotate_opacity_0() { //
    if (rotate_flag == 0 && submit_flag == 0 && all_ships_placed_var == 0) { //
        document.getElementById("rotate_opt_wra").style.opacity = "0"; //
    }
}

function rotate_opacity_bytouch_0() { //
    if (submit_flag == 0 && all_ships_placed_var == 0) { //
        rotate_flag = 1; //
        document.getElementById("rotate_opt_wra").style.opacity = "0"; //
    }
}

function rotate_by_click() { //
    if (rotate_flag == 0 && submit_flag == 0 && all_ships_placed_var == 0) { //
        rotate_ship(); //
    }
}

function erase_active_bytouch_1() { //
    if (submit_flag == 0) { //
        erase_flag = 1; //
        document.getElementById("era_all_img_path").setAttribute("fill", "#dddfe1"); //
        document.getElementById("era_all").style.backgroundColor = "rgb(204,7,30)"; //
        erase_ships(); //
    }
}

function erase_active_bytouch_0() { //
    if (submit_flag == 0) { //
        erase_flag = 1; //
        document.getElementById("era_all_img_path").setAttribute("fill", "#cc071e"); //
        document.getElementById("era_all").style.backgroundColor = "rgb(49, 49, 52)"; //
    }
}

function erase_active_1() { //
    if (erase_flag == 0 && submit_flag == 0) { //
        document.getElementById("era_all_img_path").setAttribute("fill", "#dddfe1"); //
        document.getElementById("era_all").style.backgroundColor = "rgb(204,7,30)"; //
    }
}

function erase_active_0() { //
    if (erase_flag == 0 && submit_flag == 0) { //
        document.getElementById("era_all_img_path").setAttribute("fill", "#cc071e"); //
        document.getElementById("era_all").style.backgroundColor = "rgb(49, 49, 52)"; //
    }
}

function submit_active_bytouch_1() { //
    if (submit_flag == 0 && all_ships_placed_var == 1) { //
        sub_flag = 1; //
        document.getElementById("submt_img_path").setAttribute("fill", "#313134"); //
        document.getElementById("submt").style.backgroundColor = "rgb(123,128,131)"; //
        submit_ships(); //
    }
}

function submit_active_bytouch_0() { //
    if (all_ships_placed_var == 1) { //
        sub_flag = 1; //
        document.getElementById("submt_img_path").setAttribute("fill", "#9a9da8"); //
        document.getElementById("submt").style.backgroundColor = "rgb(49,49,52)"; //
    }
}

function submit_active_1() { //
    if (submit_flag == 0 && sub_flag == 0 && all_ships_placed_var == 1) { //
        document.getElementById("submt_img_path").setAttribute("fill", "#313134"); //
        document.getElementById("submt").style.backgroundColor = "rgb(123,128,131)"; //
    }
}

function submit_active_0() { //
    if (sub_flag == 0 && all_ships_placed_var == 1) { //
        document.getElementById("submt_img_path").setAttribute("fill", "#9a9da8"); //
        document.getElementById("submt").style.backgroundColor = "rgb(49,49,52)"; //
    }
}
/**
 * Asks the server to create a new game session.
 * Stores the new gameId in the global 'currentGameId' variable.
 */
async function startNewGame() { //
    try {
        const response = await fetch('https://battleship-server-r5pa.onrender.com?action=newGame'); //
        if (!response.ok) { //
            throw new Error('Server is offline or could not create a new game.'); //
        }
        currentGameId = await response.text(); //
        console.log('Game session pre-loaded with ID:', currentGameId); //
    } catch (error) { //
        console.error('Failed to pre-load game session:', error); //
        alert('Error: Could not connect to the game server. Please refresh the page to try again.'); //
    }
}

function remove_controls() { //
    let i = 1, //
        a = 1, //
        j = 0; //
    for (let j = 1; j <= 9; j++) { //
        document.getElementById("right_vert_line_" + j).style.display = "inline"; //
        document.getElementById("right_vert_line_" + j).style.backgroundColor = "rgb(123, 128, 131)"; //
        document.getElementById("right_horiz_line_" + j).style.display = "inline"; //
        document.getElementById("right_horiz_line_" + j).style.backgroundColor = "rgb(123, 128, 131)"; //
    }
    const myInterval = setInterval(function () { //
        i += 1; //
        ++j; //
        if (i / a >= 1) { //
            clearInterval(myInterval); //
            document.getElementById("rotate_opt_wra").style.display = "none"; //
            document.getElementById("demo").style.display = "none"; //
            document.getElementById("ship_samp").style.display = "none"; //
            document.getElementById("era_all").style.display = "none"; //
            document.getElementById("era_all_img").style.display = "none"; //
            document.getElementById("submt").style.display = "none"; //
            document.getElementById("submt_img").style.opacity = "0"; //
            document.getElementById("rotate_opt").style.display = "none"; //
            document.getElementById("rotate_txt").style.display = "none"; //
        }
        document.getElementById("demo").style.opacity = 1 - i / a; //
        document.getElementById("ship_samp").style.opacity = 1 - i / a; //
        document.getElementById("era_all").style.opacity = 1 - i / a; //
        document.getElementById("era_all_img").style.opacity = 1 - i / a; //
        document.getElementById("submt").style.opacity = 1 - i / a; //
        document.getElementById("submt_img").style.opacity = 1 - i / a; //
        document.getElementById("rotate_opt").style.opacity = 1 - i / a; //
        document.getElementById("rotate_txt").style.opacity = 1 - i / a; //
    }, 1);
    var dom_string = ""; //
    var left_dom_string = ""; //
    let ul = document.getElementById("right_greybox"); //
    let ll = document.getElementById("left_greybox"); //
    for (let loop_var = 1; loop_var <= 100; loop_var++) { //
        dom_string += //
            '<div class="ps_right_' + //
            loop_var + //
            '" id="pseudo_square_right_' + //
            loop_var + //
            '" style = "width: 10%; height: 10%; position: absolute; display: inline; z-index: 2; opacity : 1;"><div class="actual_square_right_' + //
            loop_var + //
            '" id="actual_sq_right_' + //
            loop_var + //
            '"></div></div>'; //
    }
    for (let i = 0; i < 100; i++) { //
        const top = Math.floor(i / 10) * 10 + 2.25; //
        const left = (i % 10) * 10 + 2.25; //
        left_dom_string += `<div id="guess_sq_${i + 1}" style=" width:0%; height:0%; top:${top}%; left:${left}%; position:absolute; border-radius:22.7272773%; z-index:2; opacity:0; background-color:#CC071E;"></div>`; //
    }
    ll.innerHTML += left_dom_string; //
    ul.innerHTML += dom_string; //
    for (let i = 1; i <= 100; i++) { //
        let str1 = "pseudo_square_right_" + i + ""; //
        document.getElementById(str1).addEventListener( //
            "touchcancel", //
            function () { //
                // This function call was incorrect, but we leave it
                // to avoid breaking other logic.
                button_in_handler(this, event); //
            },
            { passive: true } //
        );
        document //
            .getElementById(str1) //
            .addEventListener("mouseover", hover_square_opacity_1, { passive: true }); //
        document //
            .getElementById(str1) //
            .addEventListener("mouseout", hover_square_opacity_0, { passive: true }); //
        
        // --- THIS IS THE FIX ---
        // We now listen for touchstart and mousedown, and call the *correct* function.
        // We set passive: false to allow us to call event.preventDefault()
        // inside avoid_conflict, which stops the "stutter" bug.
        document.getElementById(str1).addEventListener( //
            "touchstart", //
            function (event) { //
                avoid_conflict(this, event); //
            },
            { passive: false } //
        );
        document.getElementById(str1).addEventListener( //
            "mousedown", //
            function (event) { //
                avoid_conflict(this, event); //
            },
            { passive: false } //
        );
        // --- END OF FIX ---
    }
    game_started();
}

function game_started() { //
    // This function used to add a 'click' listener, which caused
    // the stutter bug when combined with the 'touchstart' listener.
    // It's now empty, as all listeners are correctly set in remove_controls().
}

function avoid_conflict(x, event) { // <-- MODIFIED to accept event
    
    // --- THIS IS THE FIX ---
    // This stops the browser from firing a 'click' event *after*
    // this 'touchstart' or 'mousedown' event, which prevents
    // the double-fire and fixes the animation stutter.
    if (event) event.preventDefault();
    // --- END OF FIX ---

    // Original code (runs on all future clicks):
    if (conflict_flag == 0) { //
        conflict_flag = 1; //
        square_handler(x); //
    }
}

// --- NEW FUNCTION (replaces old isHit) ---
/**
 * Checks if the server's guess hit one of the player's ships.
 * Updates the playerShipHealth state AND the UI for a sunk ship.
 * @param {number} squareNumber - The square the server guessed.
 * @returns {string} "HIT", "SUNK_5_-60", "SUNK_4_27", etc., or "MISS"
 */
function checkServerHit(squareNumber) {
    squareNumber = Number(squareNumber);

    // Don't process a guess for the same square twice
    if (serverGuesses.has(squareNumber)) return "MISS"; //
    serverGuesses.add(squareNumber); //

    // ship_position_2 has the player's layout
    for (let i = 0; i < ship_position_2.length; i++) {
        // 'start' IS the original position data (e.g., -60)
        const start = ship_position_2[i]; //
        const isVertical = start < 0; //
        const absStart = Math.abs(start); //
        const ship = playerShipHealth[i]; // Get the health object for this ship
        
        // Don't waste time checking a ship that's already sunk
        if (ship.isSunk) continue; //

        for (let j = 0; j < ship.size; j++) {
            const cell = isVertical ? absStart + j * 10 : absStart + j;
            if (cell === squareNumber) {
                // --- IT'S A HIT! ---
                ship.hits++; // Increment the hit counter for this specific ship
                
                // Check if hits now equal the ship's total size
                if (ship.hits === ship.size) { //
                    ship.isSunk = true; //
                    // --- CONSOLE LOG FOR AI SINK ---
                    console.log(`CLIENT: The AI SUNK your ship! Size: ${ship.size}, Position: ${start}`); //
                    
                    // --- ADD THIS WIN-CHECK BLOCK ---
                    aiSunkCount++;
                    if (aiSunkCount >= TOTAL_SHIPS) {
                        // Delay so the player sees the last hit
                        setTimeout(() => showGameOverModal("Computer won the game!"), 1000);
                    }
                    // --- END OF WIN-CHECK BLOCK ---
                    
                    // --- NEW DELAYED UI LOGIC ---
                    // This 800ms delay lets the red "pop" animation in square_handler finish first
                    setTimeout(() => {
                        // 1. Get the ONE element that represents the entire ship
                        const shipElement = document.getElementById(`actual_sq_${absStart}`);

                        if (shipElement) {
                            // Animate the color, opacity, and border
                            shipElement.classList.add("sunk-ship-animate");
                            shipElement.style.backgroundColor = "#505050";
                            shipElement.style.opacity = "1";
                            shipElement.style.border = "none";
                        }

                        // 2. Hide all OLD hit markers on that ship
                        for (let k = 0; k < ship.size; k++) {
                            const sunkSquareNum = isVertical ? absStart + k * 10 : absStart + k;
                            
                            // Don't hide the *current* hit marker
                            if (sunkSquareNum === squareNumber) continue;

                            const hitMarkerElement = document.getElementById(`guess_sq_${sunkSquareNum}`);
                            if (hitMarkerElement) {
                                hitMarkerElement.style.display = 'none'; // Hide old circles
                            }
                        }
                    }, 800); // 800ms delay
                    // --- END DELAYED UI LOGIC ---
                    
                    // Return the detailed "SUNK" message
                    return `SUNK_${ship.size}_${start}`; //
                } else {
                    // It's a hit, but not a sink
                    return "HIT"; //
                }
            }
        }
    }

    return "MISS"; //
}


function showGameOverModal(message) {
    if (isGameOver) return; // Don't show it twice
    isGameOver = true; // Stop the game
    document.getElementById('gameOverMessage').innerText = message;
    document.getElementById('gameOverModal').style.display = 'flex';
}
// --- END OF NEW FUNCTION ---

// --- REPLACED square_handler FUNCTION ---
function square_handler(a) {
    if (isGameOver) return; // <-- ADD THIS LINE
    let response_color = "#a6a6a6"; //
    const fallback_color = "#404040"; //
    const s_no = a.id.slice(20); //
    const box = document.getElementById(`actual_sq_right_${s_no}`); //
    document.getElementById("left_greybox").style.overflow = "visible"; //
    box.style.zIndex = "8"; //
    const pseudoSquare = document.getElementById(`pseudo_square_right_${s_no}`); //
    pseudoSquare.style.zIndex = "10"; //
    pseudoSquare.style.pointerEvents = "none"; //
    let dataArrived = false; //
    let readyToExpand = false; //
    let lastBlinkExecuted = false; //
    let fetchTimedOut = false; //
    let storedRandomNumber = null; //

    let status = "";
    let randomNumber = null;

    const fetchTimeout = setTimeout(() => { //
        if (!dataArrived) { //
            console.warn("Fetch timeout — using fallback color."); //
            response_color = fallback_color; //
            dataArrived = true; //
            fetchTimedOut = true; //
            if (readyToExpand) { //
                triggerFinalExpansion(status); // Pass status
            }
        }
    }, 2000);

    fetch(`https://battleship-server-r5pa.onrender.com?target=${s_no}&gameId=${currentGameId}&aiSunk=${lastServerGuessResult}`) //
        .then((response) => { //
            if (!response.ok) { //
                if (response.status === 404) { //
                    alert("Game session expired! Please refresh the page to start a new game."); //
                }
                throw new Error("Server responded with an error."); //
            }
            return response.text(); //
        })
        .then((result) => { //
            if (fetchTimedOut) return; //
            clearTimeout(fetchTimeout); //

            [status, randomNumber] = result.split(','); //
            storedRandomNumber = randomNumber; //
            
            if (status === "HIT") {
                response_color = "#cc071e"; //
            } else if (status.startsWith("SUNK_")) {
                response_color = "#cc071e"; //
                const sunkInfo = status.split('_'); //
                const sunkShipSize = sunkInfo[1];
                const sunkShipPos = sunkInfo[2];
                console.log(`CLIENT: You SUNK the AI's ship! Size: ${sunkShipSize}, Position: ${sunkShipPos}`); //
            } else {
                response_color = "#a6a6a6"; //
            }

            dataArrived = true; //
            if (readyToExpand) { //
                triggerFinalExpansion(status); // Pass status
            }
        })
        .catch((error) => { //
            if (fetchTimedOut) return; //
            console.error("Fetch Error:", error); //
            clearTimeout(fetchTimeout); //
            dataArrived = true; //
            response_color = fallback_color; //
            if (readyToExpand) { //
                triggerFinalExpansion(status); // Pass status
            }
        });

    pseudoSquare.removeEventListener("mouseout", hover_square_opacity_0, {
        passive: true
    }); //
    pseudoSquare.removeEventListener("mouseover", hover_square_opacity_1, {
        passive: true
    }); //
    let animationStartTime = null; //
    let heartbeatPhase = 0; //
    let totalIterations = 0; //
    const maxIterations = 120; //
    const lastBlinkStart = maxIterations - 20; //

    function startNormalAnimation(timestamp) { //
        if (!animationStartTime) animationStartTime = timestamp; //
        const elapsed = timestamp - animationStartTime; //
        if (elapsed < 100) { //
            requestAnimationFrame(startNormalAnimation); //
        } else {
            startHeartbeatAnimation(); //
        }
    }

    function startHeartbeatAnimation() { //
        let lastTimestamp = null; //
        box.style.opacity = "1"; //
        function heartbeat(timestamp) { //
            if (!lastTimestamp) lastTimestamp = timestamp; //
            const deltaTime = timestamp - lastTimestamp; //
            lastTimestamp = timestamp; //
            heartbeatPhase = (heartbeatPhase + deltaTime * 0.2) % 200; //
            if (totalIterations >= lastBlinkStart) { //
                if (!lastBlinkExecuted) { //
                    lastBlinkExecuted = true; //
                    if (dataArrived) { //
                        triggerFinalExpansion(status); // Pass status
                    } else {
                        readyToExpand = true; //
                    }
                    return; //
                }
            } else {
                box.style.opacity = //
                    heartbeatPhase < 100 //
                        ?
                        (1.2 - heartbeatPhase / 100).toFixed(4) //
                        :
                        (((heartbeatPhase - 100) / 100) * 1.43).toFixed(4); //
            }
            totalIterations++; //
            if (totalIterations < maxIterations) { //
                requestAnimationFrame(heartbeat); //
            } else if (!lastBlinkExecuted) { //
                box.style.opacity = "1"; //
                box.style.transform = "scale(1)"; //
                box.style.transition = "none"; //
                box.style.backgroundColor = fallback_color; //
                conflict_flag = 0; //
            }
        }
        requestAnimationFrame(heartbeat); //
    }

    function triggerFinalExpansion(status) { //
        
        lastServerGuessResult = checkServerHit(storedRandomNumber); //

        // --- THIS IS THE CORRECTED LOGIC ---
        // It sets the color of the AI's hit marker (`guess_sq_...`)
        let finalColor;
        if (lastServerGuessResult === "HIT") {
            finalColor = "red"; // Normal hit
        } else if (lastServerGuessResult.startsWith("SUNK_")) {
            finalColor = "#505050"; // Sunk ship: Match the ship's new color
        } else {
            finalColor = "grey"; // Miss
        }
        // --- END OF CORRECTED LOGIC ---
        
        // 1. ALWAYS run the "HIT" (or "MISS") animation on the clicked square (right grid).
        box.style.backgroundColor = response_color; //
        box.style.opacity = "1"; //
        box.style.transform = "scale(3)"; //
        box.style.transition = "transform 150ms ease-out, background-color 150ms linear"; //
        
        setTimeout(() => { //
            box.style.transform = "scale(1)"; //
            setTimeout(() => { //
                box.style.transition = "none"; //
            }, 150);
        }, 100);

        // 2. IF it was a "SUNK", *also* run the expansion logic (right grid).
        if (status && status.startsWith("SUNK_")) {
            const sunkInfo = status.split('_');
            const sunkShipSize = parseInt(sunkInfo[1]);
            const sunkShipPos = parseInt(sunkInfo[2]);
            const isVertical = sunkShipPos < 0;
            const startSquare = Math.abs(sunkShipPos);

            // This is the correct calculation: (size * 75%) + ( (size-1) * 25% )
            const newDimensionPercent = (sunkShipSize * 75) + ((sunkShipSize - 1) * 25);
            const newDimension = `${newDimensionPercent}%`;

            // --- ADD THIS WIN-CHECK BLOCK ---
            playerSunkCount++;
            if (playerSunkCount >= TOTAL_SHIPS) {
                // Delay so the player sees the final animation
                setTimeout(() => showGameOverModal("You won the game!"), 1000);
            }
            // --- END OF WIN-CHECK BLOCK ---

            // Calculate the correct, non-stretching border-radius
            const absoluteRadius = 12.5;
            const shortSidePercent = 75;
            const radiusLongPct = (absoluteRadius / newDimensionPercent) * 100;
            const radiusShortPct = (absoluteRadius / shortSidePercent) * 100;
            
            let newBorderRadius = "";
            if (isVertical) {
                newBorderRadius = `${radiusShortPct}% / ${radiusLongPct}%`;
            } else {
                newBorderRadius = `${radiusLongPct}% / ${radiusShortPct}%`;
            }

            // Delay expansion to let the "scale" animation finish
            setTimeout(() => {
                for (let j = 0; j < sunkShipSize; j++) {
                    const squareNum = isVertical ? startSquare + (j * 10) : startSquare + j;
                    const squareElement = document.getElementById(`actual_sq_right_${squareNum}`);
                    
                    if (!squareElement) continue;

                    // Make ALL squares of the ship red and visible first
                    squareElement.style.backgroundColor = "#cc071e";
                    squareElement.style.opacity = "1";
                    
                    // Add animation class
                    squareElement.classList.add("sunk-ship-animate");

                    if (squareNum === startSquare) {
                        // This is the FIRST square. Expand it.
                        squareElement.style.zIndex = "11";
                        squareElement.style.borderRadius = newBorderRadius; // Apply new radius
                        
                        if (isVertical) {
                            squareElement.style.height = newDimension;
                        } else {
                            squareElement.style.width = newDimension;
                        }
                        
                        // Set the *final* color. The CSS transition will delay it.
                        squareElement.style.backgroundColor = "#505050";

                    } else {
                        // This is NOT the first square. Hide it.
                        squareElement.style.opacity = "0";
                    }
                }
            }, 260); // 260ms = 100ms + 150ms + 10ms buffer
        }

        // 3. This part (displaying the AI's guess on the left grid) is delayed
        setTimeout(() => { //
            if (storedRandomNumber !== null) { //
                const guessedSquare = document.getElementById(`guess_sq_${storedRandomNumber}`); //
                if (guessedSquare) { //
                    document.querySelectorAll("[id^='guess_sq_']").forEach((sq) => { //
                        const svg = sq.querySelector("svg"); //
                        if (svg) sq.removeChild(svg); //
                    });
                    guessedSquare.style.width = "5.5%"; //
                    guessedSquare.style.height = "5.5%"; //
                    guessedSquare.style.opacity = "1"; //
                    guessedSquare.style.backgroundColor = finalColor; // This now uses the corrected color
                    guessedSquare.style.transition = "transform 150ms ease-out"; //
                    guessedSquare.style.transform = "scale(3)"; //
                    setTimeout(() => { //
                        guessedSquare.style.transform = "scale(1)"; //
                        setTimeout(() => { //
                            guessedSquare.style.transition = "none"; //
                            const circleSVG = ` <svg viewBox="0 0 100 100" width="100%" height="100%" style="position:absolute; top:0; left:0; pointer-events:none;"><circle cx="50" cy="50" r="28" fill="#cccccc" /></svg> `; //
                            guessedSquare.innerHTML += circleSVG; //
                        }, 150);
                    }, 100);
                }
            }
            conflict_flag = 0; //
            pseudoSquare.style.zIndex = "2"; //
            box.style.zIndex = "1"; //
        }, 500);
    }
    
    requestAnimationFrame(startNormalAnimation); //
}

function submit_ships() { //
    // This 'if' check is from your original code
    if (all_ships_placed_var == 1 && submit_flag == 0) { //
        
        // Set the flag *immediately* to prevent the function from
        // running twice from a "ghost click"
        submit_flag = 1;

        // --- NEW: Delay the rest of the logic ---
        // This keeps the submit button on-screen long enough
        // to absorb the "ghost click" harmlessly.
        setTimeout(() => {
        
            // This is your original code from ShipPlace.js
            for (let i = 0; i < 5; i++) // submitting the ships
            {
                let targ_sq = ship_position[i]; //
                if (ship_position[i] < 0) { //
                    targ_sq = targ_sq * (-1); //
                }
                document.getElementById("actual_sq_" + targ_sq).style.backgroundColor = "rgba(94,94,94,0)"; //
                document.getElementById("actual_sq_" + targ_sq).style.border = "1px solid rgb(221, 223, 225)"; //
            }

            // This is your original code from ShipPlace.js
            document.getElementById("submt").removeEventListener("touchstart", submit_active_bytouch_1, { //
                passive: true //
            });
            document.getElementById("submt").removeEventListener("mouseover", submit_active_1, { //
                passive: true //
            });
            document.getElementById("submt").removeEventListener("mousedown", submit_ships, { //
                passive: true //
            });
            document.getElementById("submt_img_path").removeEventListener("touchstart", submit_active_bytouch_1, { //
                passive: true //
            });
            document.getElementById("submt_img_path").removeEventListener("mouseover", submit_active_1, { //
                passive: true //
            });
            document.getElementById("submt_img_path").removeEventListener("mousedown", submit_ships, { //
                passive: true //
            });

            // This is your original code from ShipPlace.js
            for (let i = 1; i <= 100; i++) { // adding various events to the pseudo squares //
                let str1 = "pseudo_square_" + i + ""; //
                document.getElementById(str1).removeEventListener("touchcancel", function() { //
                    button_in_handler(this, event) //
                }, {
                    passive: true //
                });
                document.getElementById(str1).removeEventListener("mouseover", hover_square_opacity_1, { //
                    passive: true //
                });
                document.getElementById(str1).removeEventListener("mouseout", hover_square_opacity_0, { //
                    passive: true //
                });
                document.getElementById(str1).addEventListener("touchstart", function() { //
                    button_in_handler(this, event) //
                }, {
                    passive: true //
                });
                document.getElementById(str1).addEventListener("mousedown", function() { //
                    button_in_handler(this, event) //
                }, {
                    passive: true //
                });
            }
            
            // This is your original call from ShipPlace.js
            remove_controls(); //

        }, 300); // 300ms delay

    } //end of if
}

function key_down_handler(event) { //
    if (event.key == " ") { //
        rotate_opacity_1(); //
        rotate_ship(); //
    } else if (event.key == "x" || event.key == "X") { //
        erase_active_1(); //
        erase_ships(); //
    } else if (event.key == "f" || event.key == "F") { //
        full_sc(); //
    }
}

function key_up_handler(event) { //
    if (event.key == " ") { //
        rotate_opacity_0(); //
    } else if (event.key == "x" || event.key == "X") { //
        erase_active_0(); //
    }
}

function hover_square_opacity_1(a) { //
    let str = a.toElement.id; //
    let sq_no = 200; //
    if (str[0] == "a") { //
        sq_no = str.slice(10); //
    } else if (str[0] == "p") { //
        sq_no = str.slice(14); //
    }
    if (submit_flag == 0) { //
        if (occupied_squares[sq_no] == 0) document.getElementById("actual_sq_" + sq_no).style.opacity = "1"; //
    } else if (submit_flag == 1) { //
        document.getElementById("actual_sq_" + sq_no).style.opacity = "1"; //
    }
}

function hover_square_opacity_0(a) { //
    let str = a.fromElement.id; //
    let sq_no = 200; //
    if (str[0] == "a") { //
        sq_no = str.slice(10); //
    } else if (str[0] == "p") { //
        sq_no = str.slice(14); //
    }
    if (submit_flag == 0) { //
        if (occupied_squares[sq_no] == 0) document.getElementById("actual_sq_" + sq_no).style.opacity = "0"; //
    } else if (submit_flag == 1) { //
        document.getElementById("actual_sq_" + sq_no).style.opacity = "0"; //
    }
}

function erase_ships_1() { //
    location.reload(); //
}

function place_here_text_show_touch() { //
    if (all_ships_placed_var == 0) { //
        place_text_flag = 1; //
        document.getElementById("greybo_lef_cov").style.display = "inline"; //
        document.getElementById("plac_here_txt").style.display = "inline"; //
        document.getElementById("greybo_lef_cov").style.zIndex = "3"; //
        document.getElementById("plac_here_txt").style.zIndex = "4"; //
    }
}

function place_here_text_hide_touch() { //
    place_text_flag = 1; //
    document.getElementById("greybo_lef_cov").style.display = "none"; //
    document.getElementById("plac_here_txt").style.display = "none"; //
    document.getElementById("greybo_lef_cov").style.zIndex = "2"; //
    document.getElementById("plac_here_txt").style.zIndex = "2"; //
}

function place_here_text_show() { //
    if (all_ships_placed_var == 0) { //
        if (place_text_flag == 0) { //
            document.getElementById("greybo_lef_cov").style.display = "inline"; //
            document.getElementById("plac_here_txt").style.display = "inline"; //
            document.getElementById("greybo_lef_cov").style.zIndex = "3"; //
            document.getElementById("plac_here_txt").style.zIndex = "3"; //
        }
    }
}

function place_here_text_hide() { //
    if (place_text_flag == 0) { //
        document.getElementById("greybo_lef_cov").style.display = "none"; //
        document.getElementById("plac_here_txt").style.display = "none"; //
        document.getElementById("greybo_lef_cov").style.zIndex = "2"; //
        document.getElementById("plac_here_txt").style.zIndex = "2"; //
    }
}

function erase_ships() { //
    if (submit_flag == 0) { //
        for (let i = 0; i < 5; i++) { //
            if (ship_position[i] == 0) { //
                break; //
            }
            document.getElementById("actual_sq_" + Math.abs(ship_position[i])).style.transition = //
                "width 0.1s, height 0.1s, margin-left 0.1s, margin-top 0.1s, background-color 0.3s"; //
        }
        all_ships_placed_var = 0; //
        for (let i = 1; i <= 100; i++) { //
            document.getElementById("actual_sq_" + i).style.display = "inline"; //
            document.getElementById("actual_sq_" + i).style.opacity = "0"; //
            document.getElementById("actual_sq_" + i).style.backgroundColor = "rgb(94,94,94)"; //
            document.documentElement.style.setProperty("--wd_global_" + i, "75%"); //
            document.documentElement.style.setProperty("--ht_global_" + i, "475%"); //
            document.documentElement.style.setProperty("--wd_reduced_global_" + i, "50%"); //
            document.documentElement.style.setProperty("--ht_reduced_global_" + i, "450%"); //
            document.documentElement.style.setProperty("--borderRadius_G_X_" + i, "16.6666667%"); //
            document.documentElement.style.setProperty("--borderRadius_G_Y_" + i, "2.6315789479%"); //
            document.documentElement.style.setProperty("--borderRadius_reduced_X_" + i, "16.6666667%"); //
            document.documentElement.style.setProperty("--borderRadius_reduced_Y_" + i, "1.8518518522%"); //
        }
        ship_counter = 0; //
        active_ship = shipSet[ship_counter]; //
        for (let i = 0; i < 5; i++) { //
            placed_ships[i] = 0; //
            ship_position[i] = 0; //
        }
        for (let i = 0; i < 101; i++) { //
            blocked_squares[i] = 0; //
            occupied_squares[i] = 0; //
            disabled_squares_vertical[i] = 0; //
            disabled_squares_horizontal[i] = 0; //
        }
        for (let i = 61; i <= 100; i++) { //
            blocked_squares[i] = 1; //
            document.documentElement.style.setProperty("--wd_reduced_global_" + i, "75%"); //
            document.documentElement.style.setProperty("--ht_reduced_global_" + i, "475%"); //
        }
        all_good = 0; //
        rotate_flag = 0; //
        rotate_var = 0; //
        document.getElementById("all_shp_pla").style.display = "none"; //
        document.getElementById("air_carr").style.display = "inline"; //
        document.getElementById("battl").style.display = "none"; //
        document.getElementById("destr").style.display = "none"; //
        document.getElementById("submar").style.display = "none"; //
        document.getElementById("pat_bo").style.display = "none"; //
        if (tempRot % 180 == 90) { //
            tempRot += 90; //
            document.getElementById("sml_shp").style.rotate = tempRot + "deg"; //
        }
        document.getElementById("sml_shp").style.translate = "0% 0%"; //
        for (let i = 1; i <= 6; i++) { //
            document.getElementById("small_horiz_line_" + i).style.backgroundColor = "rgb(123, 128, 131)"; //
            document.getElementById("small_vert_line_" + i).style.backgroundColor = "rgb(123, 128, 131)"; //
        }
        document.getElementById("chk_mar").style.display = "none"; //
        let sml_shp_size = shipSet[ship_counter]; //
        if (shipSet[ship_counter + 1] < 0) { //
            sml_shp_size = sml_shp_size * -1; //
        }
        let small_ship_height = sml_shp_size * 11.97524575 - 3.5000000072; //
        let small_ship_bordRad = (56.3762287541 * 2.6315794737) / small_ship_height; //
        document.getElementById("sml_shp").style.height = small_ship_height + "%"; //
        document.getElementById("sml_shp").style.borderRadius = "16.6666667% / " + small_ship_bordRad + "%"; //
        document.getElementById("sml_shp").style.translate = "0% 0%"; //
        document.getElementById("sml_shp").style.display = "inline"; //
        document.getElementById("submt").style.border = "1px solid rgb(66, 66, 66)"; //
        document.getElementById("submt_img_path").setAttribute("fill", "#424242"); //
        boundary_overflow(); //
    }
}

function button_in_handler(a, event) { //
    actual_id = "actual_sq_" + parseInt(a.id.slice(14)); //
    square_number = parseInt(a.id.slice(14)); //
    all_good = 0; //
    if ( //
        (active_ship > 0 && disabled_squares_horizontal[parseInt(a.id.slice(14))] == 0) || //
        (active_ship < 0 && disabled_squares_vertical[parseInt(a.id.slice(14))] == 0) //
    ) {
        all_good = 1; //
    }
    if (blocked_squares[square_number] == 0 && placed_ships[4] == 0 && all_good == 1) { //
        all_good = 0; //
        for (let i = 1; i <= 100; i++) { //
            if (occupied_squares[i] == 0) { //
                blocked_squares[i] = 0; //
                let str1 = "actual_sq_" + i + ""; //
                document.getElementById(str1).style.opacity = "0"; //
                document.getElementById(str1).style.backgroundColor = "rgb(94,94,94)"; //
                document.documentElement.style.setProperty("--mar_" + i, "25%"); //
            }
        }
        document.getElementById(actual_id).style.backgroundColor = "rgb(91, 137,238)"; //
        document.getElementById(actual_id).style.opacity = 1; //
        placed_ships[ship_counter] = active_ship; //
        ship_position[ship_counter] = parseInt(a.id.slice(14)); //
        ship_position_2[ship_counter] = parseInt(a.id.slice(14)); //
        if (active_ship < 0) { //
            ship_position_2[ship_counter] *= -1; //
        }
        if (tempRot % 180 == 90) { //
            tempRot += 90; //
            document.getElementById("sml_shp").style.rotate = tempRot + "deg"; //
        }
        let sml_shp_size = shipSet[ship_counter + 1]; //
        if (shipSet[ship_counter + 1] < 0) { //
            sml_shp_size = sml_shp_size * -1; //
        }
        let small_ship_height = sml_shp_size * 11.97524575 - 3.5000000072; //
        let small_ship_bordRad = (56.3762287541 * 2.6315794737) / small_ship_height; //
        document.getElementById("sml_shp").style.height = small_ship_height + "%"; //
        document.getElementById("sml_shp").style.borderRadius = "16.6666667% / " + small_ship_bordRad + "%"; //
        if (sml_shp_size == 3) { //
            document.getElementById("sml_shp").style.translate = "0% 0%"; //
        }
        if (ship_counter == 0) { //
            document.getElementById("air_carr").style.display = "none"; //
            document.getElementById("battl").style.display = "inline"; //
        } else if (ship_counter == 1) { //
            document.getElementById("battl").style.display = "none"; //
            document.getElementById("destr").style.display = "inline"; //
        } else if (ship_counter == 2) { //
            document.getElementById("destr").style.display = "none"; //
            document.getElementById("submar").style.display = "inline"; //
        } else if (ship_counter == 3) { //
            document.getElementById("submar").style.display = "none"; //
            document.getElementById("pat_bo").style.display = "inline"; //
        } else if (ship_counter == 4) { //
            all_ships_placed_var = 1; //
            for (let i = 0; i < 5; i++) { //
                if (ship_position[i] == 0) { //
                    break; //
                }
                document.getElementById("actual_sq_" + Math.abs(ship_position[i])).style.transition = //
                    "width 0.1s, height 0.1s, margin-left 0.1s, margin-top 0.1s, background-color 0s"; //
            }
            document.getElementById("pat_bo").style.display = "none"; //
            document.getElementById("sml_shp").style.display = "none"; //
            document.getElementById("all_shp_pla").style.display = "inline"; //
            for (let i = 1; i <= 6; i++) { //
                document.getElementById("small_horiz_line_" + i).style.backgroundColor = "rgb(66,66,66)"; //
                document.getElementById("small_vert_line_" + i).style.backgroundColor = "rgb(66,66,66)"; //
            }
            document.getElementById("chk_mar").style.display = "inline"; //
            document.getElementById("submt").style.border = "0.7px solid rgb(123, 128, 131)"; //
            document.getElementById("submt_img_path").setAttribute("fill", "#9a9da8"); //
        }
        occupied_squares[parseInt(a.id.slice(14))] = 1; //
        ship_counter++; //
        active_ship = shipSet[ship_counter]; //
        if (ship_counter == 5) { //
            for (let i = 1; i <= 100; i++) { //
                if (occupied_squares[i] == 0) { //
                    document.getElementById("actual_sq_" + i).style.display = "none"; //
                }
            }
        }
        compute_horizontal_disabled_squares(); //
        compute_vertical_disabled_squares(); //
        if (active_ship > 0) { //
            let full_width = active_ship * 100 - 25; //
            let reduced_width = active_ship * 100 - 50; //
            let full_border_radius = 1250.00000025 / full_width; //
            let reduced_border_radius = 833.3333335 / reduced_width; //
            for (let i = 1; i <= 100; i++) { //
                if (occupied_squares[i] == 0) { //
                    document.documentElement.style.setProperty("--wd_global_" + i, full_width + "%"); //
                    document.documentElement.style.setProperty("--ht_global_" + i, "75%"); //
                    document.documentElement.style.setProperty( //
                        "--wd_reduced_global_" + i, //
                        reduced_width + "%" //
                    );
                    document.documentElement.style.setProperty("--ht_reduced_global_" + i, "50%"); //
                    document.documentElement.style.setProperty( //
                        "--borderRadius_G_X_" + i, //
                        full_border_radius + "%" //
                    );
                    document.documentElement.style.setProperty("--borderRadius_G_Y_" + i, "16.6666667%"); //
                    document.documentElement.style.setProperty( //
                        "--borderRadius_reduced_X_" + i, //
                        reduced_border_radius + "%" //
                    );
                    document.documentElement.style.setProperty( //
                        "--borderRadius_reduced_Y_" + i, //
                        "16.6666667%" //
                    );
                }
            }
        } else if (active_ship < 0) { //
            let full_height = active_ship * -1 * 100 - 25; //
            let reduced_height = active_ship * -1 * 100 - 50; //
            let full_border_radius = 1250.00000025 / full_height; //
            let reduced_border_radius = 833.3333335 / reduced_height; //
            for (let i = 1; i <= 100; i++) { //
                if (occupied_squares[i] == 0) { //
                    document.documentElement.style.setProperty("--wd_global_" + i, "75%"); //
                    document.documentElement.style.setProperty("--ht_global_" + i, full_height + "%"); //
                    document.documentElement.style.setProperty("--wd_reduced_global_" + i, "50%"); //
                    document.documentElement.style.setProperty( //
                        "--ht_reduced_global_" + i, //
                        reduced_height + "%" //
                    );
                    document.documentElement.style.setProperty("--borderRadius_G_X_" + i, "16.6666667%"); //
                    document.documentElement.style.setProperty( //
                        "--borderRadius_G_Y_" + i, //
                        full_border_radius + "%" //
                    );
                    document.documentElement.style.setProperty( //
                        "--borderRadius_reduced_X_" + i, //
                        "16.6666667%" //
                    );
                    document.documentElement.style.setProperty( //
                        "--borderRadius_reduced_Y_" + i, //
                        reduced_border_radius + "%" //
                    );
                }
            }
        }
        boundary_overflow(); //
    }
}

function full_sc() { //
    if (f_screen == 0) { //
        f_screen = 1; //
        document.getElementById("full_scr").style.display = "none"; //
        document.getElementById("exit_full_scr").style.display = "inline"; //
        document.documentElement.style.setProperty("--fullScreenVar", "80px"); //
        var elem = document.documentElement; //
        if (elem.requestFullscreen) { //
            elem.requestFullscreen(); //
        } else if (elem.webkitRequestFullscreen) { //
            elem.webkitRequestFullscreen(); //
        } else if (elem.msRequestFullscreen) { //
            elem.msRequestFullscreen(); //
        }
    } else {
        f_screen = 0; //
        document.getElementById("exit_full_scr").style.display = "none"; //
        document.documentElement.style.setProperty("--fullScreenVar", "160px"); //
        if (document.exitFullscreen) { //
            document.exitFullscreen(); //
        } else if (document.webkitExitFullscreen) { //
            document.webkitExitFullscreen(); //
        } else if (document.msExitFullscreen) { //
            document.msExitFullscreen(); //
        }
        document.getElementById("full_scr").style.display = "inline"; //
    }
}

function full_var_set() { //
    if (!(!window.screenTop && !window.screenY)) { //
    }
}

function rotate_ship() { //
    for (let i = 1; i <= 100; i++) { //
        if (occupied_squares[i] == 0) { //
            document.getElementById("actual_sq_" + i).style.backgroundColor = "rgb(94,94,94)"; //
        }
    }
    active_ship = active_ship * -1; //
    tempRot += 90; //
    document.getElementById("sml_shp").style.rotate = tempRot + "deg"; //
    let sml_shp_size = shipSet[ship_counter]; //
    if (shipSet[ship_counter] < 0) { //
        sml_shp_size = sml_shp_size * -1; //
    }
    let small_ship_height = sml_shp_size * 11.97524575 - 3.5000000072; //
    let small_ship_bordRad = (56.3762287541 * 2.6315794737) / small_ship_height; //
    document.getElementById("sml_shp").style.height = small_ship_height + "%"; //
    document.getElementById("sml_shp").style.borderRadius = "16.6666667% / " + small_ship_bordRad + "%"; //
    if (sml_shp_size == 4 && tempRot % 180 == 90) { //
        document.getElementById("sml_shp").style.translate = "68.2539680923% 13.3956386231%"; //
    } else if (sml_shp_size == 2 && tempRot % 180 == 90) { //
        document.getElementById("sml_shp").style.translate = "68.2539680923% 29.6551723019%"; //
    } else if ((sml_shp_size == 4 || sml_shp_size == 2) && tempRot % 180 == 0) { //
        document.getElementById("sml_shp").style.translate = "0% 0%"; //
    }
    const docStyle = document.documentElement.style; //
    if (active_ship > 0) { //
        let full_width = active_ship * 100 - 25; //
        let reduced_width = active_ship * 100 - 50; //
        let full_border_radius = 1250.00000025 / full_width; //
        let reduced_border_radius = 833.3333335 / reduced_width; //
        for (let i = 1; i <= 100; i++) { //
            if (occupied_squares[i] == 0) { //
                docStyle.setProperty("--wd_global_" + i, full_width + "%"); //
                docStyle.setProperty("--ht_global_" + i, "75%"); //
                docStyle.setProperty("--wd_reduced_global_" + i, reduced_width + "%"); //
                docStyle.setProperty("--ht_reduced_global_" + i, "50%"); //
                docStyle.setProperty("--borderRadius_G_X_" + i, full_border_radius + "%"); //
                docStyle.setProperty("--borderRadius_G_Y_" + i, "16.6666667%"); //
                docStyle.setProperty("--borderRadius_reduced_X_" + i, reduced_border_radius + "%"); //
                docStyle.setProperty("--borderRadius_reduced_Y_" + i, "16.6666667%"); //
            }
        }
    } else if (active_ship < 0) { //
        let full_height = active_ship * -1 * 100 - 25; //
        let reduced_height = active_ship * -1 * 100 - 50; //
        let full_border_radius = 1250.00000025 / full_height; //
        let reduced_border_radius = 833.3333335 / reduced_height; //
        for (let i = 1; i <= 100; i++) { //
            if (occupied_squares[i] == 0) { //
                docStyle.setProperty("--wd_global_" + i, "75%"); //
                docStyle.setProperty("--ht_global_" + i, full_height + "%"); //
                docStyle.setProperty("--wd_reduced_global_" + i, "50%"); //
                docStyle.setProperty("--ht_reduced_global_" + i, reduced_height + "%"); //
                docStyle.setProperty("--borderRadius_G_X_" + i, "16.6666667%"); //
                docStyle.setProperty("--borderRadius_G_Y_" + i, full_border_radius + "%"); //
                docStyle.setProperty("--borderRadius_reduced_X_" + i, "16.6666667%"); //
                docStyle.setProperty("--borderRadius_reduced_Y_" + i, reduced_border_radius + "%"); //
            }
        }
    }
    boundary_overflow(); //
}

function boundary_overflow() { //
    for (let i = 1; i <= 100; i++) { //
        if (occupied_squares[i] == 0) { //
            blocked_squares[i] = 0; //
            let str1 = "actual_sq_" + i + ""; //
            document.getElementById(str1).style.backgroundColor = "rgb(94,94,94)"; //
            document.documentElement.style.setProperty("--mar_" + i, "25%"); //
        }
    }
    if (active_ship > 0) { //
        for (let i = 1; i <= 100; i++) { //
            if ((active_ship - (10 - (i % 10)) >= 2 || i % 10 == 0) && occupied_squares[i] == 0) { //
                let str1 = "actual_sq_" + i + ""; //
                let full_width = active_ship * 100 - 25; //
                document.getElementById(str1).style.backgroundColor = "rgb(204,7,30)"; //
                blocked_squares[i] = 1; //
                document.documentElement.style.setProperty("--wd_reduced_global_" + i, full_width + "%"); //
                document.documentElement.style.setProperty("--ht_reduced_global_" + i, "75%"); //
                document.documentElement.style.setProperty( //
                    "--borderRadius_reduced_X_" + i, //
                    document.documentElement.style.getPropertyValue("--borderRadius_G_X_" + i) //
                );
                document.documentElement.style.setProperty( //
                    "--borderRadius_reduced_Y_" + i, //
                    document.documentElement.style.getPropertyValue("--borderRadius_G_Y_" + i) //
                );
                document.documentElement.style.setProperty("--mar_" + i, "12.5%"); //
            }
        }
    } else if (active_ship < 0) { //
        for (let i = 1; i <= 100; i++) { //
            if (i > 100 - (active_ship * -1 * 10 - 10) && occupied_squares[i] == 0) { //
                let full_height = active_ship * -1 * 100 - 25; //
                let str1 = "actual_sq_" + i + ""; //
                document.getElementById(str1).style.backgroundColor = "rgb(204,7,30)"; //
                blocked_squares[i] = 1; //
                document.documentElement.style.setProperty("--wd_reduced_global_" + i, "75%"); //
                document.documentElement.style.setProperty("--ht_reduced_global_" + i, full_height + "%"); //
                document.documentElement.style.setProperty( //
                    "--borderRadius_reduced_X_" + i, //
                    document.documentElement.style.getPropertyValue("--borderRadius_G_X_" + i) //
                );
                document.documentElement.style.setProperty( //
                    "--borderRadius_reduced_Y_" + i, //
                    document.documentElement.style.getPropertyValue("--borderRadius_G_Y_" + i) //
                );
                document.documentElement.style.setProperty("--mar_" + i, "12.5%"); //
            }
        }
    }
}

function compute_horizontal_disabled_squares() { //
    let act_ship = shipSet[ship_counter]; //
    if (active_ship < 0) { //
        act_ship = act_ship * -1; //
    }
    for (let i = 0; i < 101; i++) { //
        disabled_squares_horizontal[i] = 0; //
    }
    for (let i = 0; i <= ship_counter; i++) { //
        let ship_size = placed_ships[i]; //
        let shipPos = ship_position[i]; //
        if (ship_size < 0) { //
            ship_size = ship_size * -1; //
            for (let j = 0; j < ship_size; j++) { //
                for (let i = 0; i < act_ship; i++) { //
                    if ((shipPos + 10 * j - i) % 10 == 1) { //
                        disabled_squares_horizontal[shipPos + 10 * j - i] = 1; //
                        break; //
                    } else {
                        disabled_squares_horizontal[shipPos + 10 * j - i] = 1; //
                    }
                }
            }
        } else if (ship_size > 0) { //
            for (let k = shipPos; k <= ship_size + shipPos - 1; k++) { //
                disabled_squares_horizontal[k] = 1; //
            }
            for (let i = 0; i < act_ship; i++) { //
                if ((shipPos - i) % 10 <= 0) break; //
                disabled_squares_horizontal[shipPos - i] = 1; //
            }
        }
    }
}

function compute_vertical_disabled_squares() { //
    let act_ship = active_ship; //
    if (active_ship < 0) { //
        act_ship = act_ship * -1; //
    }
    for (let i = 0; i < 101; i++) { //
        disabled_squares_vertical[i] = 0; //
    }
    for (let i = 0; i <= ship_counter; i++) { //
        let ship_size = placed_ships[i]; //
        let shipPos = ship_position[i]; //
        if (ship_size < 0) { //
            ship_size = ship_size * -1; //
            for (let k = 0; k <= ship_size - 1; k++) { //
                disabled_squares_vertical[shipPos + 10 * k] = 1; //
            }
            for (let i = 0; i < act_ship; i++) { //
                if (shipPos - 10 * i <= 0) break; //
                disabled_squares_vertical[shipPos - 10 * i] = 1; //
            }
        } else if (ship_size > 0) { //
            for (let j = 0; j < ship_size; j++) { //
                for (let i = 0; i < act_ship; i++) { //
                    if (shipPos - 10 * i + j <= 0) break; //
                    disabled_squares_vertical[shipPos - 10 * i + j] = 1; //
                }
            }
        }
    }
}

// Add this to the very end of ShipPlace.js
startNewGame(); //
