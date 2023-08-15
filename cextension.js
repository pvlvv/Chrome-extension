    /* 
    let myLeads = `["www.awesomelead.com"]`   
                                        ---> here by using ` symbol we are coverting array to string.
    myLeads = JSON.parse(myLeads)  
                                        ---> we use parse so that we can use push function to add another array string.
    myLeads.push("www.epiclead.com")
    console.log(myLeads) 

    OR

    let myLeads = ["www.awesomelead.com"]
    myLeads = JSON.stringify(myLeads)
    console.log(typeof myLeads)
    */

let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
console.log(leadsFromLocalStorage)

    /*
    localStorage.setItem("myName", "Palak Verma")
    let name = localStorage.getItem("myName")
    console.log(name)
    localStorage.clear()
    */

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

    // renderLeads is changed to render
    // leads is parameter and myLeads is passed as an argument

function render(leads){
    let listItems = ""
    for(let i = 0; i < myLeads.length; i++){

    // template string/literals
    // listItems += "<li><a target='_blank' href=' "myLeads[i]}" '>" + myLeads[i] + "</a></li>"

    listItems += `
        <li>
            <a target = '_blank' href='${leads[i]}'>
            ${leads[i]}
            </a>
        </li>
    `
    /*
        // myLeads.innerHTML = "<li>" + myLeads[i] + "</li>"
        1. create element
        2. set text content
        3. append(adding something to the end of the document) to ul 
    OR
        1. const li = document.createElement("li")
        2. li.textContent = myLeads[i]
        3. ulEl.append(li) */

    }
    ulEl.innerHTML = listItems
}

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true }, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


