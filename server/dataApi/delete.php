<?php

require_once("mysql_credentials.php");
$studentId = $_POST['student_id'];

//check if you have all the data you need from the client-side call.  
//if not, add an appropriate error to errors

//write a query that deletes the student by the given student ID  
$query = "DELETE FROM student_data WHERE id = $studentId";

//send the query to the database, store the result of the query into $result
$result = mysqli_query($conn, $query);
$output = [
	'success' => false,
	'deleted' => null,
	'errors' => []
];

//check if $result is empty.  
if(!$result){
	//if it is, add 'database error' to errors
	$output['errors'][] = 'database error';
}
else{ 
	//check if the number of affected rows is 1
	if( $row = mysqli_affected_rows($conn) == 1 ){
		//if it did, change output success to true
		$output['success'] = true;
		$output['deleted'] = $row;
	}
	else{
	//if not, add to the errors: 'delete error'
	$output['errors'][] = 'delete error';
	}
}

?>