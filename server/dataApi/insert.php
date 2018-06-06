<?php

require_once("mysql_credentials.php");

// //check if you have all the data you need from the client-side call.  
// //if not, add an appropriate error to errors
if(empty($_POST['name']) || empty($_POST['course_name']) || empty($_POST['grade'])){
	exit('missing data');
};

$studentName = stripcslashes($_POST['name']);
$studentCourse = stripcslashes($_POST['course_name']);
$studentGrade = intval($_POST['grade']);

$sanitizedName = $conn->real_escape_string( $studentName);
$sanitizedCourse = $conn->real_escape_string( $studentCourse);


//write a query that inserts the data into the database.  remember that ID doesn't need to be set as it is auto incrementing
$query = "INSERT INTO student_data ( name, grade, course_name) VALUES ( ?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("sis", $sanitizedName, $studentGrade, $sanitizedCourse);
$stmt->execute();

//send the query to the database, store the result of the query into $result
// $result = mysqli_query($conn, $query);
// $result = $conn->insert_id;
$result = $stmt->affected_rows;
$stmt->close();

$output = [
	'success' => false,
	'id' => null,
	'errors' => []
];

//check if $result is empty.
if(!$result){
	//if it is, add 'database error' to errors
	$output['errors'][] = 'Database error';
}
else{
	//check if the number of affected rows is 1
	if( $result === 1 ){
		//if it did, change output success to true
		$output['success'] = true;
		//get the insert ID of the row that was added
		// $new_id = mysqli_insert_id($conn);
		$new_id = $conn->insert_id;
		//add 'insertID' to $outut and set the value to the row's insert ID
		$output['id'] = $new_id;
	}
	else{
		//if not, add to the errors: 'insert error'
		$output['errors'][] = 'Insert error - Unable to add student';
	}
}

?>  