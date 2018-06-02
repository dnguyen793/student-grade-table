/* information about jsdocs:
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/**
 * Define all global variables here.  
 */
/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input: 
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */
var student_array = [];
/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
    $("#studentName").on('focusin', handleStudentNameInput());
    $("#course").on('focusin', handleCourseInput());
    $("#studentGrade").on('focusin', handleStudentGradeInput());

    addClickHandlersToElements();
    pullRecordsFromDB();
}

/***************************************************************************************************
* handleStudentNameInput
* @params {none} 
* @returns  {undefined}
*     
*/
function handleStudentNameInput(){
    let name = $('#studentName');
    let alert = $(".name-alert");

    name.on('focus', ()=>{
        alert.removeClass('hidden').addClass('show');
    });
    name.on('keydown', (event) => {

        if (event.keyCode >= 48 && event.keyCode <= 57) {
            event.preventDefault();
        }
    });

    name.on('keyup', (event) => {
        if(name.val().length > 2){
            $(".firstDiv").removeClass('has-error').addClass('has-success');
            alert.removeClass("alert-warning alert-danger").addClass("alert-success");
            $(".name-alert > span").removeClass("glyphicon-exclamation-sign").addClass("glyphicon glyphicon-ok-circle");
        }
        else{
            $(".firstDiv").removeClass('has-success').addClass('has-error');
            alert.removeClass("alert-success").addClass("alert-danger");
            $(".name-alert > span").removeClass("glyphicon glyphicon-ok-circle").addClass("glyphicon glyphicon-remove-circle");
        }
    });

    name.on('focusout', ()=>{
        alert.removeClass('show').addClass('hidden');
        if(name.val().length < 2){
            $(".firstDiv").removeClass('has-success').addClass('has-error');
        }
    });
}


/***************************************************************************************************
* handleCourseInput
* @params {none} 
* @returns  {undefined}
*     
*/
function handleCourseInput(){
    let course = $('#course');
    let alert = $(".course-alert");

    course.on('focus', ()=>{
        alert.removeClass('hidden').addClass('show');
    });

    course.on('keyup', (event) => {
        if(course.val().length > 2){
            $(".secondDiv").removeClass('has-error').addClass('has-success');
            alert.removeClass("alert-warning alert-danger").addClass("alert-success");
            $(".course-alert > span").removeClass("glyphicon-exclamation-sign").addClass("glyphicon glyphicon-ok-circle");
        }
        else{
            $(".secondDiv").removeClass('has-success').addClass('has-error');
            alert.removeClass("alert-success").addClass("alert-danger");
            $(".course-alert > span").removeClass("glyphicon glyphicon-ok-circle").addClass("glyphicon glyphicon-remove-circle");
        }
    });

    course.on('focusout', ()=>{
        alert.removeClass('show').addClass('hidden');
        if(course.val().length < 2){
            $(".secondDiv").removeClass('has-success').addClass('has-error');
        }
    });
}


/***************************************************************************************************
* handleStudentGradeInput
* @params {none} 
* @returns  {undefined}
*     
*/
function handleStudentGradeInput(){
    let grade = $('#studentGrade');
    let alert = $(".grade-alert");

    grade.on('focus', ()=>{
        alert.removeClass('hidden').addClass('show');
    });
    grade.on('keypress', (event) => {
        if ((event.keyCode < 48 || event.keyCode > 57)) {
            event.preventDefault();
        }
    });

    grade.on('keyup', (event) => {
        if( grade.val() !== "" && grade.val()<=100 ){
            $(".thirdDiv").removeClass('has-error').addClass('has-success');
            alert.removeClass("alert-warning alert-danger").addClass("alert-success");
            $(".grade-alert > span").removeClass("glyphicon-exclamation-sign").addClass("glyphicon glyphicon-ok-circle");
        }
        else{
            $(".thirdDiv").removeClass('has-success').addClass('has-error');
            alert.removeClass("alert-success").addClass("alert-danger");
            $(".grade-alert > span").removeClass("glyphicon glyphicon-ok-circle").addClass("glyphicon glyphicon-remove-circle");
        }
    });

    grade.on('focusout', ()=>{
        alert.removeClass('show').addClass('hidden');
        if(grade.val() === ""){
            $(".thirdDiv").removeClass('has-success').addClass('has-error');
        }
    });
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){
    $(".btn-success").on("click", handleAddClicked);
    $(".btn-default").on("click", handleCancelClick);
    // $(".btn-info").on("click", pullRecordsFromDB);
    $(".input-group").on("click", function () {
        $(".btn-success").text("Add").prop("disabled", false).css({'background-color':"", 'border':''});
    })
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @paxram {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(event){
    addStudent();
}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick(){
    clearAddStudentFormInputs();
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent(){
    var studentObj = {};
    var studentName = $("#studentName").val();
    var studentCourse = $("#course").val();
    var studentGrade = $("#studentGrade").val();

    if( !studentName || !studentCourse || !studentGrade || $(".firstDiv").hasClass('has-error') || $(".secondDiv").hasClass('has-error') || $(".thirdDiv").hasClass('has-error') ){
        console.log('theres has error');
        $(".firstDiv").removeClass('has-success').addClass('has-error');
        $(".secondDiv").removeClass('has-success').addClass('has-error');
        $(".thirdDiv").removeClass('has-success').addClass('has-error');

    }
    else{

        studentObj.name = studentName;
        studentObj.course_name = studentCourse;
        studentObj.grade = parseInt(studentGrade);

        student_array.push(studentObj);
        addingDataToServer(studentName, studentCourse, parseInt(studentGrade));
        
        // var result = addingDataToServer();
        $(".btn-success").text("Student Added").prop("disabled", true).css({'background-color':'#898989', 'border':'black'});
        clearAddStudentFormInputs();
        updateStudentList(student_array);
    }
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(){
    $("#studentName").val("");
    $("#course").val("");
    $("#studentGrade").val("");
}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom( studentObj ){
    var tableRow = $("<tr>", {
        'class': "studentRow",
    });
    var tableData = $("<td>");
    var studentName = $("<td>",{
        'class': "studentData",
        text: studentObj.name,
    });
    var studentCourse = $("<td>",{
        'class': "studentData",
        text: studentObj.course_name,
    });
    var studentGrade = $("<td>",{
        'class': "studentData",
        text: studentObj.grade,
    });

    var button = $("<button>", {
        //class is in quote because of es6
       'class': "btn btn-danger btn-xs",
        text: "Delete",
        //this anonymous function is to take advantage of the lexical scope
        on: {
            "click": function () {
                tableRow.remove();
                var studentIndex = student_array.indexOf(studentObj);
                console.log( "Deleting:", studentIndex, studentObj);
                deleteStudentFrServer(student_array[studentIndex]);

                student_array.splice(studentIndex, 1);


            }
        }
    });
    button[0].studentObj = studentObj;
    var deleteButton = tableData.append(button);
    tableRow.append(studentName, studentCourse, studentGrade, deleteButton);
    $(".student-list tbody").append(tableRow);
}

/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls   renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList( studentArray ){
    for(var index = 0; index < studentArray.length; index++){
        renderStudentOnDom(studentArray[index]);
    }
    var averageGrade = calculateGradeAverage( studentArray );
    renderGradeAverage( Math.floor(averageGrade) );
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage( studentArray ){
    var accumGrade = null;
    var studentCount = 0;
    for(var i = 0; i < studentArray.length; i++){
        accumGrade += parseFloat(studentArray[i].grade);
        studentCount++;
    }

    var avgGrade = accumGrade/studentCount;
    return avgGrade;
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage( averageGrade ){

    $(".avgGrade").text(averageGrade);
}

//Using the LearningFuze SGT API pull records from the DB using an AJAX call
// function pullRecordsFromDB() {
//     console.log('1) getData called from button click');
//     var ajaxConfig = {
//         dataType:'json',
//         method: 'post',
//         url: 'https://s-apis.learningfuze.com/sgt/get',
//         data: {
//           'api_key': 'X9BhkpbIMK'
//         },
//         success: function (data) {
//             console.log('2) AJAX Success function called, with the following result:', data);
//             var studentData = data;
//             pushStudentRecordsIntoArray(studentData);
//             updateStudentList(student_array);

//         },
//         error: function () {
//             console.log("Trouble getting data");
//         }
//     }

//     console.log('3) Making AJAX request');
//     $.ajax(ajaxConfig);

// }
// X9BhkpbIMK

// get all task data fr resources and then render tasks to dom
// input: none
// output: none
function pullRecordsFromDB(){
    $.ajax({
        url: "server/data.php?action=readAll",
        dataType: 'json',
        method: 'get',
        success: function(response){
            console.log('data', response);
            if(response.studentData.length>0){
                var studentData = response.studentData;
                pushStudentRecordsIntoArray(studentData);
                updateStudentList(studentData);            
            }
            else{
                console.log('something happened');
            }
        }
    });
}

// pushing the records into the student_array
function pushStudentRecordsIntoArray( studentData ) {
    for(var index = 0; index < studentData.length; index++){
        student_array.push(studentData[index]);
    }
    console.log('student_array:', student_array);
}

function addingDataToServer(name, course, grade) {
    let student = {
        name: name,
        course_name: course,
        grade: grade
    };
    var ajaxConfig = {
        dataType:'json',
        method: 'post',
        url: 'server/data.php?action=insert',
        data: student,
            // 'api_key': 'X9BhkpbIMK',
        //     name: student_array[student_array.length-1].name,
        //     course_name: student_array[student_array.length-1].course,
        //     grade: student_array[student_array.length-1].grade,
        success: function (response) {
            console.log('insert response:', response);
            student_array[student_array.length-1].id = response['id'];
            console.log('last student', student_array[student_array.length-1]);

        },
        error: function () {
            console.log("Trouble getting data");
        }
    }

    console.log('3) Making AJAX request');
    $.ajax(ajaxConfig);
}

function deleteStudentFrServer( student ) {
    console.log('del student:', student);
    var ajaxConfig = {
        dataType:'json',
        method: 'post',
        url: 'server/data.php?action=delete',
        data: {
            // 'api_key': 'X9BhkpbIMK',
            'student_id': student.id,
        },
        success: function (response) {
            console.log('del resp:', response);

        },
        error: function () {
            console.log("Trouble getting data");
        }
    }

    console.log('3) Making AJAX request');
    $.ajax(ajaxConfig);
}