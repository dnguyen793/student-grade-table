<?php
    require_once("mysql_credentials.php");

    $query = "SELECT * FROM student_data ORDER BY 'name' ASC";

    $result = mysqli_query($conn, $query);
    $output = [ 'success' => false,
                'errors' => []
            ];

    if($result){  
        //query is working
        if( mysqli_num_rows($result) > 0 ){
            //query returned data
            //if it did, change output success to true
            $output['success'] = true;
            //do a while loop to collect all the data 
            while( $row = mysqli_fetch_assoc($result) ){
                //add each row of data to the $output['studentData'] array
                $output['studentData'][]= $row;
            }
        }
        else{
            //if not, add to the errors: 'no data'
            $output['errors'][] = "No data available";
        }
    }
    else{ 
        //add 'database error' to errors
        $output['errors'][] = "Error with query";
    }

?>