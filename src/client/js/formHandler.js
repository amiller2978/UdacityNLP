const addDataURL = '/test2'
// sets port 8080 to default or unless otherwise specified in the environment

function handleSubmit(event) {
    event.preventDefault()
    postData(addDataURL, {url:'http://www.google.com'});

    // check what text was put into the form field
    //future URL validation
    let formText = document.getElementById('name').value
    Client.checkForName(formText)
    console.log(formText)
    

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.val1
    })
}

/* Function to POST data */

const postData = async (url = '', data = {}) => {
  console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin', // include, *same-origin
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log("error", error);
        //  handle the error
    }
};


export { handleSubmit }
