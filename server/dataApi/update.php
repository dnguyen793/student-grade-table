 <?php

require_once("mysql_credentials.php");

//check if you have all the data you need from the client-side call.  This should include the fields being changed and the ID of the student to be changed
//if not, add an appropriate error to errors
if(empty($_POST['id']) ||empty($_POST['newName']) || empty($_POST['newCourse']) || empty($_POST['newGrade'])){
	exit('missing data');
};
$id = $_POST['id'];
$newName = $_POST['newName'];
$newCourse = $_POST['newCourse'];
$newGrade = $_POST['newGrade'];

//write a query that updates the data at the given student ID.  
$query = "UPDATE `student_data` SET `name`='$newName',`grade`='$newGrade',`course_name`='$newCourse' WHERE id = '$id'";

//send the query to the database, store the result of the query into $result
$result = mysqli_query($conn, $query);
$output = [
	'success' => false,
	'errors' => []
];

//check if $result is empty. 
if(!$result){ 
	//if it is, add 'database error' to errors
	$output['errors'][] = 'database error';
}
else{
	//check if the number of affected rows is 1.  
	if( $row = mysqli_affected_rows($conn) === 1 ){
		//if it did, change output success to true
		$output['success'] = true;
	}
	else{
		//if not, add to the errors: 'update error'
		$output['errors'][] = 'update error';
	}
} 


?>