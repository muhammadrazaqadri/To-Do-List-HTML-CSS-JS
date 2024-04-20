// Get elements from the DOM
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-Container");

// Function to add a new task
function addTask() {
    // Check if the input is empty
    if (inputBox.value.trim() === '') {
        alert("Please enter a Text!");
    } else {
        // Create a new list item
        const li = document.createElement("li");
        li.textContent = inputBox.value.trim();
        
        // Create a close button for the list item
        const span = document.createElement("span");
        span.innerHTML = "&#x00D7;";
        span.classList.add("close");
        
        // Functionality to remove a task when clicking the close button
        span.onclick = function() {
            const listItem = this.parentElement;
            listContainer.removeChild(listItem);
            saveData();
        };
        
        // Append the close button to the list item
        li.appendChild(span);
        
        // Append the list item to the list container
        listContainer.appendChild(li);
    }
    
    // Clear the input box after adding the task
    inputBox.value = "";
    
    // Save data to localStorage
    saveData();
}

// Event listener for Enter key press
inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Event listener for toggling task completion and deleting tasks
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});

// Function to save data to localStorage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to load tasks from localStorage
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

// Load tasks when the page is loaded
showTask();

