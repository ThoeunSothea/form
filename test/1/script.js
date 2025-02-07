function getCurrentTimestamp() {
    const now = new Date();
    return now.toLocaleString();
}

function validateForm() {
    const requiredFields = [
        'KhmerName', 'EnglishName', 'DateOfBirth', 'Nationality', 'PlaceofBirth', 'Address',
        'PhoneNumber', 'Email', 'FatherName', 'FatherPhoneNumber', 'MotherName', 'MotherPhoneNumber',
        'Year', 'Batch', 'Faculty', 'Major', 'Session'
    ];

    for (const field of requiredFields) {
        const value = document.getElementById(field).value.trim();
        if (!value) {
            alert(`សូមបំពេញព័ត៌មាននៅក្នុង ${field}`);
            return false;
        }
    }

    const genderSelected = document.querySelector('input[name="Gender"]:checked');
    if (!genderSelected) {
        alert("សូមជ្រើសរើសភេទ។");
        return false;
    }

    return true;
}

// Register Now
document.querySelector('.Register_Now').addEventListener('click', function(event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const formData = {
        KhmerName: document.getElementById('KhmerName').value,
        EnglishName: document.getElementById('EnglishName').value,
        DateOfBirth: document.getElementById('DateOfBirth').value,
        Gender: document.querySelector('input[name="Gender"]:checked')?.value || '',
        Nationality: document.getElementById('Nationality').value,
        PlaceOfBirth: document.getElementById('PlaceofBirth').value,
        Address: document.getElementById('Address').value,
        PhoneNumber: document.getElementById('PhoneNumber').value,
        Email: document.getElementById('Email').value,
        FatherName: document.getElementById('FatherName').value,
        FatherPhone: document.getElementById('FatherPhoneNumber').value,
        MotherName: document.getElementById('MotherName').value,
        MotherPhone: document.getElementById('MotherPhoneNumber').value,
        ApplyFor: Array.from(document.querySelectorAll('.Apply input[type="checkbox"]:checked'))
            .map(e => e.value)
            .join(', ') || '',
        Year: document.getElementById('Year').value,
        Batch: document.getElementById('Batch').value,
        Faculty: document.getElementById('Faculty').value,
        Major: document.getElementById('Major').value,
        Session: document.getElementById('Session').value,
        School: Array.from(document.querySelectorAll('.School input[type="checkbox"]:checked'))
            .map(e => e.value)
            .join(', ') || '',
        Timestamp: getCurrentTimestamp(),
    };

    const table = document.querySelector('.hh tbody');
    const newRow = document.createElement('tr');

    for (const key in formData) {
        const newCell = document.createElement('td');
        newCell.textContent = formData[key];
        newRow.appendChild(newCell);
    }

    const actionsCell = document.createElement('td');
    actionsCell.innerHTML = `
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>`;
    newRow.appendChild(actionsCell);
    table.appendChild(newRow);

    alert("✅ ទិន្នន័យត្រូវបានបញ្ចូល!");
});

// Update Row
document.querySelector('.update-btn').addEventListener('click', function(event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const editingRowIndex = parseInt(document.getElementById('register_Form').dataset.editingRow, 10);
    if (isNaN(editingRowIndex) || editingRowIndex <= 0) {
        alert('⚠️ Invalid row index.');
        return;
    }

    const table = document.querySelector('.hh tbody');
    const row = table.rows[editingRowIndex - 1];
    if (!row) {
        alert('⚠️ Row not found.');
        return;
    }

    const cells = row.querySelectorAll('td');

    cells[0].textContent = document.getElementById('KhmerName').value;
    cells[1].textContent = document.getElementById('EnglishName').value;
    cells[2].textContent = document.getElementById('DateOfBirth').value;
    cells[4].textContent = document.getElementById('Nationality').value;
    cells[5].textContent = document.getElementById('PlaceofBirth').value;
    cells[6].textContent = document.getElementById('Address').value;
    cells[7].textContent = document.getElementById('PhoneNumber').value;
    cells[8].textContent = document.getElementById('Email').value;
    cells[9].textContent = document.getElementById('FatherName').value;
    cells[10].textContent = document.getElementById('FatherPhoneNumber').value;
    cells[11].textContent = document.getElementById('MotherName').value;
    cells[12].textContent = document.getElementById('MotherPhoneNumber').value;
    cells[14].textContent = document.getElementById('Year').value;
    cells[15].textContent = document.getElementById('Batch').value;
    cells[16].textContent = document.getElementById('Faculty').value;
    cells[17].textContent = document.getElementById('Major').value;
    cells[18].textContent = document.getElementById('Session').value;

    // Update Gender
    const selectedGender = document.querySelector('input[name="Gender"]:checked')?.value || '';
    cells[3].textContent = selectedGender;

    // Update Apply For
    const selectedApplyFor = Array.from(document.querySelectorAll('.Apply input[type="checkbox"]:checked'))
        .map(e => e.value).join(', ');
    cells[13].textContent = selectedApplyFor;

    // Update School Fees
    const selectedSchool = Array.from(document.querySelectorAll('.School input[type="checkbox"]:checked'))
        .map(e => e.value).join(', ');
    cells[19].textContent = selectedSchool;

    // Update Timestamp
    cells[20].textContent = getCurrentTimestamp();

    alert("✅ ទិន្នន័យត្រូវបានកែប្រែ!");
});

document.querySelector('.Restart_Form').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('register_Form').reset();
    alert('ទិន្នន័យបញ្ចូលត្រូវបានលុប។ ទិន្នន័យដើមនៅតែមាន។');
});

// Delete Row
document.querySelector('.hh tbody').addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-btn')) {
        const row = event.target.closest('tr');
        const cells = row.querySelectorAll('td');

        document.getElementById('register_Form').dataset.editingRow = row.rowIndex;

        document.getElementById('KhmerName').value = cells[0].textContent;
        document.getElementById('EnglishName').value = cells[1].textContent;
        document.getElementById('DateOfBirth').value = cells[2].textContent;
        document.getElementById('Nationality').value = cells[4].textContent;
        document.getElementById('PlaceofBirth').value = cells[5].textContent;
        document.getElementById('Address').value = cells[6].textContent;
        document.getElementById('PhoneNumber').value = cells[7].textContent;
        document.getElementById('Email').value = cells[8].textContent;
        document.getElementById('FatherName').value = cells[9].textContent;
        document.getElementById('FatherPhoneNumber').value = cells[10].textContent;
        document.getElementById('MotherName').value = cells[11].textContent;
        document.getElementById('MotherPhoneNumber').value = cells[12].textContent;
        document.getElementById('Year').value = cells[14].textContent;
        document.getElementById('Batch').value = cells[15].textContent;
        document.getElementById('Faculty').value = cells[16].textContent;
        document.getElementById('Major').value = cells[17].textContent;
        document.getElementById('Session').value = cells[18].textContent;

        // Set Gender
        const gender = cells[3].textContent.trim();
        if (gender === "Male") {
            document.getElementById('Male').checked = true;
        } else if (gender === "Female") {
            document.getElementById('Female').checked = true;
        }

        // Set Apply For
        const selectedApplyfor = cells[13].textContent.split(',').map(item => item.trim());
        document.querySelectorAll('.Apply input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = selectedApplyfor.includes(checkbox.value);
        });

        // Set School Fees
        const selectedSchool = cells[19].textContent.split(',').map(item => item.trim());
        document.querySelectorAll('.School input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = selectedSchool.includes(checkbox.value);
        });

        alert("✏️ សូមកែប្រែទិន្នន័យហើយចុច Update!");
    }
});