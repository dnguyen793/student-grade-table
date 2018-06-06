 <?php

require_once("mysql_credentials.php");

//check if you have all the data you need from the client-side call.  This should include the fields being changed and the ID of the student to be changed
//if not, add an appropriate error to errors
if(empty($_POST['id']) ||empty($_POST['newName']) || empty($_POST['newCourse']) || empty($_POST['newGrade'])){
	exit('missing data');
};
$id = $_POST['id'];
$newName = stripcslashes($_POST['newName']);
$newCourse = stripcslashes($_POST['newCourse']);
$newGrade = intval($_POST['newGrade']);

$sanitizedName = $conn->real_escape_string($newName);
$sanitizedCourse = $conn->real_escape_string($newCourse);

//write a query that updates the data at the given student ID.  
$query = "UPDATE student_data SET name = ?, grade = ?, course_name = ? WHERE id = ? ";
$stmt = $conn->prepare($query);
$stmt->bind_param("sisi", $sanitizedName, $newGrade, $sanitizedCourse, $id);
$stmt->execute();
$stmt->close();

preg_match_all('/(\S[^:]+): (\d+)/', $conn->info, $matches); 
$infoArr = array_combine ($matches[1], $matches[2]);
// var_export($infoArr);

//send the query to the database, store the result of the query into $result
//get value of matched rows
$result = reset($infoArr);
// print_r ($result);

$output = [
	'success' => false,
	'errors' => []
];

//check if $result is empty. 
if(!$result){ 
	//if it is, add 'database error' to errors
	$output['errors'][] = 'Database connection error';
}
else{
	//check if the number of matched rows is 1.  
	if( $result == 1 ){
		//if it did, change output success to true
		$output['success'] = true;
	}
	else{
		//if not, add to the errors: 'update error'
		$output['errors'][] = 'Update error - Cant update student';
	}
} 


?>