<?php

require_once("mysql_credentials.php");

//write a query that selects all the students from the database, all the data from each row
$query = "SELECT * FROM student_data";

$stmt = $conn->prepare($query);
$stmt->execute();

if(!empty($_GET['id'])){
	$_GET['id'] = addslashes($_GET['id']);
	$query .= " WHERE ID='{$_GET['id']}'";
};

//send the query to the database, store the result of the query into $result
$result = $stmt->get_result();

$output = [ 'success' => false,
			'studentData' => [],
			'errors' => []
		];

//check if any data came back
if($result){  
	//query is working
	if( $result->num_rows > 0 ){
		//query returned data
		//if it did, change output success to true
		$output['success'] = true;
		//do a while loop to collect all the data 
		while( $row = $result->fetch_assoc() ){
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
$stmt->close();

?>