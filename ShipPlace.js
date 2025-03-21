//document.getElementById("actual_sq_061").style.backgroundColor = "white";
const shipSet = [-5, -4, -3, -3, -2];
var ship_counter = 0;
var active_ship = shipSet[ship_counter];
var placed_ships  = [0,0,0,0,0];
var ship_position = [0,0,0,0,0];
var occupied_squares = []; //Squares where a 'ship head' is present
var blocked_squares = []; //These take care of boundary_overflow  red highlight
var disabled_squares_vertical   = [];
var disabled_squares_horizontal = [];
var all_good = 0;
var rotate_flag = 0;
var tempRot = 0;
var rotate_var = 0;


for (let i = 0; i < 101; i++) {
    blocked_squares[i] = 0;
    occupied_squares[i] = 0;
    disabled_squares_vertical[i]   = 0;
    disabled_squares_horizontal[i] = 0;
}

for (let i = 61; i <=100; i++) {
    blocked_squares[i]=1;
    document.documentElement.style.setProperty('--wd_reduced_global_'+i, "75%");
    document.documentElement.style.setProperty('--ht_reduced_global_'+i, "475%");
}

function rotate_opacity_1(){
    
    if(rotate_flag == 0)
    {document.getElementById("rotate_opt_wra").style.opacity = "1";}
}

function rotate_opacity_bytouch_1(){
    
    rotate_caller_touch();
    rotate_flag = 1;
    document.getElementById("rotate_opt_wra").style.opacity = "1";
}

function rotate_opacity_0(){
    
    if(rotate_flag == 0)
    {document.getElementById("rotate_opt_wra").style.opacity = "0";}
}

function rotate_opacity_bytouch_0(){
    
    rotate_flag = 1;
    document.getElementById("rotate_opt_wra").style.opacity = "0";
}


function button_in_handler(a, event){
    actual_id = "actual_sq_" + parseInt(a.id.slice(14, ));
    square_number = parseInt(a.id.slice(14, ));
    all_good = 0;
    
//    if(ship_counter > 0)
//    { compute_vertical_disabled_squares();
//      compute_horizontal_disabled_squares();
//    }
    
    
    
    if((active_ship > 0 && disabled_squares_horizontal[parseInt(a.id.slice(14, ))] == 0) || (active_ship < 0 && disabled_squares_vertical[parseInt(a.id.slice(14, ))] == 0)) {all_good = 1;}
    
  if(blocked_squares[square_number] == 0 && placed_ships[4]== 0 && all_good == 1) //checking the actual square number of the board, not array index
   {   all_good = 0;
//       document.addEventListener('pointerup', mouseUp);
//       document.addEventListener('onclick', mouseUp);
//
//       function mouseUp(event) {
           
           document.getElementById(actual_id).style.backgroundColor = "rgb(91, 137,238)"; //Setting the ship color to Blue
          // document.getElementById(actual_id).style.zIndex  = "2";
           document.getElementById(actual_id).style.opacity = "1";
           placed_ships[ship_counter]  = active_ship;
           ship_position[ship_counter] = parseInt(a.id.slice(14, )); //Storing the ship location
           
       if(tempRot%180 == 90)
          {tempRot+= 90;
           document.getElementById("sml_shp").style.rotate=tempRot+"deg";
          }
           
       let sml_shp_size = shipSet[ship_counter+1];
       if(shipSet[ship_counter+1] < 0) {sml_shp_size = sml_shp_size * (-1);}
       let small_ship_height    = sml_shp_size * 11.97524575 - 3.5000000072;
       let small_ship_bordRad   = (56.3762287541 * 2.6315794737) / small_ship_height;
       document.getElementById("sml_shp").style.height = small_ship_height+"%";
       document.getElementById("sml_shp").style.borderRadius = "16.6666667% / "+small_ship_bordRad+"%";
       if(sml_shp_size == 3) {document.getElementById("sml_shp").style.translate = "0% 0%";}
       
       
       //Changing the ship names in ship sample
       if(ship_counter == 0)
        {
            document.getElementById("air_carr").style.display = "none";
            document.getElementById("battl").style.display = "inline";
        }
       else if(ship_counter == 1)
        {
            document.getElementById("battl").style.display = "none";
            document.getElementById("destr").style.display = "inline";
        }
       else if(ship_counter == 2)
        {
            document.getElementById("destr").style.display = "none";
            document.getElementById("submar").style.display = "inline";
        }
       else if(ship_counter == 3)
        {
            document.getElementById("submar").style.display = "none";
            document.getElementById("pat_bo").style.display = "inline";
        }
       else if(ship_counter == 4)
        {
            document.getElementById("pat_bo").style.display = "none";
            document.getElementById("sml_shp").style.display = "none";
            document.getElementById("all_shp_pla").style.display = "inline";
            
            for (let i = 1; i <= 6; i++)
            {
                document.getElementById("small_horiz_line_"+i).style.backgroundColor = "rgb(66,66,66)";
                document.getElementById("small_vert_line_"+i).style.backgroundColor = "rgb(66,66,66)";
                
            }
            document.getElementById("chk_mar").style.display = "inline";
        }
       
       
       
       
       
          /*
           if(active_ship > 0)
           {
               for (let i = 0; i < active_ship; i++)
               {
                   occupied_squares[parseInt(a.id.slice(14, )) + i] = 1;
               }
           }
           
           else if(active_ship < 0)
           {   let actS = active_ship * (-1);
               for (let i = 0; i < actS; i++) // i is set to 0 as the loop is only for counting purpose
               {
                   occupied_squares[parseInt(a.id.slice(14, )) + i*10] = 1;
               }
           }*/
           
           occupied_squares[parseInt(a.id.slice(14, ))] = 1;
           ship_counter++;
           active_ship = shipSet[ship_counter];
           
           
             compute_vertical_disabled_squares();
             compute_horizontal_disabled_squares();
       //for (let i = 0; i < 101; i++)
       //{console.log("i="+i+" dis="+disabled_squares_vertical[i]); }
           
           if(active_ship > 0)
           {   let full_width  = active_ship * 100 - 25;
               let reduced_width = active_ship * 100 - 50;
               let full_border_radius = 1250.00000025 / full_width ;
               let reduced_border_radius = 833.3333335 / reduced_width;
               
               for (let i = 1; i <= 100; i++){
                   if(occupied_squares[i]==0){
                       document.documentElement.style.setProperty('--wd_global_'+i, full_width+"%");
                       document.documentElement.style.setProperty('--ht_global_'+i, '75%');
                       document.documentElement.style.setProperty('--wd_reduced_global_'+i, reduced_width+"%");
                       document.documentElement.style.setProperty('--ht_reduced_global_'+i, '50%');
                       document.documentElement.style.setProperty('--borderRadius_G_X_'+i, full_border_radius+"%");
                       document.documentElement.style.setProperty('--borderRadius_G_Y_'+i, '16.6666667%');
                       document.documentElement.style.setProperty('--borderRadius_reduced_X_'+i, reduced_border_radius+"%");
                       document.documentElement.style.setProperty('--borderRadius_reduced_Y_'+i, '16.6666667%');}
               }
           }
           
           else if(active_ship < 0)
           {   let full_height    = active_ship * (-1) * 100 - 25;
               let reduced_height = active_ship * (-1) * 100 - 50;
               let full_border_radius = 1250.00000025 / full_height;
               let reduced_border_radius = 833.3333335 / reduced_height;
               
               for (let i = 1; i <= 100; i++){
                   if(occupied_squares[i]==0){
                       document.documentElement.style.setProperty('--wd_global_'+i, "75%");
                       document.documentElement.style.setProperty('--ht_global_'+i, full_height+"%");
                       document.documentElement.style.setProperty('--wd_reduced_global_'+i, "50%");
                       document.documentElement.style.setProperty('--ht_reduced_global_'+i, reduced_height+"%");
                       document.documentElement.style.setProperty('--borderRadius_G_X_'+i, "16.6666667%");
                       document.documentElement.style.setProperty('--borderRadius_G_Y_'+i, full_border_radius+"%");
                       document.documentElement.style.setProperty('--borderRadius_reduced_X_'+i, "16.6666667%");
                       document.documentElement.style.setProperty('--borderRadius_reduced_Y_'+i, reduced_border_radius+"%");}
               }
           }
       
           boundary_overflow();
           //document.removeEventListener('pointerup', mouseUp);
           //document.removeEventListener('touchcancel', mouseUp);
        
      // }//end of mouseUp(event)
   }//end of if(blocked_squares[square_number] == 0)
}//end of function


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
    
}

function rotate_ship(){
    active_ship = active_ship * -1;
    tempRot+= 90;
    document.getElementById("sml_shp").style.rotate=tempRot+"deg";
    rotate_var = 0;
    
    let sml_shp_size = shipSet[ship_counter];
    if(shipSet[ship_counter] < 0) {sml_shp_size = sml_shp_size * (-1);}
    let small_ship_height    = sml_shp_size * 11.97524575 - 3.5000000072;
    let small_ship_bordRad   = (56.3762287541 * 2.6315794737) / small_ship_height;
    document.getElementById("sml_shp").style.height = small_ship_height+"%";
    document.getElementById("sml_shp").style.borderRadius = "16.6666667% / "+small_ship_bordRad+"%";
    if(sml_shp_size == 4 && tempRot%180 == 90) {document.getElementById("sml_shp").style.translate = "68.2539680923% 13.3956386231%";}
    if((sml_shp_size == 4 || sml_shp_size == 2) && tempRot%180 == 0) {document.getElementById("sml_shp").style.translate = "0% 0%";}
    
    if(sml_shp_size == 2 && tempRot%180 == 90) {
        document.getElementById("sml_shp").style.translate = "68.2539680923% 29.6551723019%";}
    
    if(active_ship > 0) // HORIZONTAL
    {   let full_width  = active_ship * 100 - 25;
        let reduced_width = active_ship * 100 - 50;
        let full_border_radius = 1250.00000025 / full_width;
        let reduced_border_radius = 833.3333335 / reduced_width;
        
        for (let i = 1; i <= 100; i++){
            if(occupied_squares[i]==0){
                document.documentElement.style.setProperty('--wd_global_'+i, full_width+"%");
                document.documentElement.style.setProperty('--ht_global_'+i, '75%');
                document.documentElement.style.setProperty('--wd_reduced_global_'+i, reduced_width+"%");
                document.documentElement.style.setProperty('--ht_reduced_global_'+i, '50%');
                document.documentElement.style.setProperty('--borderRadius_G_X_'+i, full_border_radius+"%");
                document.documentElement.style.setProperty('--borderRadius_G_Y_'+i, '16.6666667%');
                document.documentElement.style.setProperty('--borderRadius_reduced_X_'+i, reduced_border_radius+"%");
                document.documentElement.style.setProperty('--borderRadius_reduced_Y_'+i, '16.6666667%');}
        }
    }
    
    else if(active_ship < 0)  // VERTICAL
    {   let full_height    = active_ship * (-1) * 100 - 25;
        let reduced_height = active_ship * (-1) * 100 - 50;
        let full_border_radius = 1250.00000025 / full_height;
        let reduced_border_radius = 833.3333335 / reduced_height;
        
        for (let i = 1; i <= 100; i++){
            if(occupied_squares[i]==0){
                document.documentElement.style.setProperty('--wd_global_'+i, "75%");
                document.documentElement.style.setProperty('--ht_global_'+i, full_height+"%");
                document.documentElement.style.setProperty('--wd_reduced_global_'+i, "50%");
                document.documentElement.style.setProperty('--ht_reduced_global_'+i, reduced_height+"%");
                document.documentElement.style.setProperty('--borderRadius_G_X_'+i, "16.6666667%");
                document.documentElement.style.setProperty('--borderRadius_G_Y_'+i, full_border_radius+"%");
                document.documentElement.style.setProperty('--borderRadius_reduced_X_'+i, "16.6666667%");
                document.documentElement.style.setProperty('--borderRadius_reduced_Y_'+i, reduced_border_radius+"%");}
        }
    }
    boundary_overflow();
}//end of rotate()




//--------------------------------------------------------   boundary_overflow()    ----------------------------------------------------------------
function boundary_overflow(){
    
    for (let i = 1; i <= 100; i++) { //For resetting all the boundary highlight
        if(occupied_squares[i] == 0)
         {  blocked_squares[i] = 0;
            let str1 = "actual_sq_"+i+"";
            document.getElementById(str1).style.backgroundColor = "rgb(94,94,94)";
            document.documentElement.style.setProperty('--mar_'+i, "25%");
         }
    }//end of loop
    
    
    if(active_ship > 0) //HORIZONTAL
    {
        for (let i = 1; i <= 100; i++)
        {
            if(((active_ship - (10 - i%10)) >= 2 || (i%10 == 0)) && occupied_squares[i] == 0)
            {
             let str1 = "actual_sq_"+i+"";
             let full_width  = active_ship * 100 - 25;
             document.getElementById(str1).style.backgroundColor = "rgb(204,7,30)";
             blocked_squares[i] = 1;
             document.documentElement.style.setProperty('--wd_reduced_global_'+i, full_width+"%");
             document.documentElement.style.setProperty('--ht_reduced_global_'+i, "75%");
             document.documentElement.style.setProperty('--mar_'+i, "12.5%");
            } //end of if
        
        } //end of loop
    } //end of if
    
    else if(active_ship < 0) //VERTICAL
    {
      for (let i = 1; i <= 100; i++)
      {
          if((i > (100 - ((active_ship * (-1)) * 10 - 10))) && occupied_squares[i] == 0)
          {
           let full_height  = active_ship * (-1) * 100 - 25;
           let str1 = "actual_sq_"+i+"";
           document.getElementById(str1).style.backgroundColor = "rgb(204,7,30)";
           blocked_squares[i] = 1;
           document.documentElement.style.setProperty('--wd_reduced_global_'+i, "75%");
           document.documentElement.style.setProperty('--ht_reduced_global_'+i, full_height+"%");
           document.documentElement.style.setProperty('--mar_'+i, "12.5%");
          }//end of if
      }
    }
    
}// end of boundary_overflow



//--------------------------------------------------   compute_horizontal_disabled_squares()    ----------------------------------------------------
function compute_horizontal_disabled_squares()
{
    let act_ship = shipSet[ship_counter];
    if(active_ship < 0) {act_ship = act_ship * (-1);}
    
    for (let i = 0; i < 101; i++) {    // resetting the disabled squares
        disabled_squares_horizontal[i] = 0;
    }
    
    
    for (let i = 0; i <= ship_counter; i++)
    {
        let ship_size = placed_ships[i];
        let shipPos   = ship_position[i];
        
        if(ship_size < 0 ) //vertical
        {
            ship_size = ship_size * (-1);
            for(let j = 0; j<ship_size; j++)
            {
             for (let i = 0; i<act_ship ; i++)
             {
                if((shipPos + (10*j) - i)%10 == 1)
                {disabled_squares_horizontal[shipPos + (10*j) - i] = 1;
                 break;
                }
                else
                {
                    disabled_squares_horizontal[shipPos + (10*j) - i] = 1;
                }
              } //end of loop
            } //end of j loop
        } //end of if(ship_size > 0)
        
        else if(ship_size > 0) //horizontal
        {   for(let k = shipPos; k<=ship_size + shipPos - 1; k++) //squares within the ship
            {
                disabled_squares_horizontal[k] = 1;
                
            }
            
             for (let i = 0; i<act_ship ; i++)
               {
                if((shipPos-i)%10 <= 0) break;
                disabled_squares_horizontal[shipPos - i] = 1;
               } //end of loop
            
            
        } // end of else if
    
    } //end of for loop
} // end of compute_horizontal_disabled_squares



//--------------------------------------------------   compute_vertical_disabled_squares()    ----------------------------------------------------
function compute_vertical_disabled_squares()
{
    let act_ship = active_ship;
    if(active_ship < 0) {act_ship = act_ship * (-1);}
    
    for (let i = 0; i < 101; i++) {   // resetting the disabled squares
        disabled_squares_vertical[i]   = 0;
    }
    
    for (let i = 0; i <= ship_counter; i++)
     {
         let ship_size = placed_ships[i];
         let shipPos   = ship_position[i];

         if(ship_size < 0 ) //vertical
         {
             ship_size = ship_size * (-1);
             for(let k = 0; k<=ship_size-1; k++)
                 {
                     disabled_squares_vertical[shipPos + 10*k] = 1;  //squares within the ship
                     
                 }
             for (let i = 0; i<act_ship ; i++)
               {
                if((shipPos-10*i) <= 0) break;
                disabled_squares_vertical[shipPos - 10*i] = 1;
               } //end of loop
             
         } //end of if(ship_size < 0 )
         
         else if(ship_size > 0 ) //horizontal
         {
             for(let j = 0; j<ship_size; j++)
             {
              for (let i = 0; i<act_ship ; i++)
              {
                 if((shipPos - (10*i) + j) <= 0) break;
                 disabled_squares_vertical[shipPos - (10*i) + j] = 1;
                    
                } //end of loop
             } //end of j loop
             
             
         } //end of else if
     } //end of master for-loop
} //end of compute_vertical_disabled_squares
