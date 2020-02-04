// /**
//  * Script handlles displaying successfull post modal after a succesful post is made
//  * 
//  * @author Ibraheem Chaudry
//  */

// //Checks if error messages need to be displayed in modal on page refresh
// $(document).ready(function() {

//     //This variable is being set when login function is called
//     var itemPosted = localStorage.getItem("itemPosted")

//     //If errors need to be displayed pop open modal
//     if(itemPosted){
//         //Clear local storage after diplaying the modal once
//         localStorage.clear()
//         $("#successfulPost").modal();
//     }
// });


// $(function(){
//     $('#item-post-form').on('submit', function(e){
//         e.preventDefault()
//         var data= $(this).serialize()

//         console.log("Function being reached")

//         //Post function to call on login form submit
//         $.post('/postingform', data, function(result){
//             console.log("Post function being reached")
//         //     if(result.valid){
                       
//         //         //If login is invalid then boolean to display errors is set to true and is saved in local storage
//         //         var itemPosted=true
//         //         localStorage.setItem("itemPosted", itemPosted);

//         //         sessionStorage.clear()
                
//         //         //Refresh Page
//         //         location.reload(true)                
//         //     }

//         // else if(result.valid ==false){
//         //     console.log("The post was unsuccesful")
        
//         //     location.reload(true)
//         // }
//         })
//     })
// })
