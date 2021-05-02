export async function login(username, password) {
    fetch('http://localhost:3000/userAuth/login', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
}

export async function signup(username, password) {
    fetch('http://localhost:3000/userAuth/new-user', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then((response) => {
        if (response.ok) {
            login(username, password);
        }
    })
}