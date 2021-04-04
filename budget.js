
var budgetData = [
    {"budgetId" : 0, "budgetName" : "budget Microsoft", "projectName" : "Microsoft Cortana", "budgetCost" : "1000"},
    {"budgetId" : 1, "budgetName" : "budget Google", "projectName" : "Google Lens", "budgetCost" : "15400"},
    {"budgetId" : 2, "budgetName" : "budget Facebook", "projectName" : "Facebook Chat", "budgetCost" : "41500"},
]


var currentbudgetId = budgetData.length;



// localstorage allows us to persist key value pairs in a way that would survive page refreshes, navigation, and user closing/reopening browser.
// localstorage has limits to the size of each object stored.   

localStorage.setItem("budgetData", budgetData)

var myDataTest = localStorage.getItem("budgetData")



function CreateTableFromJSON() {    
    

    // EXTRACT VALUE FOR HTML HEADER. 
    // ('Deal ID', 'Deal Name', 'Category' and 'Price')
    var col = ['budgetName', 'projectName', 'budgetCost'];

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
    for (var i = 0; i < budgetData.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = budgetData[i][col[j]];
        }
        // Insert Extra Cell for the Delete Icon
        //TODO: Complete this
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = '<button onclick="initiateUpdate(' + budgetData[i].budgetId + ')"> <img src="images/4.png" style="height:30px;max-width:20px;"> </button>'
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = '<button onclick="DeleteRow(' + budgetData[i].budgetId + ')"> <img src="images/delete.png" style="height:30px;max-width:20px;"> </button>'

    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function AddNewDeal() {
    var budgetName = document.getElementById("budgetName").value;
    var ProjectName = document.getElementById("ProjectName").value;
    var budgetCost = document.getElementById("budgetCost").value;
    var budgetId = document.getElementById("budgetId").value;


    document.getElementById("budgetName").value = "";
    document.getElementById("ProjectName").value = "";
    document.getElementById("budgetCost").value = "";
    document.getElementById("budgetId").value = "";
    console.log(budgetId);


    if(budgetId === ''){
    InsertRow(budgetName, ProjectName, budgetCost);
    }
    else{
        console.log('hit');
    updateRow(budgetId, budgetName, ProjectName, budgetCost);
    }
    

}

function InsertRow(budgetName, ProjectName, budgetCost) {
    budgetData.push({"budgetId" : currentbudgetId, "budgetName" : budgetName, "projectName" : ProjectName, "budgetCost" : budgetCost})
    currentbudgetId++;
    $('#exampleModal').modal('hide')
    CreateTableFromJSON();

}

function initiateUpdate(budgetId){
    for( var i = 0; i < budgetData.length; i++){ 
    
        if ( budgetData[i].budgetId === parseInt(budgetId)) { 
            document.getElementById("budgetName").value = budgetData[i].budgetName;
            document.getElementById("ProjectName").value = budgetData[i].projectName;
            document.getElementById("budgetCost").value = budgetData[i].budgetCost;
            document.getElementById("budgetId").value = budgetData[i].budgetId;
            $('#exampleModal').modal('show');
        }
    }
}

function updateRow(budgetId, budgetName, ProjectName, budgetCost){
    console.log(budgetId)
    for( var i = 0; i < budgetData.length; i++){ 
        console.log(budgetData[i].budgetId)
    
        if ( budgetData[i].budgetId === parseInt(budgetId)) {
            console.log('hitt')
            budgetData[i].budgetName = budgetName;
            budgetData[i].projectName = ProjectName;
            budgetData[i].budgetCost = budgetCost;
        }
        $('#exampleModal').modal('hide')
        CreateTableFromJSON();
    }
}

function DeleteRow(budgetId) {
     
    for( var i = 0; i < budgetData.length; i++){ 
    
        if ( budgetData[i].budgetId === budgetId) { 
    
            budgetData.splice(i, 1); 
        }
    
    }
    CreateTableFromJSON();
}

