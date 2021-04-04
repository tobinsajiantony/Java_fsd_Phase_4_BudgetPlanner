
var myData = [
    {"dealId" : 0, "client_name" : "Microsoft", "project_name" : "Apollo Project", "project_manager" : "Mary", "project_cost" : 1000},
    {"dealId" : 1, "client_name" : "Intel", "project_name" : "Hermes Project", "project_manager" : "Bob", "project_cost" : 10000},
    {"dealId" : 2, "client_name" : "Apple", "project_name" : "Zeus Project", "project_manager" : "Jane", "project_cost" : 100000}
]


var currentDealId = myData.length;



// localstorage allows us to persist key value pairs in a way that would survive page refreshes, navigation, and user closing/reopening browser.
// localstorage has limits to the size of each object stored.   

localStorage.setItem("myData", "test")

var myDataTest = localStorage.getItem("myData")



function CreateTableFromJSON() {    
    

    // EXTRACT VALUE FOR HTML HEADER. 
    // ('Deal ID', 'Deal Name', 'Category' and 'Price')
    var col = ['client_name', 'project_name', 'project_manager', 'project_cost'];

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
    for (var i = 0; i < myData.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myData[i][col[j]];
        }
        // Insert Extra Cell for the Delete Icon
        //TODO: Complete this
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = '<button onclick="initiateUpdate(' + myData[i].dealId + ')"> <img src="images/4.png" style="height:30px;max-width:20px;"> </button>'
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = '<button onclick="DeleteRow(' + myData[i].dealId + ')"> <img src="images/delete.png" style="height:30px;max-width:20px;"> </button>'

    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function AddNewDeal() {
    var clientName = document.getElementById("clientNameInput").value;
    var projectName = document.getElementById("projectNameInput").value;
    var projectManager = document.getElementById("projectManagerInput").value;
    var projectCost = document.getElementById("projectCostInput").value;
    var dealId = document.getElementById("dealId").value;


    document.getElementById("clientNameInput").value = "";
    document.getElementById("projectNameInput").value = "";
    document.getElementById("projectManagerInput").value = "";
    document.getElementById("projectCostInput").value = "";
    document.getElementById("dealId").value = "";

    console.log(dealId);


    if(dealId === ''){
    InsertRow(currentDealId, clientName, projectName, projectManager, projectCost);
    }
    else{
        console.log('hit');
    updateRow(dealId, clientName, projectName, projectManager, projectCost);
    }
    

}

function InsertRow(currentDealId, clientName, projectName, projectManager, projectCost) {
    myData.push({"dealId": currentDealId, "client_name" : clientName, "project_name" : projectName, "project_manager" : projectManager, "project_cost" : projectCost})
    currentDealId++;
    $('#exampleModal').modal('hide')
    CreateTableFromJSON();

}

function initiateUpdate(dealId){
    for( var i = 0; i < myData.length; i++){ 
    
        if ( myData[i].dealId === parseInt(dealId)) { 
            document.getElementById("clientNameInput").value = myData[i].client_name;
            document.getElementById("projectNameInput").value = myData[i].project_name;
            document.getElementById("projectManagerInput").value = myData[i].project_manager;
            document.getElementById("projectCostInput").value = myData[i].project_cost;
            document.getElementById("dealId").value = myData[i].dealId;
            $('#exampleModal').modal('show');
        }
    }
}

function updateRow(dealId, clientName, projectName, projectManager, projectCost){
    console.log(dealId)
    for( var i = 0; i < myData.length; i++){ 
        console.log(myData[i].dealId)
    
        if ( myData[i].dealId === parseInt(dealId)) {
            console.log('hitt')
            myData[i].client_name = clientName;
            myData[i].project_name = projectName;
            myData[i].project_manager = projectManager;
            myData[i].project_cost = projectCost;
        }
        $('#exampleModal').modal('hide')
        CreateTableFromJSON();
    }
}

function DeleteRow(dealId) {
     
    for( var i = 0; i < myData.length; i++){ 
    
        if ( myData[i].dealId === dealId) { 
    
            myData.splice(i, 1); 
        }
    
    }
    CreateTableFromJSON();
}

