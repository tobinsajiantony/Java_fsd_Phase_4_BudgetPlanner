
var vendorData = [
    {"vendorId" : 0, "vendorName" : "Microsoft", "vendorLocation" : "California"},
    {"vendorId" : 1, "vendorName" : "Google", "vendorLocation" : "California"},
    {"vendorId" : 2, "vendorName" : "Facebook", "vendorLocation" : "California"},
]


var currentVendorId = vendorData.length;



// localstorage allows us to persist key value pairs in a way that would survive page refreshes, navigation, and user closing/reopening browser.
// localstorage has limits to the size of each object stored.   

localStorage.setItem("vendorData", vendorData)

var myDataTest = localStorage.getItem("vendorData")



function CreateTableFromJSON() {    
    

    // EXTRACT VALUE FOR HTML HEADER. 
    // ('Deal ID', 'Deal Name', 'Category' and 'Price')
    var col = ['vendorName', 'vendorLocation'];

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    table.setAttribute('class', 'table table-striped')

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
    var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = 'Action';
        tr.appendChild(th);
    var th = document.createElement("th");
        th.innerHTML = 'Action';
        tr.appendChild(th);

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < vendorData.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = vendorData[i][col[j]];
        }
        // Insert Extra Cell for the Delete Icon
        //TODO: Complete this
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = '<button onclick="initiateUpdate(' + vendorData[i].vendorId + ')"> <img src="images/4.png" style="height:30px;max-width:20px;"> </button>'
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = '<button onclick="DeleteRow(' + vendorData[i].vendorId + ')"> <img src="images/delete.png" style="height:30px;max-width:20px;"> </button>'

    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function AddNewDeal() {
    var vendorName = document.getElementById("vendorName").value;
    var vendorLocation = document.getElementById("vendorLocation").value;
    var vendorId = document.getElementById("vendorId").value;


    document.getElementById("vendorName").value = "";
    document.getElementById("vendorLocation").value = "";
    document.getElementById("vendorId").value = "";
   
    console.log(vendorId);


    if(vendorId === ''){
    InsertRow(vendorName, vendorLocation);
    }
    else{
        console.log('hit');
    updateRow(vendorId, vendorName, vendorLocation);
    }
    

}

function InsertRow(vendorName, vendorLocation) {
    vendorData.push({"vendorId": currentVendorId, "vendorName" : vendorName, "vendorLocation" : vendorLocation})
    currentVendorId++;
    $('#exampleModal').modal('hide')
    CreateTableFromJSON();

}

function initiateUpdate(vendorId){
    for( var i = 0; i < vendorData.length; i++){ 
    
        if ( vendorData[i].vendorId === parseInt(vendorId)) { 
            document.getElementById("vendorName").value = vendorData[i].vendorName;
            document.getElementById("vendorLocation").value = vendorData[i].vendorLocation;
            document.getElementById("vendorId").value = vendorData[i].vendorId;
            $('#exampleModal').modal('show');
        }
    }
}

function updateRow(vendorId, vendorName, vendorLocation){
    console.log(vendorId)
    for( var i = 0; i < vendorData.length; i++){ 
        console.log(vendorData[i].vendorId)
    
        if ( vendorData[i].vendorId === parseInt(vendorId)) {
            console.log('hitt')
            vendorData[i].vendorName = vendorName;
            vendorData[i].vendorLocation = vendorLocation;
        }
        $('#exampleModal').modal('hide')
        CreateTableFromJSON();
    }
}

function DeleteRow(vendorId) {
     
    for( var i = 0; i < vendorData.length; i++){ 
    
        if ( vendorData[i].vendorId === vendorId) { 
    
            vendorData.splice(i, 1); 
        }
    
    }
    CreateTableFromJSON();
}

