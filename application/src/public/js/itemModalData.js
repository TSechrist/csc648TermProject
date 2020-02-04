/**
 * These functions are used to send item details to the popup modal for displaying details 
 * 
 * @author Ibraheem Chaudry
 */

$(document).on("click", ".openModal", function () {
    //Image source
    var itemImageSrc ="/post_images/resized/"+ $(this).data('img');
    $(".modal-body #modalImage").attr("src", itemImageSrc);

    //Name
    var name= $(this).data('name')
    document.getElementById("itemHeader").innerHTML = name

    // Price
    var price= "$ " + $(this).data('price')
    document.getElementById("itemPrice").innerHTML= price

    //Description
    var description= $(this).data('description')
    document.getElementById("itemDescription").innerHTML= description

    //Item Id
    var itemid= $(this).data('itemid')
    $(".modal-footer #modal-itemid").attr("value", itemid);
});

