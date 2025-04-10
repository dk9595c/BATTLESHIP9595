//document.getElementById("actual_sq_061").style.backgroundColor = "white";
const shipSet = [-5, -4, -3, -3, -2];
var ship_counter = 0;
var active_ship = shipSet[ship_counter];
var placed_ships = [0, 0, 0, 0, 0];
var ship_position = [0, 0, 0, 0, 0];
var occupied_squares = []; //Squares where a 'ship head' is present
var blocked_squares = []; //These take care of boundary_overflow  red highlight
var disabled_squares_vertical = [];
var disabled_squares_horizontal = [];
var all_good = 0;
var rotate_flag = 0;
var tempRot = 0;
var rotate_var = 0;
var f_screen = 0;
var erase_flag = 0;
var place_text_flag = 0;
var all_ships_placed_var = 0;
var submit_flag = 0; // Becomes 1 when all ships are submitted, otherwise stays 0
var sub_flag = 0; // just to take care of appearance of submit button
var conflict_flag = 0; //To avoid touch conflict for clicking/touching actual_sq_right_XX


for (let i = 0; i < 101; i++) {
    blocked_squares[i] = 0;
    occupied_squares[i] = 0;
    disabled_squares_vertical[i] = 0;
    disabled_squares_horizontal[i] = 0;
}

for (let i = 61; i <= 100; i++) {
    blocked_squares[i] = 1;
    document.documentElement.style.setProperty('--wd_reduced_global_' + i, "75%");
    document.documentElement.style.setProperty('--ht_reduced_global_' + i, "475%");
}

function rotate_opacity_1() {

    if (rotate_flag == 0 && submit_flag == 0 && all_ships_placed_var == 0) {
        document.getElementById("rotate_opt_wra").style.opacity = "1";
    }
}

function rotate_opacity_bytouch_1() {
    if (submit_flag == 0 && all_ships_placed_var == 0) {
        // rotate_caller_touch();
        rotate_flag = 1;
        document.getElementById("rotate_opt_wra").style.opacity = "1";
        rotate_ship();
    }
}

function rotate_opacity_0() {

    if (rotate_flag == 0 && submit_flag == 0 && all_ships_placed_var == 0) {
        document.getElementById("rotate_opt_wra").style.opacity = "0";
    }
}

function rotate_opacity_bytouch_0() {
    if (submit_flag == 0 && all_ships_placed_var == 0) {
        rotate_flag = 1;
        document.getElementById("rotate_opt_wra").style.opacity = "0";
    }
}

function rotate_by_click()
{
    if (rotate_flag==0 && submit_flag == 0 && all_ships_placed_var == 0) {
        rotate_ship();
    }
}


function erase_active_bytouch_1() {
    if (submit_flag == 0) {
        erase_flag = 1;
        document.getElementById("era_all_img_path").setAttribute("fill", "#dddfe1");
        document.getElementById("era_all").style.backgroundColor = "rgb(204,7,30)";
        erase_ships();
    }
}

function erase_active_bytouch_0() {
    if (submit_flag == 0) {
        erase_flag = 1;
        document.getElementById("era_all_img_path").setAttribute("fill", "#cc071e");
        document.getElementById("era_all").style.backgroundColor = "rgb(49, 49, 52)";
    }
}

function erase_active_1() {
    if (erase_flag == 0 && submit_flag == 0) {
        document.getElementById("era_all_img_path").setAttribute("fill", "#dddfe1");
        document.getElementById("era_all").style.backgroundColor = "rgb(204,7,30)";
    }
}

function erase_active_0() {
    if (erase_flag == 0 && submit_flag == 0) {
        document.getElementById("era_all_img_path").setAttribute("fill", "#cc071e");
        document.getElementById("era_all").style.backgroundColor = "rgb(49, 49, 52)";
    }
}



function submit_active_bytouch_1() {
        
    if (submit_flag == 0 && all_ships_placed_var == 1) {
        sub_flag = 1;
        document.getElementById("submt_img_path").setAttribute("fill", "#313134");
        document.getElementById("submt").style.backgroundColor = "rgb(123,128,131)";
        submit_ships();
      
    }
}

function submit_active_bytouch_0() {
    if (all_ships_placed_var == 1) {
        sub_flag = 1;
        document.getElementById("submt_img_path").setAttribute("fill", "#9a9da8");
        document.getElementById("submt").style.backgroundColor = "rgb(49,49,52)";
        
    }
}

function submit_active_1() {
    if (submit_flag == 0 && sub_flag == 0 && all_ships_placed_var == 1) {
        
        document.getElementById("submt_img_path").setAttribute("fill", "#313134");
        document.getElementById("submt").style.backgroundColor = "rgb(123,128,131)";
        
    }
}

function submit_active_0() {
    if (sub_flag == 0 && all_ships_placed_var == 1) {
        
        document.getElementById("submt_img_path").setAttribute("fill", "#9a9da8");
        document.getElementById("submt").style.backgroundColor = "rgb(49,49,52)";
    }
}


function remove_controls()
{   let i=1, a = 1, j=0;
    for(let j=1; j<=9; j++)
     {
         document.getElementById("right_vert_line_"+j).style.display = "inline";
         document.getElementById("right_vert_line_"+j).style.backgroundColor = "rgb(123, 128, 131)";
         document.getElementById("right_horiz_line_"+j).style.display = "inline";
         document.getElementById("right_horiz_line_"+j).style.backgroundColor = "rgb(123, 128, 131)";
         
        // document.getElementById("left_greybox").style.opacity = "0.4";
         
     }
    const myInterval = setInterval(function()
     {  i+=1; ++j;
        if(i/a >= 1)
          {clearInterval(myInterval);
           
                  document.getElementById("rotate_opt_wra").style.display = "none";
                  document.getElementById("demo").style.display = "none";
                  document.getElementById("ship_samp").style.display = "none";
                  document.getElementById("era_all").style.display = "none";
                  document.getElementById("era_all_img").style.display = "none";
                  document.getElementById("submt").style.display = "none";
                  document.getElementById("submt_img").style.opacity = "0";
                  
                  document.getElementById("rotate_opt").style.display = "none";
                  document.getElementById("rotate_txt").style.display = "none";
              
              
              
              }
          
        
        document.getElementById("demo").style.opacity             = 1-i/a;
        document.getElementById("ship_samp").style.opacity        = 1-i/a;
        document.getElementById("era_all").style.opacity          = 1-i/a;
        document.getElementById("era_all_img").style.opacity      = 1-i/a;
        document.getElementById("submt").style.opacity            = 1-i/a;
        document.getElementById("submt_img").style.opacity        = 1-i/a;
        document.getElementById("rotate_opt").style.opacity       = 1-i/a;
        document.getElementById("rotate_txt").style.opacity       = 1-i/a;
       
     }, 1);
    
    var dom_string="";
    let ul = document.getElementById("right_greybox");
    
    
    for(let loop_var = 1; loop_var <= 100; loop_var++)
    {
        dom_string+="<div class=\"ps_right_"+loop_var+"\" id=\"pseudo_square_right_"+loop_var+"\" style = \"width: 10%; height: 10%; position: absolute; display: inline; z-index: 2; opacity : 1;\"><div class=\"actual_square_right_"+loop_var+"\" id=\"actual_sq_right_"+loop_var+"\"></div></div>"
       // console.log(dom_string);
    }
    //console.log(dom_string);
    ul.innerHTML+= dom_string;
    for (let i = 1; i <= 100; i++) {  // adding various events to the pseudo squares
       let str1 = "pseudo_square_right_"+i+"";
       document.getElementById(str1).addEventListener("touchcancel", function(){button_in_handler(this, event)}, {passive: true});
       document.getElementById(str1).addEventListener("mouseover", hover_square_opacity_1, {passive: true});
       document.getElementById(str1).addEventListener("mouseout", hover_square_opacity_0, {passive: true});
       document.getElementById(str1).addEventListener("touchstart", function(){button_in_handler(this, event)}, {passive: true});
       document.getElementById(str1).addEventListener("mousedown", function(){button_in_handler(this, event)}, {passive: true});
    }
//document.getElementById("right_greybox").innerHTML = dom_string;
game_started();
} //end of remove_controls()


function game_started()
{
    
    for (let i = 1; i <= 100; i++) {  // adding various events to the pseudo squares
      
      let str3 = "pseudo_square_right_"+i+"";
      //document.getElementById(str3).addEventListener("touchcancel", function(){square_handler(this, event)}, {passive: true});
     // document.getElementById(str3).addEventListener("mouseover", hover_square_opacity_1, {passive: true});
     // document.getElementById(str3).addEventListener("mouseout", hover_square_opacity_0, {passive: true});
     // document.getElementById(str3).addEventListener("touchstart", function(){avoid_conflict(this, event)}, {passive: true});
      document.getElementById(str3).addEventListener("click", function(){avoid_conflict(this, event)}, {passive: true});
    }
    
 
} // game_started

function avoid_conflict(x)
{
    if(conflict_flag == 0)
    {   conflict_flag = 1;
        square_handler(x);
    }
    
}

function square_handler(a) {
    let response_color = "#a6a6a6";
    
    
    conflict_flag = 0;
    const s_no = a.id.slice(20);
    const box = document.getElementById(`actual_sq_right_${s_no}`);
    const pseudoSquare = document.getElementById(`pseudo_square_right_${s_no}`);

    function getBinary() {
        
        
        
        fetch(`http://localhost:3000?target=${s_no}`)
            .then(response => response.text())
            .then(result => {
                //resultDiv.textContent = `Square ${target}: ${result}`;
               // resultDiv.className = result.toLowerCase();
                console.log(result);
                if(result == "HIT") {response_color = "#cc071e";}
                else if(result == "MISS") {response_color = "#a6a6a6";}
            });
    }
    getBinary();
    // Clean up event listeners
    pseudoSquare.removeEventListener("mouseout", hover_square_opacity_0, { passive: true });
    pseudoSquare.removeEventListener("mouseover", hover_square_opacity_1, { passive: true });

    let animationStartTime = null;
    let heartbeatPhase = 0;
    let totalIterations = 0;
    const maxIterations = 120;
    const lastBlinkStart = maxIterations - 20;
    let lastBlinkExecuted = false;

    function startNormalAnimation(timestamp) {
        if (!animationStartTime) animationStartTime = timestamp;
        const elapsed = timestamp - animationStartTime;

        if (elapsed < 100) {
            requestAnimationFrame(startNormalAnimation);
        } else {
            startHeartbeatAnimation();
        }
    }

    function startHeartbeatAnimation() {
        let lastTimestamp = null;
        box.style.opacity = '1';

        function heartbeat(timestamp) {
            if (!lastTimestamp) lastTimestamp = timestamp;
            const deltaTime = timestamp - lastTimestamp;
            lastTimestamp = timestamp;

            heartbeatPhase = (heartbeatPhase + deltaTime * 0.2) % 200;

            if (totalIterations >= lastBlinkStart) {
                if (!lastBlinkExecuted) {
                    lastBlinkExecuted = true;

                    // Change color and expand
                    box.style.backgroundColor = response_color;
                    box.style.opacity = '1';
                    box.style.transform = 'scale(3)';
                    box.style.transition = 'transform 150ms ease-out, background-color 150ms linear';

                    setTimeout(() => {
                        box.style.transform = 'scale(1)';

                        setTimeout(() => {
                            // Ensure final state is stable
                            box.style.transition = 'none';
                            box.style.opacity = '1';
                        }, 150);
                    }, 100);

                    return; // Stop normal blinking
                }
            } else {
                // Normal heartbeat animation
                if (heartbeatPhase < 100) {
                    box.style.opacity = (1.2 - (heartbeatPhase / 100)).toFixed(4);
                } else {
                    box.style.opacity = (((heartbeatPhase - 100) / 100) * 1.43).toFixed(4);
                }
            }

            totalIterations++;

            if (totalIterations < maxIterations) {
                requestAnimationFrame(heartbeat);
            } else {
                // Final state: No flicker, stable opacity, and new color
                box.style.opacity = '1';
                box.style.transform = 'scale(1)';
                box.style.transition = 'none';
                box.style.backgroundColor = 'rgb(204,7,30)'; // Keep new color permanently
            }
        }

        requestAnimationFrame(heartbeat);
    }

    requestAnimationFrame(startNormalAnimation);
} //end of square_handler()







function submit_ships() {
    if (all_ships_placed_var == 1 && submit_flag == 0) {
        submit_flag = 1;
        for (let i = 0; i < 5; i++) // submitting the ships
        {
            let targ_sq = ship_position[i];
            if (ship_position[i] < 0) {
                targ_sq = targ_sq * (-1);
            }
            document.getElementById("actual_sq_" + targ_sq).style.backgroundColor = "rgba(94,94,94,0)";
            document.getElementById("actual_sq_" + targ_sq).style.border = "1px solid rgb(221, 223, 225)";
        }
   
    document.getElementById("submt").removeEventListener("touchstart", submit_active_bytouch_1, {passive: true});
    document.getElementById("submt").removeEventListener("mouseover", submit_active_1, {passive: true});
    document.getElementById("submt").removeEventListener("mousedown", submit_ships, {passive: true});
    document.getElementById("submt_img_path").removeEventListener("touchstart", submit_active_bytouch_1, {passive: true});
    document.getElementById("submt_img_path").removeEventListener("mouseover", submit_active_1, {passive: true});
    document.getElementById("submt_img_path").removeEventListener("mousedown", submit_ships, {passive: true});
        
        for (let i = 1; i <= 100; i++) {  // adding various events to the pseudo squares
           let str1 = "pseudo_square_"+i+"";
           document.getElementById(str1).removeEventListener("touchcancel", function(){button_in_handler(this, event)}, {passive: true});
           document.getElementById(str1).removeEventListener("mouseover", hover_square_opacity_1, {passive: true});
           document.getElementById(str1).removeEventListener("mouseout", hover_square_opacity_0, {passive: true});
           document.getElementById(str1).removeEventListener("touchstart", function(){button_in_handler(this, event)}, {passive: true});
           document.getElementById(str1).removeEventListener("mousedown", function(){button_in_handler(this, event)}, {passive: true});
        }
    remove_controls();
        
        
    } //end of if
} // end of submit_ships()

function key_down_handler(event) {
    if (event.key == " ") {
        rotate_opacity_1();
        rotate_ship();
    } else if (event.key == "x" || event.key == "X") {
        erase_active_1();
        erase_ships();
    }
    else if (event.key == "f" || event.key == "F") {
        full_sc();
    }

}

function key_up_handler(event) {
    if (event.key == " ") {
        rotate_opacity_0();
    } else if (event.key == "x" || event.key == "X") {
        erase_active_0();
    }

}

function hover_square_opacity_1(a) {
    let str = a.toElement.id;
    let sq_no = 200; 
    //if(str[0] == 'a' || str[0] == 'p')

    if (str[0] == 'a') {
        sq_no = str.slice(10, );
    } else if (str[0] == 'p') {
        sq_no = str.slice(14, );
    }
    //console.log(str);
    if(submit_flag == 0)
    {
        if (occupied_squares[sq_no] == 0)
            document.getElementById("actual_sq_" + sq_no).style.opacity = "1";
    }
    
    else if(submit_flag == 1)
    {
        //console.log(sq_no);
        document.getElementById("actual_sq_" + sq_no).style.opacity = "1";
        
    }
}

function hover_square_opacity_0(a) {
    let str = a.fromElement.id;
    let sq_no = 200;
    //if(str[0] == 'a' || str[0] == 'p')

    if (str[0] == 'a') {
        sq_no = str.slice(10, );
    } else if (str[0] == 'p') {
        sq_no = str.slice(14, );
    }
    //console.log("actual_sq_"+sq_no);
    if(submit_flag == 0)
    {
        if (occupied_squares[sq_no] == 0)
            document.getElementById("actual_sq_" + sq_no).style.opacity = "0";
    }
    
    else if(submit_flag == 1)
    {
        //console.log(sq_no);
        document.getElementById("actual_sq_" + sq_no).style.opacity = "0";
        
    }
}

function erase_ships_1() {
    location.reload();
}

function place_here_text_show_touch() {
    //document.getElementById("greybo_lef_cov").style.display = "inline";
    if (all_ships_placed_var == 0) {
        place_text_flag = 1;
        document.getElementById("greybo_lef_cov").style.display = "inline";
        document.getElementById("plac_here_txt").style.display = "inline";

        document.getElementById("greybo_lef_cov").style.zIndex = "3";
        document.getElementById("plac_here_txt").style.zIndex = "4";
    }
}

function place_here_text_hide_touch() {
    place_text_flag = 1;

    document.getElementById("greybo_lef_cov").style.display = "none";
    document.getElementById("plac_here_txt").style.display = "none";

    document.getElementById("greybo_lef_cov").style.zIndex = "2";
    document.getElementById("plac_here_txt").style.zIndex = "2";
    //document.getElementById("greybo_lef_cov").style.opacity = "0";

}

function place_here_text_show() {
    //document.getElementById("greybo_lef_cov").style.display = "inline";
    if (all_ships_placed_var == 0) {
        if (place_text_flag == 0) {
            document.getElementById("greybo_lef_cov").style.display = "inline";
            document.getElementById("plac_here_txt").style.display = "inline";

            document.getElementById("greybo_lef_cov").style.zIndex = "3";
            document.getElementById("plac_here_txt").style.zIndex = "3";
        }
    }
}

function place_here_text_hide() { //console.log('in here');
    if (place_text_flag == 0) {

        document.getElementById("greybo_lef_cov").style.display = "none";
        document.getElementById("plac_here_txt").style.display = "none";

        document.getElementById("greybo_lef_cov").style.zIndex = "2";
        document.getElementById("plac_here_txt").style.zIndex = "2";
    }
    //document.getElementById("greybo_lef_cov").style.opacity = "0";
}

function erase_ships() {
    if (submit_flag == 0) {
        
        for (let i = 0; i < 5; i++) {
            if(ship_position[i] == 0) {break;}
            document.getElementById("actual_sq_" + Math.abs(ship_position[i])).style.transition = "width 0.1s, height 0.1s, margin-left 0.1s, margin-top 0.1s, background-color 0.3s";
        }
        all_ships_placed_var = 0;


        for (let i = 1; i <= 100; i++) {
            document.getElementById("actual_sq_" + i).style.display = "inline";
            document.getElementById("actual_sq_" + i).style.opacity = "0";
            document.getElementById("actual_sq_" + i).style.backgroundColor = "rgb(94,94,94)";
            document.documentElement.style.setProperty('--wd_global_' + i, "75%");
            document.documentElement.style.setProperty('--ht_global_' + i, "475%");
            document.documentElement.style.setProperty('--wd_reduced_global_' + i, "50%");
            document.documentElement.style.setProperty('--ht_reduced_global_' + i, "450%");
            document.documentElement.style.setProperty('--borderRadius_G_X_' + i, "16.6666667%");
            document.documentElement.style.setProperty('--borderRadius_G_Y_' + i, "2.6315789479%");
            document.documentElement.style.setProperty('--borderRadius_reduced_X_' + i, "16.6666667%");
            document.documentElement.style.setProperty('--borderRadius_reduced_Y_' + i, "1.8518518522%");

        }

        ship_counter = 0;
        active_ship = shipSet[ship_counter];
        for (let i = 0; i < 5; i++) {
            placed_ships[i] = 0;
            ship_position[i] = 0;
        }
        for (let i = 0; i < 101; i++) {
            blocked_squares[i] = 0;
            occupied_squares[i] = 0;
            disabled_squares_vertical[i] = 0;
            disabled_squares_horizontal[i] = 0;
        }
        for (let i = 61; i <= 100; i++) {
            blocked_squares[i] = 1;
            document.documentElement.style.setProperty('--wd_reduced_global_' + i, "75%");
            document.documentElement.style.setProperty('--ht_reduced_global_' + i, "475%");
        }
        all_good = 0;
        rotate_flag = 0;

        rotate_var = 0;

        document.getElementById("all_shp_pla").style.display = "none";
        document.getElementById("air_carr").style.display = "inline";
        document.getElementById("battl").style.display = "none";
        document.getElementById("destr").style.display = "none";
        document.getElementById("submar").style.display = "none";
        document.getElementById("pat_bo").style.display = "none";

        if (tempRot % 180 == 90) {
            tempRot += 90;
            document.getElementById("sml_shp").style.rotate = tempRot + "deg";
        }
        document.getElementById("sml_shp").style.translate = "0% 0%";

        for (let i = 1; i <= 6; i++) {
            document.getElementById("small_horiz_line_" + i).style.backgroundColor = "rgb(123, 128, 131)";
            document.getElementById("small_vert_line_" + i).style.backgroundColor = "rgb(123, 128, 131)";
        }
        document.getElementById("chk_mar").style.display = "none";

        let sml_shp_size = shipSet[ship_counter];
        if (shipSet[ship_counter + 1] < 0) {
            sml_shp_size = sml_shp_size * (-1);
        }
        let small_ship_height = sml_shp_size * 11.97524575 - 3.5000000072;
        let small_ship_bordRad = (56.3762287541 * 2.6315794737) / small_ship_height;
        document.getElementById("sml_shp").style.height = small_ship_height + "%";
        document.getElementById("sml_shp").style.borderRadius = "16.6666667% / " + small_ship_bordRad + "%";
        document.getElementById("sml_shp").style.translate = "0% 0%";
        document.getElementById("sml_shp").style.display = "inline";

        document.getElementById("submt").style.border = "1px solid rgb(66, 66, 66)";
        document.getElementById("submt_img_path").setAttribute("fill", "#424242");

        boundary_overflow();

    } //end of if(submit_flag == 0)
} //end of erase ships




function button_in_handler(a, event) {
    actual_id = "actual_sq_" + parseInt(a.id.slice(14, ));
    square_number = parseInt(a.id.slice(14, ));
    all_good = 0;

    //    if(ship_counter > 0)
    //    { compute_vertical_disabled_squares();
    //      compute_horizontal_disabled_squares();
    //    }

    if ((active_ship > 0 && disabled_squares_horizontal[parseInt(a.id.slice(14, ))] == 0) || (active_ship < 0 && disabled_squares_vertical[parseInt(a.id.slice(14, ))] == 0)) {
        all_good = 1;
    }

    if (blocked_squares[square_number] == 0 && placed_ships[4] == 0 && all_good == 1) //checking the actual square number of the board, not array index
    {
        all_good = 0;

        for (let i = 1; i <= 100; i++) { //For resetting all the boundary highlight
            if (occupied_squares[i] == 0) {
                blocked_squares[i] = 0;
                let str1 = "actual_sq_" + i + "";
                document.getElementById(str1).style.opacity = "0";
                document.getElementById(str1).style.backgroundColor = "rgb(94,94,94)";
                document.documentElement.style.setProperty('--mar_' + i, "25%");
            }
        } //end of loop

        document.getElementById(actual_id).style.backgroundColor = "rgb(91, 137,238)"; //Setting the ship color to Blue

        document.getElementById(actual_id).style.opacity = 1;
        //console.log(document.documentElement.style.getPropertyValue("--Opac_1"));
        placed_ships[ship_counter] = active_ship;
        ship_position[ship_counter] = parseInt(a.id.slice(14, )); //Storing the ship location

        if (tempRot % 180 == 90) {
            tempRot += 90;
            document.getElementById("sml_shp").style.rotate = tempRot + "deg";
        }

        let sml_shp_size = shipSet[ship_counter + 1];
        if (shipSet[ship_counter + 1] < 0) {
            sml_shp_size = sml_shp_size * (-1);
        }
        let small_ship_height = sml_shp_size * 11.97524575 - 3.5000000072;
        let small_ship_bordRad = (56.3762287541 * 2.6315794737) / small_ship_height;
        document.getElementById("sml_shp").style.height = small_ship_height + "%";
        document.getElementById("sml_shp").style.borderRadius = "16.6666667% / " + small_ship_bordRad + "%";
        if (sml_shp_size == 3) {
            document.getElementById("sml_shp").style.translate = "0% 0%";
        }


        //Changing the ship names in ship sample
        if (ship_counter == 0) {
            document.getElementById("air_carr").style.display = "none";
            document.getElementById("battl").style.display = "inline";
        } else if (ship_counter == 1) {
            document.getElementById("battl").style.display = "none";
            document.getElementById("destr").style.display = "inline";
        } else if (ship_counter == 2) {
            document.getElementById("destr").style.display = "none";
            document.getElementById("submar").style.display = "inline";
        } else if (ship_counter == 3) {
            document.getElementById("submar").style.display = "none";
            document.getElementById("pat_bo").style.display = "inline";
        } else if (ship_counter == 4) {
            all_ships_placed_var = 1;
            for (let i = 0; i < 5; i++) {
                if(ship_position[i] == 0) {break;}
                document.getElementById("actual_sq_" + Math.abs(ship_position[i])).style.transition = "width 0.1s, height 0.1s, margin-left 0.1s, margin-top 0.1s, background-color 0s";
            }
            document.getElementById("pat_bo").style.display = "none";
            document.getElementById("sml_shp").style.display = "none";
            document.getElementById("all_shp_pla").style.display = "inline";
            for (let i = 1; i <= 6; i++) {
                document.getElementById("small_horiz_line_" + i).style.backgroundColor = "rgb(66,66,66)";
                document.getElementById("small_vert_line_" + i).style.backgroundColor = "rgb(66,66,66)";

            }
            document.getElementById("chk_mar").style.display = "inline";
            document.getElementById("submt").style.border = "0.7px solid rgb(123, 128, 131)";
            document.getElementById("submt_img_path").setAttribute("fill", "#9a9da8");
        }


        occupied_squares[parseInt(a.id.slice(14, ))] = 1;
        ship_counter++;
        active_ship = shipSet[ship_counter];

        if (ship_counter == 5) {
            for (let i = 1; i <= 100; i++) //diabling the highlighting as all the ships have been placed
            {
                if (occupied_squares[i] == 0) {
                    document.getElementById("actual_sq_" + i).style.display = "none";
                }
            }
        }
        compute_horizontal_disabled_squares();
        compute_vertical_disabled_squares();

        //for (let i = 0; i < 101; i++)
        //{console.log("i="+i+" dis="+disabled_squares_vertical[i]); }

        if (active_ship > 0) {
            let full_width = active_ship * 100 - 25;
            let reduced_width = active_ship * 100 - 50;
            let full_border_radius = 1250.00000025 / full_width;
            let reduced_border_radius = 833.3333335 / reduced_width;

            for (let i = 1; i <= 100; i++) {
                if (occupied_squares[i] == 0) {
                    document.documentElement.style.setProperty('--wd_global_' + i, full_width + "%");
                    document.documentElement.style.setProperty('--ht_global_' + i, '75%');
                    document.documentElement.style.setProperty('--wd_reduced_global_' + i, reduced_width + "%");
                    document.documentElement.style.setProperty('--ht_reduced_global_' + i, '50%');
                    document.documentElement.style.setProperty('--borderRadius_G_X_' + i, full_border_radius + "%");
                    document.documentElement.style.setProperty('--borderRadius_G_Y_' + i, '16.6666667%');
                    document.documentElement.style.setProperty('--borderRadius_reduced_X_' + i, reduced_border_radius + "%");
                    document.documentElement.style.setProperty('--borderRadius_reduced_Y_' + i, '16.6666667%');
                }
            }
        } else if (active_ship < 0) {
            let full_height = active_ship * (-1) * 100 - 25;
            let reduced_height = active_ship * (-1) * 100 - 50;
            let full_border_radius = 1250.00000025 / full_height;
            let reduced_border_radius = 833.3333335 / reduced_height;

            for (let i = 1; i <= 100; i++) {
                if (occupied_squares[i] == 0) {
                    document.documentElement.style.setProperty('--wd_global_' + i, "75%");
                    document.documentElement.style.setProperty('--ht_global_' + i, full_height + "%");
                    document.documentElement.style.setProperty('--wd_reduced_global_' + i, "50%");
                    document.documentElement.style.setProperty('--ht_reduced_global_' + i, reduced_height + "%");
                    document.documentElement.style.setProperty('--borderRadius_G_X_' + i, "16.6666667%");
                    document.documentElement.style.setProperty('--borderRadius_G_Y_' + i, full_border_radius + "%");
                    document.documentElement.style.setProperty('--borderRadius_reduced_X_' + i, "16.6666667%");
                    document.documentElement.style.setProperty('--borderRadius_reduced_Y_' + i, reduced_border_radius + "%");
                }
            }
        }

        boundary_overflow();

        // }//end of mouseUp(event)
    } //end of if(blocked_squares[square_number] == 0)
} //end of function

/*
function rotate_caller_touch()
{
    if(rotate_var == 0)
    {
        rotate_var = 1;
        rotate_ship();
    }
    
}

function rotate_caller_click()
{
    if(rotate_var == 0)
    {
        rotate_var = 1;
        rotate_ship();
    }
    
}*/



function full_sc() {

    if (f_screen == 0) {
        f_screen = 1;
        document.getElementById("full_scr").style.display = "none";
        document.getElementById("exit_full_scr").style.display = "inline";
        document.documentElement.style.setProperty('--fullScreenVar', "80px");
        var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen();
        }
    } else {
        f_screen = 0;
        document.getElementById("exit_full_scr").style.display = "none";

        document.documentElement.style.setProperty('--fullScreenVar', "160px");
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen();
        }
        document.getElementById("full_scr").style.display = "inline";
    }
}

function full_var_set() {
    if (!(!window.screenTop && !window.screenY)) {

    }
}



function rotate_ship() {
    //const start = performance.now();
    // Original fullscreen check (commented out as in original)
    // if (!window.screenTop && !window.screenY) {
    //     console.log('Browser is in fullscreen');
    // }

    // 1. Reset boundary highlights - unchanged from original
    for (let i = 1; i <= 100; i++) {
        if (occupied_squares[i] == 0) {
            document.getElementById("actual_sq_" + i).style.backgroundColor = "rgb(94,94,94)";
        }
    }

    // 2. Rotation logic - unchanged
    active_ship = active_ship * -1;
    tempRot += 90;
    document.getElementById("sml_shp").style.rotate = tempRot + "deg";

    // 3. Ship size calculations - fixed Math.abs() usage
    let sml_shp_size = shipSet[ship_counter];
    if (shipSet[ship_counter] < 0) {
        sml_shp_size = sml_shp_size * (-1);
    }
    let small_ship_height = sml_shp_size * 11.97524575 - 3.5000000072;
    let small_ship_bordRad = (56.3762287541 * 2.6315794737) / small_ship_height;
    document.getElementById("sml_shp").style.height = small_ship_height + "%";
    document.getElementById("sml_shp").style.borderRadius = "16.6666667% / " + small_ship_bordRad + "%";

    // 4. Translation logic - fixed condition order
    if (sml_shp_size == 4 && tempRot % 180 == 90) {
        document.getElementById("sml_shp").style.translate = "68.2539680923% 13.3956386231%";
    } else if (sml_shp_size == 2 && tempRot % 180 == 90) {
        document.getElementById("sml_shp").style.translate = "68.2539680923% 29.6551723019%";
    } else if ((sml_shp_size == 4 || sml_shp_size == 2) && tempRot % 180 == 0) {
        document.getElementById("sml_shp").style.translate = "0% 0%";
    }

    // 5. Horizontal/Vertical styling - fixed active_ship comparison
    const docStyle = document.documentElement.style;
    
    if (active_ship > 0) { // HORIZONTAL
        let full_width = active_ship * 100 - 25;
        let reduced_width = active_ship * 100 - 50;
        let full_border_radius = 1250.00000025 / full_width;
        let reduced_border_radius = 833.3333335 / reduced_width;

        for (let i = 1; i <= 100; i++) {
            if (occupied_squares[i] == 0) {
                docStyle.setProperty('--wd_global_' + i, full_width + "%");
                docStyle.setProperty('--ht_global_' + i, '75%');
                docStyle.setProperty('--wd_reduced_global_' + i, reduced_width + "%");
                docStyle.setProperty('--ht_reduced_global_' + i, '50%');
                docStyle.setProperty('--borderRadius_G_X_' + i, full_border_radius + "%");
                docStyle.setProperty('--borderRadius_G_Y_' + i, '16.6666667%');
                docStyle.setProperty('--borderRadius_reduced_X_' + i, reduced_border_radius + "%");
                docStyle.setProperty('--borderRadius_reduced_Y_' + i, '16.6666667%');
            }
        }
    } else if (active_ship < 0) { // VERTICAL
        let full_height = active_ship * (-1) * 100 - 25;
        let reduced_height = active_ship * (-1) * 100 - 50;
        let full_border_radius = 1250.00000025 / full_height;
        let reduced_border_radius = 833.3333335 / reduced_height;

        for (let i = 1; i <= 100; i++) {
            if (occupied_squares[i] == 0) {
                docStyle.setProperty('--wd_global_' + i, "75%");
                docStyle.setProperty('--ht_global_' + i, full_height + "%");
                docStyle.setProperty('--wd_reduced_global_' + i, "50%");
                docStyle.setProperty('--ht_reduced_global_' + i, reduced_height + "%");
                docStyle.setProperty('--borderRadius_G_X_' + i, "16.6666667%");
                docStyle.setProperty('--borderRadius_G_Y_' + i, full_border_radius + "%");
                docStyle.setProperty('--borderRadius_reduced_X_' + i, "16.6666667%");
                docStyle.setProperty('--borderRadius_reduced_Y_' + i, reduced_border_radius + "%");
            }
        }
    }
   // const end = performance.now();
   // const executionTime = end - start;
   // console.log(`Execution time: ${executionTime} ms`);
    boundary_overflow();
}


//--------------------------------------------------------   boundary_overflow()    ----------------------------------------------------------------
function boundary_overflow() {

    for (let i = 1; i <= 100; i++) { //For resetting all the boundary highlight
        if (occupied_squares[i] == 0) {
            blocked_squares[i] = 0;
            let str1 = "actual_sq_" + i + "";
            document.getElementById(str1).style.backgroundColor = "rgb(94,94,94)";
            document.documentElement.style.setProperty('--mar_' + i, "25%");
        }
    } //end of loop


    if (active_ship > 0) //HORIZONTAL
    {
        for (let i = 1; i <= 100; i++) {
            if (((active_ship - (10 - i % 10)) >= 2 || (i % 10 == 0)) && occupied_squares[i] == 0) {
                let str1 = "actual_sq_" + i + "";
                let full_width = active_ship * 100 - 25;
                document.getElementById(str1).style.backgroundColor = "rgb(204,7,30)";
                blocked_squares[i] = 1;
//              document.documentElement.style.getPropertyValue("--borderRadius_G_X_"+i)
                document.documentElement.style.setProperty('--wd_reduced_global_' + i, full_width + "%");
                document.documentElement.style.setProperty('--ht_reduced_global_' + i, "75%");
                document.documentElement.style.setProperty('--borderRadius_reduced_X_' + i, document.documentElement.style.getPropertyValue("--borderRadius_G_X_"+i));
                document.documentElement.style.setProperty('--borderRadius_reduced_Y_' + i, document.documentElement.style.getPropertyValue("--borderRadius_G_Y_"+i));
                document.documentElement.style.setProperty('--mar_' + i, "12.5%");
            } //end of if

        } //end of loop
    } //end of if
    else if (active_ship < 0) //VERTICAL
    {
        for (let i = 1; i <= 100; i++) {
            if ((i > (100 - ((active_ship * (-1)) * 10 - 10))) && occupied_squares[i] == 0) {
                let full_height = active_ship * (-1) * 100 - 25;
                let str1 = "actual_sq_" + i + "";
                document.getElementById(str1).style.backgroundColor = "rgb(204,7,30)";
                blocked_squares[i] = 1;
                document.documentElement.style.setProperty('--wd_reduced_global_' + i, "75%");
                document.documentElement.style.setProperty('--ht_reduced_global_' + i, full_height + "%");
                document.documentElement.style.setProperty('--borderRadius_reduced_X_' + i, document.documentElement.style.getPropertyValue("--borderRadius_G_X_"+i));
                document.documentElement.style.setProperty('--borderRadius_reduced_Y_' + i, document.documentElement.style.getPropertyValue("--borderRadius_G_Y_"+i));
                document.documentElement.style.setProperty('--mar_' + i, "12.5%");
            } //end of if
        }
    }

} // end of boundary_overflow



//--------------------------------------------------   compute_horizontal_disabled_squares()    ----------------------------------------------------
function compute_horizontal_disabled_squares() {
    let act_ship = shipSet[ship_counter];
    if (active_ship < 0) {
        act_ship = act_ship * (-1);
    }

    for (let i = 0; i < 101; i++) { // resetting the disabled squares
        disabled_squares_horizontal[i] = 0;
    }


    for (let i = 0; i <= ship_counter; i++) {
        let ship_size = placed_ships[i];
        let shipPos = ship_position[i];

        if (ship_size < 0) //vertical
        {
            ship_size = ship_size * (-1);
            for (let j = 0; j < ship_size; j++) {
                for (let i = 0; i < act_ship; i++) {
                    if ((shipPos + (10 * j) - i) % 10 == 1) {
                        disabled_squares_horizontal[shipPos + (10 * j) - i] = 1;
                        break;
                    } else {
                        disabled_squares_horizontal[shipPos + (10 * j) - i] = 1;
                    }
                } //end of loop
            } //end of j loop
        } //end of if(ship_size > 0)
        else if (ship_size > 0) //horizontal
        {
            for (let k = shipPos; k <= ship_size + shipPos - 1; k++) //squares within the ship
            {
                disabled_squares_horizontal[k] = 1;

            }

            for (let i = 0; i < act_ship; i++) {
                if ((shipPos - i) % 10 <= 0) break;
                disabled_squares_horizontal[shipPos - i] = 1;
            } //end of loop


        } // end of else if

    } //end of for loop
} // end of compute_horizontal_disabled_squares



//--------------------------------------------------   compute_vertical_disabled_squares()    ----------------------------------------------------
function compute_vertical_disabled_squares() {
    let act_ship = active_ship;
    if (active_ship < 0) {
        act_ship = act_ship * (-1);
    }

    for (let i = 0; i < 101; i++) { // resetting the disabled squares
        disabled_squares_vertical[i] = 0;
    }

    for (let i = 0; i <= ship_counter; i++) {
        let ship_size = placed_ships[i];
        let shipPos = ship_position[i];

        if (ship_size < 0) //vertical
        {
            ship_size = ship_size * (-1);
            for (let k = 0; k <= ship_size - 1; k++) {
                disabled_squares_vertical[shipPos + 10 * k] = 1; //squares within the ship

            }
            for (let i = 0; i < act_ship; i++) {
                if ((shipPos - 10 * i) <= 0) break;
                disabled_squares_vertical[shipPos - 10 * i] = 1;
            } //end of loop

        } //end of if(ship_size < 0 )
        else if (ship_size > 0) //horizontal
        {
            for (let j = 0; j < ship_size; j++) {
                for (let i = 0; i < act_ship; i++) {
                    if ((shipPos - (10 * i) + j) <= 0) break;
                    disabled_squares_vertical[shipPos - (10 * i) + j] = 1;

                } //end of loop
            } //end of j loop


        } //end of else if
    } //end of master for-loop
} //end of compute_vertical_disabled_squares
