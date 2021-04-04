function login(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username)
    if(username == 'productmanager' && password == 'productmanager'){
        window.location.href = 'table_example.html';
    }
    else if(username == 'finance' && password == 'finance'){
        window.location.href = 'budget.html';
    }
    else{
        document.getElementById('emailHelp').innerText = 'Invalid Credentials'
    }
}