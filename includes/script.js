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
*/
function handleStudentNameInput(){
    let outerDiv = $("#firstDiv");
    let name = $('#studentName');
    let alert = $("#name-alert");

    name.on('focus', ()=>{
        alert.removeClass('hidden').addClass('show');
    });
    name.on('keydown', (event) => {
        if( event.keyCode === 32){
            if($('#studentName').val() === ""){
                event.preventDefault();
            }
        }

        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 186 && event.keyCode <= 192) || (event.keyCode >= 219 && event.keyCode <= 222)) {
            event.preventDefault();
        }
    });

    name.on('keyup', (event) => {
        if(name.val().length > 2){
            outerDiv.removeClass('has-error').addClass('has-success');
            alert.removeClass("alert-warning alert-danger").addClass("alert-success");
            alert.removeClass('show').addClass('hidden');

            $("#name-alert > span").removeClass("glyphicon-exclamation-sign").addClass("glyphicon glyphicon-ok-circle");
        }
        else{
            outerDiv.removeClass('has-success').addClass('has-error');
            alert.removeClass("alert-success").addClass("alert-danger");
            $("#name-alert > span").removeClass("glyphicon glyphicon-ok-circle").addClass("glyphicon glyphicon-remove-circle");
        }
    });

    name.on('focusout', ()=>{
        alert.removeClass('show').addClass('hidden');
        if(name.val().length < 2){
            outerDiv.removeClass('has-success').addClass('has-error');
            alert.removeClass("alert-success").addClass("alert-danger");
            $("#name-alert > span").removeClass("glyphicon glyphicon-ok-circle").addClass("glyphicon glyphicon-remove-circle");
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
    let outerDiv = $("#secondDiv");
    let course = $('#course');
    let alert = $("#course-alert");

    course.on('keydown', (event) => {
        if ( event.keyCode === 191 || event.keyCode === 192 || (event.keyCode >= 186 && event.keyCode <= 188) || (event.keyCode >= 219 && event.keyCode <= 221)) {
            event.preventDefault();
        }
    });

    course.on('focus', ()=>{
        alert.removeClass('hidden').addClass('show');
    });

    course.on('keyup', (event) => {
        if(course.val().length > 2){
            outerDiv.removeClass('has-error').addClass('has-success');
            alert.removeClass("alert-warning alert-danger").addClass("alert-success");
            alert.removeClass('show').addClass('hidden');

            $("#course-alert > span").removeClass("glyphicon-exclamation-sign").addClass("glyphicon glyphicon-ok-circle");
        }
        else{
            outerDiv.removeClass('has-success').addClass('has-error');
            alert.removeClass("alert-success").addClass("alert-danger");
            $("#course-alert > span").removeClass("glyphicon glyphicon-ok-circle").addClass("glyphicon glyphicon-remove-circle");
        }
    });

    course.on('focusout', ()=>{
        alert.removeClass('show').addClass('hidden');
        if(course.val().length < 2){
            outerDiv.removeClass('has-success').addClass('has-error');
            alert.removeClass("alert-success").addClass("alert-danger");
            $("#course-alert > span").removeClass("glyphicon glyphicon-ok-circle").addClass("glyphicon glyphicon-remove-circle");
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
    let outerDiv = $("#thirdDiv");
    let grade = $('#studentGrade');
    let alert = $("#grade-alert");

    grade.on('focus', ()=>{
        alert.removeClass('hidden').addClass('show');
    });
    grade.on('keypress', (event) => {
        if ( (event.keyCode < 48 || event.keyCode > 57) ) {
            event.preventDefault();
        }
    });

    grade.on('keyup', (event) => {
        if( grade.val() !== "" && grade.val()<=100 ){
            outerDiv.removeClass('has-error').addClass('has-success');
            alert.removeClass("alert-warning alert-danger").addClass("alert-success");
            alert.removeClass('show').addClass('hidden');

            $("#grade-alert > span").removeClass("glyphicon-exclamation-sign").addClass("glyphicon glyphicon-ok-circle");
        }
        else{
            outerDiv.removeClass('has-success').addClass('has-error');
            alert.removeClass("alert-success").addClass("alert-danger");
            $("#grade-alert > span").removeClass("glyphicon glyphicon-ok-circle").addClass("glyphicon glyphicon-remove-circle");
        }
    });

    grade.on('focusout', ()=>{
        alert.removeClass('show').addClass('hidden');
        if(grade.val() === ""){
            outerDiv.removeClass('has-success').addClass('has-error');
            alert.removeClass("alert-success").addClass("alert-danger");
            $("#grade-alert > span").removeClass("glyphicon glyphicon-ok-circle").addClass("glyphicon glyphicon-remove-circle");
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
    $(".addBtn").on("click", handleAddClicked);
    $(".btn-default").on("click", handleCancelClick);

}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @paxram {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(event){
    $(".displayError").empty();
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
    cleanUpAddForm();
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent(){
    var studentName = $("#studentName").val();
    var studentCourse = $("#course").val();
    var studentGrade = $("#studentGrade").val();

    if( !studentName ){
        $("#firstDiv").removeClass('has-success').addClass('has-error');
    }
    if( !studentCourse ){
        $("#secondDiv").removeClass('has-success').addClass('has-error');
    }
    if( !studentGrade ){
        $("#thirdDiv").removeClass('has-success').addClass('has-error');

    }
    if( $("#firstDiv").hasClass('has-error') || $("#secondDiv").hasClass('has-error') || $("#thirdDiv").hasClass('has-error') ){
        let error = $("<h5>", {
            text: "Please correct the above error!",
            style: "color: red"
        });
        $(".displayError").append(error);

        setInterval(()=>{
            $(".displayError").empty();            
        }, 2300);
    
    }
    else{

        addingDataToServer(studentName, studentCourse, parseInt(studentGrade));
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
    let tableRow = $("<tr>", {
        'class': "studentRow",
    });
    let tableData = $("<td>", {
        "class": "operations"
    });
    let studentName = $("<td>",{
        'class': "studentData",
        text: studentObj.name,
    });
    let studentCourse = $("<td>",{
        'class': "studentData",
        text: studentObj.course_name,
    });
    let studentGrade = $("<td>",{
        'class': "studentData",
        text: studentObj.grade,
    });

    let delButton = $("<button>", {
        //class is in quote because of es6
       'class': "btn btn-danger btn-xs",
        text: "Delete",
        //this anonymous function is to take advantage of the lexical scope
        on: {
            "click": function () {
                let studentIndex = student_array.indexOf(studentObj);
                handleDeleteStudentButton(studentObj, studentIndex);
            }
        }
    });

    let editBtn = $("<button>", {
        'class': "btn btn-warning btn-xs",
        text: "Edit",
        // style: "margin-right: 10px",
        on: {
            "click": () => {
                handleEditButtonClick(studentObj);
            }
        }
    });

    let buttonContainer = $("<div>", {
        "class": "buttonContainer"
    });

    buttonContainer.append(editBtn, delButton);
    let buttons = tableData.append(buttonContainer);
    tableRow.append(studentName, studentCourse, studentGrade, buttons);
    $(".student-list tbody").append(tableRow);
}

function handleEditButtonClick(studentObj){
    displayEditingModal(studentObj);
    displayStudentInfoInsideModal( studentObj.name, studentObj.course_name, studentObj.grade );

}

function handleDeleteStudentButton(studentObj, studentIndex){
    displayDeletingModal( studentObj, studentIndex );

}

/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls   renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList( studentArray ){
    $(".student-list tbody").empty();

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
    let avgGrade = null;
    for(var i = 0; i < studentArray.length; i++){
        accumGrade += parseFloat(studentArray[i].grade);
        studentCount++;
    }


    if( !studentCount ){
        avgGrade = 0;
    }
    else{
        avgGrade = accumGrade/studentCount;
    }
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


function pullRecordsFromDB(){
    $.ajax({
        url: "server/data.php?action=readAll",
        dataType: 'json',
        method: 'get',
        success: function(response){
            console.log('data', response);
            if(response.success){
            
                if(response.studentData.length>0){
                    var studentData = response.studentData;
                    pushStudentRecordsIntoArray(studentData);
                    updateStudentList(studentData);            
                }
            }
            else{
                $(".displayError").empty();

                let error = $("<h5>", {
                    text: response.errors[0],
                    style: "color: red"
                });
                $(".displayError").append(error);
                setInterval( ()=>{
                    $(".displayError").empty();
                }, 2300);
            }
        },
        error: function () {
            $(".displayError").empty();
            let error = $("<h5>", {
                text: response.errors[0],
                style: "color: red"
            });
            $(".displayError").append(error);
            setInterval( ()=>{
                $(".displayError").empty();
            }, 2300);
        }

    });
}


/***************************************************************************************************
 * pushStudentRecordsIntoArray - pushing the student records from db into the student_array
 * @param: {studentObject}
 * @returns {undefined}
 */
function pushStudentRecordsIntoArray( studentData ) {
    for(var index = 0; index < studentData.length; index++){
        student_array.push(studentData[index]);
    }
}

/***************************************************************************************************
 * addingDataToServer
 * @param: {name, course, grade}
 * @returns {undefined}
 */
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

        success: function (response) {
            console.log('insert response:', response);
            if(response.success){
   
                student_array.push(student);
                student_array[student_array.length-1].id = response['id'] ;
                console.log('last student', student_array[student_array.length-1]);
                
                $(".displayError").empty();
                let message = $("<h5>", {
                    text: "Student Successfully Added!",
                    style: "color: green"
                });
                $(".displayError").append(message);

                setInterval( ()=>{
                    $(".displayError").empty();
                }, 2300);

                clearAddStudentFormInputs();
                cleanUpAddForm();
                updateStudentList(student_array);
            }
            else{
                $(".displayError").empty();

                let error = $("<h5>", {
                    text: response.errors[0],
                    style: "color: red"
                });
                $(".displayError").append(error);
                setInterval( ()=>{
                    $(".displayError").empty();
                }, 2300);
            }
        },
        error: function () {
            $(".displayError").empty();

            let error = $("<h5>", {
                text: response.errors[0],
                style: "color: red"
            });
            $(".displayError").append(error);
            setInterval( ()=>{
                $(".displayError").empty();
            }, 2300);
        }
    }

    $.ajax(ajaxConfig);
}

/***************************************************************************************************
 * deleteStudentFrServer
 * @param: {student, studentIndex}
 * @returns {undefined}
 */
function deleteStudentFrServer( student, studentIndex ) {
    console.log('del student:', student.id, studentIndex);
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
            if(response.success){
                student_array.splice(studentIndex, 1);
                updateStudentList( student_array );
                closeDeletingModal();
            }
            else{
                $(".displayError").empty();

                let error = $("<h5>", {
                    text: response.errors[0],
                    style: "color: red"
                });
                $(".del-modal-body").append(error);
                setInterval( ()=>{
                    $(".displayError").empty();
                }, 2300);
            }

        },
        error: function () {
            $(".displayError").empty();

            let error = $("<h5>", {
                text: response.errors[0],
                style: "color: red"
            });
            $(".del-modal-body").append(error);
            setInterval( ()=>{
                $(".displayError").empty();
            }, 2300);
        }
    }

    $.ajax(ajaxConfig);
}


/***************************************************************************************************
 * displayStudentInfoInsideModal
 * @param: {studentName, studentCourse, studentGrade}
 * @returns {undefined} none
 */
function displayStudentInfoInsideModal( name, course, grade){
    $("#newStudentName").val(name);
    $("#newStudentCourse").val(course);
    $("#newStudentGrade").val(grade);
}   

/***************************************************************************************************
 * handleUpdatingNewStudentInfo
 * @param: {studentObj}
 * @returns {undefined}
 */
function handleUpdatingNewStudentInfo(studentObj){
    var newData = getNewStudentDataFromModal();
    updateStudentFrServer( studentObj.id, newData.newName, newData.newCourse, newData.newGrade );
}

/***************************************************************************************************
 * getNewStudentDataFromModal
 * @param: {none}
 * @returns {name, course, grade}
 */
function getNewStudentDataFromModal(){
    let newName = $("#newStudentName").val();
    let newCourse = $("#newStudentCourse").val();
    let newGrade = $("#newStudentGrade").val();
    return {newName, newCourse, newGrade};
}

/***************************************************************************************************
 * updateStudentFrServer - update the server with new student info
 * @param: {id, name, course, grade}
 * @returns {undefined}
 */
function updateStudentFrServer( id, name, course, grade ) {
    var ajaxConfig = {
        dataType:'json',
        method: 'post',
        url: 'server/data.php?action=update',
        data: {
            // 'api_key': 'X9BhkpbIMK',
            id: id,
            newName: name,
            newCourse: course,
            newGrade: grade
        },
        success: function (response) {
            console.log('update resp:', response);
            console.log('new student data:', id, name, course, grade);

            if(response.success){
                for(let i = 0; i < student_array.length; i++){
                    if(id === student_array[i].id){
                        student_array[i].name = name;
                        student_array[i].course_name = course;
                        student_array[i].grade = grade;
                    }
                }
                updateStudentList( student_array );
                closeEditingModal();
            }
            else{
                $(".modal-body .error").empty();

                let error = $("<h5>", {
                    text: response.errors[0],
                    style: "color: red"
                });
                $(".modal-body .error").append(error);
                setInterval( ()=>{
                    $(".modal-body .error").empty();
                }, 2300);
            }


        },
        error: function () {
            console.log("Trouble getting data");
            $(".modal-body .error").empty();

            let error = $("<h5>", {
                text: response.errors[0],
                style: "color: red"
            });
            $(".modal-body .error").append(error);
            setInterval( ()=>{
                $(".modal-body .error").empty();
            }, 2300);
        }
    }

    $.ajax(ajaxConfig);
}

/***************************************************************************************************
* displayEditingModal
* @params {none} 
* @returns  {undefined}
*/
function displayEditingModal(studentObj){
    $("#newStudentName").on('focusin', handleStudentNameInputOnEditModal());
    $("#newStudentCourse").on('focusin', handleCourseInputOnEditModal());
    $("#newStudentGrade").on('focusin', handleStudentGradeInputOnEditModal());

    $(".modal-footer").empty();
    let cancel = $("<button>", {
        "class": "btn btn-secondary cancelEditBtn",
        text: "Cancel"
    });
    let save = $("<button>", {
        "class": "btn btn-success saveBtn",
        text: "Save"
    });
    $(".modal-footer").append(cancel, save);

    let modal = $('#updateModal').css('display','block');

    $(".cancelEditBtn").on("click", closeEditingModal);
    $(".saveBtn").on("click", () => {
        handleUpdatingNewStudentInfo(studentObj);
    });
}

/***************************************************************************************************
* closeEditingModal - close displaying model
* @params {none} 
* @returns  {undefined}
*/
function closeEditingModal(){
    let modal = $('#updateModal').css('display','none');
    cleanUpAddFormOnEditModal();
}

/***************************************************************************************************
* displayDeletingModal
* @params {none} 
* @returns  {undefined}
*/
function displayDeletingModal( studentObj, studentIndex ){
    $(".del-modal-body").empty();
    $("#del-modal-footer").empty();

    let name = $("<h5>", {
        text: 'Name: ' + studentObj.name
    });
    let grade = $("<h5>", {
        text: 'Grade: ' + studentObj.grade
    })
    let course = $("<h5>", {
        text: 'Course: ' + studentObj.course_name,
    })
    $(".del-modal-body").append(name, course, grade);

    let cancelBtn = $("<button>", {
        text: "Cancel",
        "class": "btn btn-secondary cancelDelBtn"
    });
    let delBtn = $("<button>", {
        text: "Delete",
        "class": "btn btn-danger delBtn"
    })
    $("#del-modal-footer").append(cancelBtn, delBtn);

    let modal = $('#delModal').css('display','block');


    $(".cancelDelBtn").on("click", closeDeletingModal);
    $(".delBtn").on("click", ()=>{
        console.log( "Deleting:", studentIndex, studentObj);
        deleteStudentFrServer(student_array[studentIndex], studentIndex);

    });

}

/***************************************************************************************************
* closeDeletingModal - close displaying model
* @params {none} 
* @returns  {undefined}
*/
function closeDeletingModal(){
    let modal = $('#delModal').css('display','none');
}

/***************************************************************************************************
* cleanUpAddForm - restore the form to its original state
* @params {none} 
* @returns  {undefined}
*/

function cleanUpAddForm(){
    $("#firstDiv, #name-alert, #name-alert > span").removeAttr("class");
    $("#secondDiv, #course-alert, #course-alert > span").removeAttr("class");
    $("#thirdDiv, #grade-alert, #grade-alert > span").removeAttr("class");

    $("#firstDiv, #secondDiv, #thirdDiv").addClass("input-group");
    $("#name-alert, #course-alert, #grade-alert").addClass("alert alert-warning hidden");
    $("#name-alert > span, #course-alert > span, #grade-alert > span").addClass("glyphicon glyphicon-exclamation-sign");

}

function handleStudentNameInputOnEditModal(){
    let outerDiv = $("#nameDiv");
    let name = $('#newStudentName');
    let alert = $("#edit-name-alert");

    name.on('keydown', (event) => {
        if( event.keyCode === 32){
            if(name.val() === ""){
                event.preventDefault();
            }
        }

        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 186 && event.keyCode <= 192) || (event.keyCode >= 219 && event.keyCode <= 222)) {
            event.preventDefault();
        }
    });

    name.on('keyup', (event) => {
        if(name.val().length > 2){
            outerDiv.removeClass('has-error').addClass('has-success');
            alert.removeClass("alert-warning alert-danger").addClass("alert-success");
            alert.removeClass('show').addClass('hidden');

            $("#edit-name-alert > span").removeClass("glyphicon-exclamation-sign").addClass("glyphicon glyphicon-ok-circle");
        }
        else{
            alert.removeClass('hidden').addClass('show');
            outerDiv.removeClass('has-success').addClass('has-error');
            alert.removeClass("alert-success").addClass("alert-danger");
            $("#edit-name-alert > span").removeClass("glyphicon glyphicon-ok-circle").addClass("glyphicon glyphicon-remove-circle");
        }
    });

    name.on('focusout', ()=>{
        alert.removeClass('show').addClass('hidden');
        if(name.val().length < 2 || name.val()===""){
            outerDiv.removeClass('has-success').addClass('has-error');
            alert.removeClass("alert-success").addClass("alert-danger");
            $("#edit-name-alert > span").removeClass("glyphicon glyphicon-ok-circle").addClass("glyphicon glyphicon-remove-circle");
        }
    });
}


function handleCourseInputOnEditModal(){
    let outerDiv = $("#courseDiv");
    let course = $('#newStudentCourse');
    let alert = $("#edit-course-alert");

    course.on('keydown', (event) => {
        if ( event.keyCode === 191 || event.keyCode === 192 || (event.keyCode >= 186 && event.keyCode <= 188) || (event.keyCode >= 219 && event.keyCode <= 221)) {
            event.preventDefault();
        }
    });

    course.on('keyup', (event) => {
        if(course.val().length > 2){
            outerDiv.removeClass('has-error').addClass('has-success');
            alert.removeClass("alert-warning alert-danger").addClass("alert-success");
            alert.removeClass('show').addClass('hidden');

            $("#edit-course-alert > span").removeClass("glyphicon-exclamation-sign").addClass("glyphicon glyphicon-ok-circle");
        }
        else{
            alert.removeClass('hidden').addClass('show');
            outerDiv.removeClass('has-success').addClass('has-error');
            alert.removeClass("alert-success").addClass("alert-danger");
            $("#edit-course-alert > span").removeClass("glyphicon glyphicon-ok-circle").addClass("glyphicon glyphicon-remove-circle");
        }
    });

    course.on('focusout', ()=>{
        alert.removeClass('show').addClass('hidden');
        if(course.val().length < 2 || course.val()===""){
            outerDiv.removeClass('has-success').addClass('has-error');
            alert.removeClass("alert-success").addClass("alert-danger");
            $("#edit-course-alert > span").removeClass("glyphicon glyphicon-ok-circle").addClass("glyphicon glyphicon-remove-circle");
        }
    });
}

function handleStudentGradeInputOnEditModal(){
    let outerDiv = $("#gradeDiv");
    let grade = $('#newStudentGrade');
    let alert = $("#edit-grade-alert");

    grade.on('keypress', (event) => {
        if ( (event.keyCode < 48 || event.keyCode > 57) ) {
            event.preventDefault();
        }
    });

    grade.on('keyup', (event) => {
        if( grade.val() !== "" && grade.val()<=100 ){
            outerDiv.removeClass('has-error').addClass('has-success');
            alert.removeClass("alert-warning alert-danger").addClass("alert-success");
            alert.removeClass('show').addClass('hidden');

            $("#edit-grade-alert > span").removeClass("glyphicon-exclamation-sign").addClass("glyphicon glyphicon-ok-circle");
        }
        else{
            alert.removeClass('hidden').addClass('show');
            outerDiv.removeClass('has-success').addClass('has-error');
            alert.removeClass("alert-success").addClass("alert-danger");
            $("#edit-grade-alert > span").removeClass("glyphicon glyphicon-ok-circle").addClass("glyphicon glyphicon-remove-circle");
        }
    });

    grade.on('focusout', ()=>{
        alert.removeClass('show').addClass('hidden');
        if(grade.val() === ""){
            outerDiv.removeClass('has-success').addClass('has-error');
            alert.removeClass("alert-success").addClass("alert-danger");
            $("#edit-grade-alert > span").removeClass("glyphicon glyphicon-ok-circle").addClass("glyphicon glyphicon-remove-circle");
        }
    });
}

function cleanUpAddFormOnEditModal(){
    $("#nameDiv, #edit-name-alert, #edit-name-alert > span").removeAttr("class");
    $("#courseDiv, #edit-course-alert, #edit-course-alert > span").removeAttr("class");
    $("#gradeDiv, #edit-grade-alert, #edit-grade-alert > span").removeAttr("class");

    $("#nameDiv, #courseDiv, #gradeDiv").addClass("input-group");
    $("#edit-name-alert, #edit-course-alert, #edit-grade-alert").addClass("alert alert-warning hidden");
    $("#edit-name-alert > span, #edit-course-alert > span, #edit-grade-alert > span").addClass("glyphicon glyphicon-exclamation-sign");

}