async function checkIfUserLoggedin() {
    let response = await fetch('http://localhost:43030/user', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
    return response;
}

export const Worker = {
    checkIfUserLoggedin
}