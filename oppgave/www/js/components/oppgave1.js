function fetchAllUsers() {
    fetch(`api/fetchUsers.php`, {}).then(res => res.json())
        .then(data => {
            var userCont = document.getElementById("users");

            data.forEach(x => {

                var newUser = document.createElement('div');
                newUser.setAttribute("id", x.uid)
                newUser.innerText = x.uname + "\n" + x.firstName + " " + x.lastName + "\n\n";
                userCont.appendChild(newUser);

                newUser.onclick = function() { fetchUser(newUser.id) };
            });
        });
}

function fetchUser(e) {
    var selectedUser = document.getElementById("user");
    selectedUser.style.display = "block";
    fetch("api/fetchUser.php?id=" + e.toString(), {

        }).then(res => res.json())
        .then(data => {

            document.getElementById("lastName").value = data.lastName;
            document.getElementById("uid").value = e;
            document.getElementById("firstName").value = data.firstName;
            document.getElementById("uname").value = data.uname;

        });
}

document.getElementById("sendForm").addEventListener('click', e => {
    const dataForm = new FormData(e.target.form);
    fetch('api/updateUser.php', {
            method: 'POST',
            body: dataForm
        }).then(res => res.json())
        .then(data => {
            if (data.status == 'success') {
                console.log("User updated");
                fetchAllUsers();
            } else {
                console.log("User was not updated");
            }
        })
})