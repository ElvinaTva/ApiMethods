let user_list = document.querySelector(".user_list");
let first_name = document.querySelector("#first_name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let date_of_birth = document.querySelector("#date_of_birth");
let last_name = document.querySelector("#last_name");
let phone_number = document.querySelector("#phone_number");
let btnSave = document.querySelector("#saveBtn");

let url = "https://rest-api.celt.network/public/api/user";
let method = "POST"
// get=>getirmek 
// post=>elave etmek
// delete=>silmek
// put=>edit

async function showApi() {
    user_list.innerHTML = ""
    await fetch("https://rest-api.celt.network/public/api/user")
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            data.forEach(e => {
                user_list.innerHTML += `
                <li>
                <p>Name:${e.full_name}</p>
                <p>Email:${e.email}</p>
                <button onclick="editFunc(${e.id})">Edit</button>
                <button onclick="deleteFunc(${e.id})">Delete</button>
            </li>
                `
            });
        })

}

showApi();

function reset() {
    first_name.value = ""
    last_name.value = ""
    email.value = ""
    date_of_birth.value = ""
    phone_number.value = ""
    password.value = ""
    url = "https://rest-api.celt.network/public/api/user";
    method = "POST"
}


btnSave.addEventListener('click', () => {
    if (first_name.value != "" && last_name.value != "" &&
        email.value != "" && date_of_birth.value != "" &&
        phone_number.value != "" && password.value != "") {
        let newUser = {
            first_name: first_name.value,
            email: email.value,
            password: password.value,
            date_of_birth: date_of_birth.value,
            last_name: last_name.value,
            phone_number: phone_number.value
        }

        fetch(url, {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            method: method,
            body: JSON.stringify(newUser)
        }).then(resp => resp.json())
            .then(data => {
                showApi();
                reset();
            })


    }
})

function deleteFunc(id){
    fetch(`https://rest-api.celt.network/public/api/user/${id}`,{
        headers:{
            "Accept":"application/json",
            "Content-type":"application/json"
        },
        method:"DELETE"
    })
    .then(resp=>resp.json())
    .then(data=>{
        showApi();
    })
}
function editFunc(id){
    fetch(`https://rest-api.celt.network/public/api/user/${id}`)
    .then(resp=>resp.json())
    .then(data=>{
        first_name.value=data.first_name;
        last_name.value=data.last_name;
        email.value=data.email;
        phone_number.value=data.phone_number;
        date_of_birth.value=data.date_of_birth;
        password.value=data.password;
        method='PUT';
        url=`https://rest-api.celt.network/public/api/user/${id}`
    })
}