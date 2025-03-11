var hide = [];
for (let i = 0; i < 101; i++) {
  hide[i]=0;
}

function button_in_handler(a, event) {
    var initial_x = event.clientX;
    var initial_y = event.clientY;
    var flagX = 1;
    var flagY = 1;
    //onclick = function(e,f){document.getElementById("temp_div_x").innerHTML=e.x; document.getElementById("temp_div_y").innerHTML=e.y;}

    hide_squares(a.id);
    
    // initial_x = document.getElementById("temp_div_x").innerHTML;
    // initial_y = document.getElementById("temp_div_y").innerHTML;
    // console.log(event.clientX);

    //    console.log("x="+initial_x);
    //    console.log("y="+initial_y);
    //sleep(300);
    actual_id = "actual_sq" + a.id.slice(13, );
    cancel_animation(actual_id);
    document.getElementById(actual_id).style.display = "inline";
    document.getElementById(actual_id).style.opacity = 1;

    document.getElementById(actual_id).style.borderRadius = "0.5vh";
    document.getElementById(a.id).style.opacity = 1;

    default_width = document.getElementById(actual_id).offsetWidth;
    //console.log(default_width);
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
    parent_width = document.getElementById("left_greybox").offsetWidth;
    parent_height = document.getElementById("left_greybox").offsetHeight;


    function mouseMove(event) {
        if (flagX == 1) {
            t_x = (event.clientX - initial_x) * 1000 / parent_width;
            if (t_x < (default_width * 1000 / parent_width)) {
                t_x = default_width * 1000 / parent_width;
            }
        }
        if (t_x >= (default_width * 1000 / parent_width) && flagX == 1) {
            document.getElementById(actual_id).style.width = "" + t_x + "%";
        }
        if (t_x > (default_width * 1000 / parent_width) && flagX == 1) {
            flagY = 0;
        }


        if (flagY == 1) {
            t_y = (event.clientY - initial_y) * 1000 / parent_width;
            if (t_y < (default_width * 1000 / parent_width)) {
                t_y = default_width * 1000 / parent_width;
            }
        }
        if (t_y >= (default_width * 1000 / parent_width) && flagY == 1) {
            document.getElementById(actual_id).style.height = "" + t_y + "%";
        }
        if (t_y > (default_width * 1000 / parent_width) && flagY == 1) {
            flagX = 0;
        }
       // console.log("tx = " + t_x + ",    flagY = " + flagY + " ,     width= " + document.getElementById(actual_id).style.width);
    };

    function mouseUp(event) {
        //console.log("actual width = "+document.getElementById(actual_id).offsetWidth);
        //compensated_width = (document.getElementById(actual_id).offsetWidth * 100 / parent_width + 1.2) * 10;
        if (flagX == 1 && flagY == 0) {
            compensated_height = 75;
            document.getElementById(actual_id).style.height = "" + compensated_height + "%";
            //document.getElementById(actual_id).style.height = "100vh";
            let bordRad = document.getElementById(actual_id).style.width * 0.1666667;
            document.getElementById(actual_id).style.borderRadius = bordRad+"px"+" "+bordRad+"px"+" "+bordRad+"px"+" "+bordRad+"px";
        }

        if (flagX == 0 && flagY == 1) {
            compensated_width = 75;
            document.getElementById(actual_id).style.width = "" + compensated_width + "%";
            let bordRad = document.getElementById(actual_id).style.height * 0.1666667;
            document.getElementById(actual_id).style.borderRadius = bordRad+"px"+" "+bordRad+"px"+" "+bordRad+"px"+" "+bordRad+"px";
        }
        let bordRad = document.getElementById(actual_id).style.width * 0.1666667;
      
        hide[parseInt(actual_id.slice(10,))] = 1;
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
        show_squares();
        
        
    };
    
    //onmousemove = function(e){t_x= (e.x - event.clientX); if(t_x < default_width){t_x=default_width;}document.getElementById(actual_id).style.width = ""+t_x+"px";}

};



function hide_squares() {
    document.getElementById("pseudo_square_001").style.opacity = hide[1];
    document.getElementById("pseudo_square_002").style.opacity = hide[2];
    document.getElementById("pseudo_square_003").style.opacity = hide[3];
    document.getElementById("pseudo_square_004").style.opacity = hide[4];
    document.getElementById("pseudo_square_005").style.opacity = hide[5];
    document.getElementById("pseudo_square_006").style.opacity = hide[6];
    document.getElementById("pseudo_square_007").style.opacity = hide[7];
    document.getElementById("pseudo_square_008").style.opacity = hide[8];
    document.getElementById("pseudo_square_009").style.opacity = hide[9];
    document.getElementById("pseudo_square_010").style.opacity = hide[10];
    document.getElementById("pseudo_square_011").style.opacity = hide[11];
    document.getElementById("pseudo_square_012").style.opacity = hide[12];
    document.getElementById("pseudo_square_013").style.opacity = hide[13];
    document.getElementById("pseudo_square_014").style.opacity = hide[14];
    document.getElementById("pseudo_square_015").style.opacity = hide[15];
    document.getElementById("pseudo_square_016").style.opacity = hide[16];
    document.getElementById("pseudo_square_017").style.opacity = hide[17];
    document.getElementById("pseudo_square_018").style.opacity = hide[18];
    document.getElementById("pseudo_square_019").style.opacity = hide[19];
    document.getElementById("pseudo_square_020").style.opacity = hide[20];
    document.getElementById("pseudo_square_021").style.opacity = hide[21];
    document.getElementById("pseudo_square_022").style.opacity = hide[22];
    document.getElementById("pseudo_square_023").style.opacity = hide[23];
    document.getElementById("pseudo_square_024").style.opacity = hide[24];
    document.getElementById("pseudo_square_025").style.opacity = hide[25];
    document.getElementById("pseudo_square_026").style.opacity = hide[26];
    document.getElementById("pseudo_square_027").style.opacity = hide[27];
    document.getElementById("pseudo_square_028").style.opacity = hide[28];
    document.getElementById("pseudo_square_029").style.opacity = hide[29];
    document.getElementById("pseudo_square_030").style.opacity = hide[30];
    document.getElementById("pseudo_square_031").style.opacity = hide[31];
    document.getElementById("pseudo_square_032").style.opacity = hide[32];
    document.getElementById("pseudo_square_033").style.opacity = hide[33];
    document.getElementById("pseudo_square_034").style.opacity = hide[34];
    document.getElementById("pseudo_square_035").style.opacity = hide[35];
    document.getElementById("pseudo_square_036").style.opacity = hide[36];
    document.getElementById("pseudo_square_037").style.opacity = hide[37];
    document.getElementById("pseudo_square_038").style.opacity = hide[38];
    document.getElementById("pseudo_square_039").style.opacity = hide[39];
    document.getElementById("pseudo_square_040").style.opacity = hide[40];
    document.getElementById("pseudo_square_041").style.opacity = hide[41];
    document.getElementById("pseudo_square_042").style.opacity = hide[42];
    document.getElementById("pseudo_square_043").style.opacity = hide[43];
    document.getElementById("pseudo_square_044").style.opacity = hide[44];
    document.getElementById("pseudo_square_045").style.opacity = hide[45];
    document.getElementById("pseudo_square_046").style.opacity = hide[46];
    document.getElementById("pseudo_square_047").style.opacity = hide[47];
    document.getElementById("pseudo_square_048").style.opacity = hide[48];
    document.getElementById("pseudo_square_049").style.opacity = hide[49];
    document.getElementById("pseudo_square_050").style.opacity = hide[50];
    document.getElementById("pseudo_square_051").style.opacity = hide[51];
    document.getElementById("pseudo_square_052").style.opacity = hide[52];
    document.getElementById("pseudo_square_053").style.opacity = hide[53];
    document.getElementById("pseudo_square_054").style.opacity = hide[54];
    document.getElementById("pseudo_square_055").style.opacity = hide[55];
    document.getElementById("pseudo_square_056").style.opacity = hide[56];
    document.getElementById("pseudo_square_057").style.opacity = hide[57];
    document.getElementById("pseudo_square_058").style.opacity = hide[58];
    document.getElementById("pseudo_square_059").style.opacity = hide[59];
    document.getElementById("pseudo_square_060").style.opacity = hide[60];
    document.getElementById("pseudo_square_061").style.opacity = hide[61];
    document.getElementById("pseudo_square_062").style.opacity = hide[62];
    document.getElementById("pseudo_square_063").style.opacity = hide[63];
    document.getElementById("pseudo_square_064").style.opacity = hide[64];
    document.getElementById("pseudo_square_065").style.opacity = hide[65];
    document.getElementById("pseudo_square_066").style.opacity = hide[66];
    document.getElementById("pseudo_square_067").style.opacity = hide[67];
    document.getElementById("pseudo_square_068").style.opacity = hide[68];
    document.getElementById("pseudo_square_069").style.opacity = hide[69];
    document.getElementById("pseudo_square_070").style.opacity = hide[70];
    document.getElementById("pseudo_square_071").style.opacity = hide[71];
    document.getElementById("pseudo_square_072").style.opacity = hide[72];
    document.getElementById("pseudo_square_073").style.opacity = hide[73];
    document.getElementById("pseudo_square_074").style.opacity = hide[74];
    document.getElementById("pseudo_square_075").style.opacity = hide[75];
    document.getElementById("pseudo_square_076").style.opacity = hide[76];
    document.getElementById("pseudo_square_077").style.opacity = hide[77];
    document.getElementById("pseudo_square_078").style.opacity = hide[78];
    document.getElementById("pseudo_square_079").style.opacity = hide[79];
    document.getElementById("pseudo_square_080").style.opacity = hide[80];
    document.getElementById("pseudo_square_081").style.opacity = hide[81];
    document.getElementById("pseudo_square_082").style.opacity = hide[82];
    document.getElementById("pseudo_square_083").style.opacity = hide[83];
    document.getElementById("pseudo_square_084").style.opacity = hide[84];
    document.getElementById("pseudo_square_085").style.opacity = hide[85];
    document.getElementById("pseudo_square_086").style.opacity = hide[86];
    document.getElementById("pseudo_square_087").style.opacity = hide[87];
    document.getElementById("pseudo_square_088").style.opacity = hide[88];
    document.getElementById("pseudo_square_089").style.opacity = hide[89];
    document.getElementById("pseudo_square_090").style.opacity = hide[90];
    document.getElementById("pseudo_square_091").style.opacity = hide[91];
    document.getElementById("pseudo_square_092").style.opacity = hide[92];
    document.getElementById("pseudo_square_093").style.opacity = hide[93];
    document.getElementById("pseudo_square_094").style.opacity = hide[94];
    document.getElementById("pseudo_square_095").style.opacity = hide[95];
    document.getElementById("pseudo_square_096").style.opacity = hide[96];
    document.getElementById("pseudo_square_097").style.opacity = hide[97];
    document.getElementById("pseudo_square_098").style.opacity = hide[98];
    document.getElementById("pseudo_square_099").style.opacity = hide[99];
    document.getElementById("pseudo_square_100").style.opacity = hide[100];

}


function show_squares() {
    document.getElementById("pseudo_square_001").style.opacity = 1;
    document.getElementById("pseudo_square_002").style.opacity = 1;
    document.getElementById("pseudo_square_003").style.opacity = 1;
    document.getElementById("pseudo_square_004").style.opacity = 1;
    document.getElementById("pseudo_square_005").style.opacity = 1;
    document.getElementById("pseudo_square_006").style.opacity = 1;
    document.getElementById("pseudo_square_007").style.opacity = 1;
    document.getElementById("pseudo_square_008").style.opacity = 1;
    document.getElementById("pseudo_square_009").style.opacity = 1;
    document.getElementById("pseudo_square_010").style.opacity = 1;
    document.getElementById("pseudo_square_011").style.opacity = 1;
    document.getElementById("pseudo_square_012").style.opacity = 1;
    document.getElementById("pseudo_square_013").style.opacity = 1;
    document.getElementById("pseudo_square_014").style.opacity = 1;
    document.getElementById("pseudo_square_015").style.opacity = 1;
    document.getElementById("pseudo_square_016").style.opacity = 1;
    document.getElementById("pseudo_square_017").style.opacity = 1;
    document.getElementById("pseudo_square_018").style.opacity = 1;
    document.getElementById("pseudo_square_019").style.opacity = 1;
    document.getElementById("pseudo_square_020").style.opacity = 1;
    document.getElementById("pseudo_square_021").style.opacity = 1;
    document.getElementById("pseudo_square_022").style.opacity = 1;
    document.getElementById("pseudo_square_023").style.opacity = 1;
    document.getElementById("pseudo_square_024").style.opacity = 1;
    document.getElementById("pseudo_square_025").style.opacity = 1;
    document.getElementById("pseudo_square_026").style.opacity = 1;
    document.getElementById("pseudo_square_027").style.opacity = 1;
    document.getElementById("pseudo_square_028").style.opacity = 1;
    document.getElementById("pseudo_square_029").style.opacity = 1;
    document.getElementById("pseudo_square_030").style.opacity = 1;
    document.getElementById("pseudo_square_031").style.opacity = 1;
    document.getElementById("pseudo_square_032").style.opacity = 1;
    document.getElementById("pseudo_square_033").style.opacity = 1;
    document.getElementById("pseudo_square_034").style.opacity = 1;
    document.getElementById("pseudo_square_035").style.opacity = 1;
    document.getElementById("pseudo_square_036").style.opacity = 1;
    document.getElementById("pseudo_square_037").style.opacity = 1;
    document.getElementById("pseudo_square_038").style.opacity = 1;
    document.getElementById("pseudo_square_039").style.opacity = 1;
    document.getElementById("pseudo_square_040").style.opacity = 1;
    document.getElementById("pseudo_square_041").style.opacity = 1;
    document.getElementById("pseudo_square_042").style.opacity = 1;
    document.getElementById("pseudo_square_043").style.opacity = 1;
    document.getElementById("pseudo_square_044").style.opacity = 1;
    document.getElementById("pseudo_square_045").style.opacity = 1;
    document.getElementById("pseudo_square_046").style.opacity = 1;
    document.getElementById("pseudo_square_047").style.opacity = 1;
    document.getElementById("pseudo_square_048").style.opacity = 1;
    document.getElementById("pseudo_square_049").style.opacity = 1;
    document.getElementById("pseudo_square_050").style.opacity = 1;
    document.getElementById("pseudo_square_051").style.opacity = 1;
    document.getElementById("pseudo_square_052").style.opacity = 1;
    document.getElementById("pseudo_square_053").style.opacity = 1;
    document.getElementById("pseudo_square_054").style.opacity = 1;
    document.getElementById("pseudo_square_055").style.opacity = 1;
    document.getElementById("pseudo_square_056").style.opacity = 1;
    document.getElementById("pseudo_square_057").style.opacity = 1;
    document.getElementById("pseudo_square_058").style.opacity = 1;
    document.getElementById("pseudo_square_059").style.opacity = 1;
    document.getElementById("pseudo_square_060").style.opacity = 1;
    document.getElementById("pseudo_square_061").style.opacity = 1;
    document.getElementById("pseudo_square_062").style.opacity = 1;
    document.getElementById("pseudo_square_063").style.opacity = 1;
    document.getElementById("pseudo_square_064").style.opacity = 1;
    document.getElementById("pseudo_square_065").style.opacity = 1;
    document.getElementById("pseudo_square_066").style.opacity = 1;
    document.getElementById("pseudo_square_067").style.opacity = 1;
    document.getElementById("pseudo_square_068").style.opacity = 1;
    document.getElementById("pseudo_square_069").style.opacity = 1;
    document.getElementById("pseudo_square_070").style.opacity = 1;
    document.getElementById("pseudo_square_071").style.opacity = 1;
    document.getElementById("pseudo_square_072").style.opacity = 1;
    document.getElementById("pseudo_square_073").style.opacity = 1;
    document.getElementById("pseudo_square_074").style.opacity = 1;
    document.getElementById("pseudo_square_075").style.opacity = 1;
    document.getElementById("pseudo_square_076").style.opacity = 1;
    document.getElementById("pseudo_square_077").style.opacity = 1;
    document.getElementById("pseudo_square_078").style.opacity = 1;
    document.getElementById("pseudo_square_079").style.opacity = 1;
    document.getElementById("pseudo_square_080").style.opacity = 1;
    document.getElementById("pseudo_square_081").style.opacity = 1;
    document.getElementById("pseudo_square_082").style.opacity = 1;
    document.getElementById("pseudo_square_083").style.opacity = 1;
    document.getElementById("pseudo_square_084").style.opacity = 1;
    document.getElementById("pseudo_square_085").style.opacity = 1;
    document.getElementById("pseudo_square_086").style.opacity = 1;
    document.getElementById("pseudo_square_087").style.opacity = 1;
    document.getElementById("pseudo_square_088").style.opacity = 1;
    document.getElementById("pseudo_square_089").style.opacity = 1;
    document.getElementById("pseudo_square_090").style.opacity = 1;
    document.getElementById("pseudo_square_091").style.opacity = 1;
    document.getElementById("pseudo_square_092").style.opacity = 1;
    document.getElementById("pseudo_square_093").style.opacity = 1;
    document.getElementById("pseudo_square_094").style.opacity = 1;
    document.getElementById("pseudo_square_095").style.opacity = 1;
    document.getElementById("pseudo_square_096").style.opacity = 1;
    document.getElementById("pseudo_square_097").style.opacity = 1;
    document.getElementById("pseudo_square_098").style.opacity = 1;
    document.getElementById("pseudo_square_099").style.opacity = 1;
    document.getElementById("pseudo_square_100").style.opacity = 1;
}

function cancel_animation(act) {
    document.getElementById(act).style.transition = "width 0s, height 0s, margin-left 0s, margin-top 0s";
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
