var bookMarkInput = document.getElementById("bookMarkInput")
var siteUrlInput = document.getElementById("siteUrlInput")
var bookMarkWrapper = document.getElementById("demo")
var allBookMarks = []
allBookMarks = JSON.parse(localStorage.getItem("allBookMarks")) || [];
displayData()


function addBookMark(){
    if(validateAll()== true){
        var bookMark = {
            bookMarkName :bookMarkInput.value ,
            bookMarkUrl : siteUrlInput.value ,
        }
        allBookMarks.push(bookMark)
        displayData()
        localStorage.setItem("allBookMarks" , JSON.stringify(allBookMarks))
        clearForm()
        console.log("valid");
    }else{
        console.log("notvalid");
        Swal.fire({
            icon: "error",
            title: "Site Name or Url is not valid, Please follow the rules below :",
            text: "Site name must contain at least 3 characters and Site URL must be a valid one",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }

}
function displayData() {
    var cartona ='';
    for(var i = 0 ; i<allBookMarks.length ; i++){
        cartona+= ` <tr>
            <th scope="row">${i+1}</th>
            <td>${allBookMarks[i].bookMarkName}</td>
            <td><button class="btn btn-success"><a href="${allBookMarks[i].bookMarkUrl}"><i class="fa-solid fa-eye"></i>Visit</a></button> </td>
            <td><button class="btn btn-danger" onclick="deleteBookMark (${i})" >delete</button></td>
            </tr>
        `
    }
    bookMarkWrapper.innerHTML=cartona
}
function deleteBookMark (index){
    allBookMarks.splice(index ,1)
    displayData()
    localStorage.setItem("allBookMarks" , JSON.stringify(allBookMarks))
}
function clearForm(){
    bookMarkInput.value=null
    siteUrlInput.value=null
}
function validate(regex , inputValue ,input){
    if (regex.test(inputValue) == true) {
        input.classList.replace('is-invalid','is-valid')
        return true;
    } else {
        input.classList.add('is-invalid')
        return false;
    }
}
function validateAll(){
    if(
        validate( /^\w{3,20}$/ ,bookMarkInput.value ,bookMarkInput) &&
        validate( /^(www.)\w{3,40}(.com)?$/ ,siteUrlInput.value ,siteUrlInput)
    ){
        return true;
    }else{
        return false;
    }
}