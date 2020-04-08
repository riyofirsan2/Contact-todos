let data = [];


//GET
axios
    .get('http://localhost:3000/contacts')
    .then ((response) => {
        const listsHTML = document.querySelector('#contacts>ol');
        data = response.data;
        console.log(data)

        data.map(item => {
            const {id, name, address,email, phone, company} = item;
            const itemHTML = `<li>
            id : ${id}
            <br>
            Name : ${name}
            <br>
            address : ${address}
            <br>
            email   : ${email}
            <br>
            phone   : ${phone}
            <br>
            company :   ${company}
            <button onclick ="ubah(${id})"> edit </button>
            <button onclick ="hapus(${id})"> hapus </button>
          
            </li>`;
            listsHTML.innerHTML += itemHTML;
        });
    })
    .catch((pesanError) => {
        console.log(pesanError);
    });


//SIMPAN

document.getElementById("simpan").addEventListener("click",function(event){
    event.preventDefault();
    const name = document.getElementById("Name").value;
    const address = document.getElementById("Address").value;
    const email = document.getElementById("Email").value;
    const phone = document.getElementById("Phone").value;
    const company = document.getElementById("Company").value;
    
    axios.post("http://localhost:3000/contacts",(
          name,
          address,
          email,
          phone,
          company
    ))
})


    
//UBAH
const ubah = id => {
    const contact = data.find(item => {
        return item.id === id
    })
    
    if (contact ){
        const name = window.prompt('name', contact.name);
        const address = window.prompt ('address', contact.address)
        const email = window.prompt ('email', contact.email)
        const phone = window.prompt ('phone',contact.phone)
        const company = window.prompt ('company', contact.company);
        axios.put(`http://localhost/3000/contacts/${id}`,{
            name,address,email,phone,company
        });
    }
}



//DELETE
const hapus = id => {
    axios.delete (`http://localhost:3000/contacts/${id}`)
}

