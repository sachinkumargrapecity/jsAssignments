// calls the api and saves the returned data
function callApi(){
    let titlee = document.forms['addForm']['title'].value;
    let bodyy = document.forms['addForm']['body'].value;
    let id = Number(localStorage.getItem('count'));
    
    // check if body and title are supplied ... else return
    if(titlee.length == 0 || bodyy.length ==0) return;
    
    // since id will have 0 at start we save the incremented value
    // upto which we have the data in storage
    localStorage.setItem('count',1+id);
    id++;

    postRequest = {
        method: 'POST',
        body: JSON.stringify({
            title: titlee,
            body: bodyy,
        }),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    }
    fetch('https://jsonplaceholder.typicode.com/posts',postRequest)
    .then(response => response.json())
    .then(json => { saveData(id,json);  });
    //catch(()=>console.log("Error Occurred while fetching data"));
    
}

// below function shows the data
// only called when page loads
function showData(id){
    let len = (localStorage.getItem('data')); // check if data exists
    if (len != 0){
        let data = JSON.parse(localStorage.getItem('data')); // get items
        let len = Object.keys(data).length; // total items in data storage
        
        
        Object.keys(data).forEach(key=>{
            
            AddNode(key,data[key].title,data[key].body);
            
        });

    }
}
showData(); // onPageLoad

// below function saves the input data in the local storage
function saveData(id,dat){
  
   let len = Number(localStorage.getItem('data')); // get length
   
    if(len == 0){
        
        dataToSave = {};
        dataToSave[id] = dat;
        localStorage.setItem("data", JSON.stringify(dataToSave)); // create New
    }
    else{
        let oldData = JSON.parse(localStorage.getItem('data')); // retrieve
        oldData[id] = dat //append
        localStorage.setItem('data',JSON.stringify(oldData)); // save
        
    }
    // show the new node 
    AddNode(id,dat.title,dat.body);
    
}


// below function adds a row in the table
function AddNode(id, title,body){
    // create an item and append as child to table (table of Items)
    let tr1 = document.createElement('tr');
             tr1.id = id;
    let td = document.createElement('td');
    td.id = id + 't';
    let tdText = document.createTextNode(title);
    td.appendChild(tdText);

    let td1 = document.createElement('td');
    td1.id = id + 'b';
    let tdText1 = document.createTextNode(body);
    td1.appendChild(tdText1);

    let td2 = document.createElement('td');
    let img = document.createElement('img');
    img.id = id + 'i';
    img.src = 'cross.jpg';
    img.style.height = '16px';
    img.style.width = '16px';
    
    td2.appendChild(img);

tr1.appendChild(td);
tr1.appendChild(td1);
tr1.appendChild(td2);
let tab = document.getElementById('tableOfItems');
tab.appendChild(tr1);


}

// deletes and edits the node
document.addEventListener('click',function(elemen){
    let id = elemen.target.id;
    
    // if id contains i at the end then it is an image id
    let ssid = id.split("");
    
    if(ssid[ssid.length-1] === 'i'){

        
        // remove i from id of the element
        
        let sid = id.substr(0,id.length-1);
        document.getElementById(sid).style.display = 'none'; // hide the row

        

        // delete from local storage too
        let oldData = JSON.parse(localStorage.getItem('data')); // retrieve
        let remoteId = oldData[sid].id; // for deleting from remote server
        delete oldData[sid]; // delete
        localStorage.setItem('data',JSON.stringify(oldData)); // save

        // delete from remote server
        fetch('https://jsonplaceholder.typicode.com/posts/' + remoteId,{method:'DELETE'})
        .then(resp=>console.log(resp));
    }

    // editing the node // only run if td element is clicked
    else if(ssid[ssid.length-1] === 't' || ssid[ssid.length-1] === 'b'){
        let sid = id.substr(0,id.length-1); // key of element stored in storage
        
        // change title
        if(ssid[ssid.length-1] === 't' ){
            let ntitle = prompt("Edit the title",document.getElementById(id).innerHTML);
            let oldData = JSON.parse(localStorage.getItem('data')); // retrieve
            // make changes
            oldData[sid].title = ntitle;
            document.getElementById(id).innerHTML = ntitle;
            // save the change to local storage
            localStorage.setItem('data',JSON.stringify(oldData)); // save

            // change on remote server
                fetch('https://jsonplaceholder.typicode.com/posts/' + oldData[sid].id,{
                    method: 'Patch',
                    body: JSON.stringify({title:ntitle}),
                    headers: {
                        'Content-type': 'application/json'
                    }
                }).then(resp=>console.log("Updated Title"));
        }
        // change body
        if(ssid[ssid.length-1] === 'b' ){
            let nbody = prompt("Edit the body",document.getElementById(id).innerHTML);

            let oldData = JSON.parse(localStorage.getItem('data')); // retrieve
            // make changes
            oldData[sid].body = nbody;
            document.getElementById(id).innerHTML = nbody;
            // save the change to local storage
            localStorage.setItem('data',JSON.stringify(oldData)); // save

            // change on remote server
            fetch('https://jsonplaceholder.typicode.com/posts/' + oldData[sid].id,{
                method: 'Patch',
                body: JSON.stringify({title:ntitle}),
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(resp=>console.log("Updated Body"));
        }
        
    }

});



// clear list
function clearList(){
    document.getElementById('tableOfItems').innerHTML = '';
    localStorage.removeItem('data');
}

