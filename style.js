let customDateTime = null;  // Variable to store custom date/time

function updateClock() {
    const now = new Date(); // Always get the real current time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayName = days[now.getDay()];
    const month = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
    const dateString = `${dayName}, ${month} ${day}, ${year}`;

    document.getElementById("time").textContent = customDateTime ? formatCustomTime(customDateTime) : timeString;
    document.getElementById("date").textContent = customDateTime ? formatCustomDate(customDateTime) : dateString;

    // Clear custom time if set to null for displaying the real time continuously
    if (customDateTime) {
        setTimeout(() => { customDateTime = null; }, 5000); // Reset to real time after 5 seconds
    }
}

function toggleEditMode() {
    const displayMode = document.getElementById("display-mode");
    const editMode = document.getElementById("edit-mode");

    if (displayMode.style.display === "none") {
        displayMode.style.display = "block";
        editMode.style.display = "none";
    } else {
        displayMode.style.display = "none";
        editMode.style.display = "block";

        // Set the current time and date in the input fields
        const now = new Date();
        document.getElementById("edit-time").value = now.toTimeString().slice(0, 5); // HH:MM format
        document.getElementById("edit-date").value = now.toISOString().slice(0, 10); // YYYY-MM-DD format
    }
}

function saveChanges() {
    const timeInput = document.getElementById("edit-time").value;
    const dateInput = document.getElementById("edit-date").value;

    if (timeInput && dateInput) {
        const [hours, minutes] = timeInput.split(":").map(Number);
        const [year, month, day] = dateInput.split("-").map(Number);

        // Set customDateTime to the new date and time temporarily
        customDateTime = new Date(year, month - 1, day, hours, minutes, 0);
    }

    toggleEditMode();
}

function formatCustomTime(customDateTime) {
    const hours = String(customDateTime.getHours()).padStart(2, '0');
    const minutes = String(customDateTime.getMinutes()).padStart(2, '0');
    const seconds = String(customDateTime.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function formatCustomDate(customDateTime) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayName = days[customDateTime.getDay()];
    const month = months[customDateTime.getMonth()];
    const day = customDateTime.getDate();
    const year = customDateTime.getFullYear();
    return `${dayName}, ${month} ${day}, ${year}`;
   // var today = new Date();
    // document.getElementById('Date').innerHTML = (days[today.getDay()]+" "+
    // today.getDay()+' '+ months[today.getMonth()]+' '+today.getFullYear());
}

setInterval(updateClock, 1000);
updateClock();
