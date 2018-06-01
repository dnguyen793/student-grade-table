<?php

require_once("mysql_credentials.php");

print_r( $_POST);
echo $_POST['name'];
echo $_POST['course_name'];
echo $_POST['grade'];

// //check if you have all the data you need from the client-side call.  
// //if not, add an appropriate error to errors
if(empty($_POST['name']) || empty($_POST['course_name']) || empty($_POST['grade'])){
	exit('missing data');
};

$studentName = $_POST['name'];
$studentCourse = $_POST['course_name'];
$studentGrade = $_POST['grade'];
// //write a query that inserts the data into the database.  remember that ID doesn't need to be set as it is auto incrementing
$query = "INSERT INTO student_data ( name, grade, course_name) VALUES ( '$studentName', '$studentGrade', '$studentCourse')";
//send the query to the database, store the result of the query into $result
$result = mysqli_query($conn, $query);
$output = [
	'success' => false,
	'insertID' => null,
	'errors' => []
];

//check if $result is empty.
if(!$result){
	//if it is, add 'database error' to errors
	$output['errors'][] = 'database error';
}
else{
	//check if the number of affected rows is 1
	if( mysqli_affected_rows($conn) == 1 ){
		//if it did, change output success to true
		$output['success'] = true;
		//get the insert ID of the row that was added
		$new_id = mysqli_insert_id($conn);
		//add 'insertID' to $outut and set the value to the row's insert ID
		$output['insertID'] = $new_id;
	}
	else{
		//if not, add to the errors: 'insert error'
		$output['errors'][] = 'insert error';
	}
}

?>  