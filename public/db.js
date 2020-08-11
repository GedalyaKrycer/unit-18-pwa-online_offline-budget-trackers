let db;

// This is requesting a database called budget and giving it version number
const request = indexedDB.open("budget", 1);

// This gives the indexDB structure and creates an Object Store which holds the data we later send to indexDB. If the database version above is new, it will fire this function to get the latest database structure.
request.onupgradeneeded = function (event) {
    const db = event.target.result;
    console.log(`OUGN db content: ${db}`)

    // This object store has key set to auto increment so that each new entry has a unique number automatically
    db.createObjectStore("pending", { autoIncrement: true });
}

// Once the database connects correctly it executes this code
request.onsuccess = function (event) {
    db = event.target.result;
    console.log(`OS db content: ${db}`)

    // This conditional runs when the browser is able to connect to the network. 
    if (navigator.onLine) {

        // Setting up the transactions and accessing the actual data via the API fetch method happens in this below function
        checkDatabase();
    }
}

// If there is an error with the request, this is logged.
request.onerror = function (event) {
    console.log(`Woops! ${event.target.errorCode}`)
}

// This function is grabbing the record and is triggered from the index.js api request's catch response. 
function saveRecord(record) {

    // This transaction references the objectStore "pending" and sets the mode to "ReadWrite"
    const transaction = db.transaction(["pending"], "readwrite");

    // This gives access to the object store "pending" so we can add records to it.
    const store = transaction.objectStore("pending");

    // This lets us add "record" to the objet store, which is the data that failed to go to the server
    store.add(record)
}

// This function attempts to put the data from indexDB back into the main database
function checkDatabase() {
    // See saveRecord() function for description 
    const transaction = db.transaction(["pending"], "readwrite");

    // See saveRecord() function for description 
    const store = transaction.objectStore("pending");

    // This gets all the records from the object store "pending" and stores them in a new variable 
    const getAll = store.getAll();

    // Connect to the indexDB database
    getAll.onsuccess = function () {

        // If the result from the object store is more then 0 (not empty)
        if (getAll.result.length > 0) {

            // Make a api post request to the "bulk" route. It converts the results sent in the body to a string and specifies the settings for the headers.
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(() => {
                    // if successful, open a transaction on your pending db
                    const transaction = db.transaction(["pending"], "readwrite");

                    // access your pending object store
                    const store = transaction.objectStore("pending");

                    // clear all items in your store
                    store.clear();
                });
        }
    };
};

// If the site comes back online, run the "checkDatabase" function
window.addEventListener("online", checkDatabase);