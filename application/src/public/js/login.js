/**
 * This Javascript file pops up the login modal in the case there is an error in user login and displays the error message. 
 * If user is succesfully logged in the page is refreshed and login button changes to user dashboard drop down
 * 
 * @author Ibraheem Chaudry
 */

 //Checks if error messages need to be displayed in modal on page refresh
$(document).ready(function() {

    //This variable is being set when login function is called
    var showLoginError = localStorage.getItem("showLoginError")

    //If errors need to be displayed pop open modal
    if(showLoginError){
        //Clear local storage after diplaying the modal once
        localStorage.clear()
        $("#loginModal").modal();
    }
});


$(function(){
    $('#login-form').on('submit', function(e){
        e.preventDefault()
        var data= $(this).serialize()

        //Post function to call on login form submit
        $.post('/auth', data, function(result){
            console.log("Was the validation succesful: " + result.valid)
            if(result.valid==false){
                       
                //If login is invalid then boolean to display errors is set to true and is saved in local storage
                var showLoginError=true
                localStorage.setItem("showLoginError", showLoginError);
                
                //Refresh Page
                location.reload(true)                
            }

        else if(result.valid){
            location.reload(true)
        }
        })
    })
})


