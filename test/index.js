document.querySelector('.Register_Now').addEventListener('click', function(event) {
    event.preventDefault(); 
    
    const formData = {
        KhmerName: document.getElementById('KhmerName')?.value ?? '',
        EnglishName: document.getElementById('EnglishName')?.value ?? '',
        DateOfBirth: document.getElementById('DateOfBirth')?.value ?? '',
        Gender: document.querySelector('input[name="Gender"]:checked')?.value ?? '',
        Nationality: document.getElementById('Nationality')?.value ?? '',
        PlaceOfBirth: document.getElementById('PlaceofBirth')?.value ?? '',
        Address: document.getElementById('Address')?.value ?? '',
        PhoneNumber: document.getElementById('PhoneNumber')?.value ?? '',
        Email: document.getElementById('Email')?.value ?? '',
        FatherName: document.getElementById('FatherName')?.value ?? '',
        FatherPhone: document.getElementById('FatherPhoneNumber')?.value ?? '',
        MotherName: document.getElementById('MotherName')?.value ?? '',
        MotherPhone: document.getElementById('MotherPhoneNumber')?.value ?? '',
        ApplyFor: Array.from(document.querySelectorAll('.Apply input[type="checkbox"]:checked'))
            .map(e => e.value)
            .join(', '),
        Year: document.getElementById('Year')?.value ?? '',
        Batch: document.getElementById('Batch')?.value ?? '',
        Faculty: document.getElementById('Faculty')?.value ?? '',
        Major: document.getElementById('Major')?.value ?? '',
        Session: document.getElementById('Session')?.value ?? '',
        School: document.querySelector('.School input[type="checkbox"]:checked')?.value ?? '',
    };

    const table = document.querySelector('.hh tbody');
    const newRow = document.createElement('tr');
    
    for (const key in formData) {
        const newCell = document.createElement('td');
        newCell.textContent = formData[key];
        newRow.appendChild(newCell);
    }

    table.appendChild(newRow);
    const actionsCell = document.createElement('td');
    actionsCell.innerHTML =
     `<button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>`;
    newRow.appendChild(actionsCell);
    
    

    let alertText = "📋 Register Information:\n";
    for (const key in formData) {
        alertText +=` ${key}: ${formData[key]}\n`;
    }
    alert(alertText);
});

document.querySelector('.Restart_Form').addEventListener('click', function(event) {
    event.preventDefault(); 

    document.querySelectorAll('input[type="text"], input[type="date"],input[type="email"],input[type="tel"]').forEach(input => {
        if (!input.defaultValue) {
            input.value = ''; 
        } else {
            input.value = input.defaultValue; 
        }
    });
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => checkbox.checked = false);

    alert('ទិន្នន័យបញ្ចូលត្រូវបានលុប។ ទិន្នន័យដើមនៅតែមាន។');
});

// Detele
document.querySelector('.hh tbody').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        event.target.closest('tr').remove();
        alert("🗑 ទិន្នន័យត្រូវបានលុប!");
    }
});

// ✅ Edit 
document.querySelector('.hh tbody').addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-btn')) {
        const row = event.target.closest('tr');
        const cells = row.querySelectorAll('td');

        // ✅ រក្សាទុក rowIndex
        document.getElementById('register_Form').dataset.editingRow = row.rowIndex;

        document.getElementById('KhmerName').value = cells[0].textContent;
        document.getElementById('EnglishName').value = cells[1].textContent;
        document.getElementById('DateOfBirth').value = cells[2].textContent;
        
        // ✅ Update Gender (Radio)
        document.getElementById('Male').checked = cells[3].textContent.trim() === "Male";
        document.getElementById('Female').checked = cells[3].textContent.trim() === "Female";

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

        // ✅ Update ApplyFor (Checkbox)
        document.querySelectorAll('.Apply input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = cells[13].textContent.includes(checkbox.value);
        });

        alert("✏️ សូមកែប្រែទិន្នន័យហើយចុច Update!");
    }
});

//update
document.querySelector('.update-btn').addEventListener('click', function(event) {
    event.preventDefault();

    const editingRowIndex = parseInt(document.getElementById('register_Form').dataset.editingRow, 10);
    console.log("editingRowIndex:", editingRowIndex);

    if (isNaN(editingRowIndex) || editingRowIndex <= 0) {
        alert('Invalid row index.');
        return;
    }

    const table = document.querySelector('.hh tbody');
    console.log("Table element:", table);
    
    const row = table.rows[editingRowIndex - 1];
    console.log("Row element:", row);
    
    if (!row) {
        alert('Row not found.');
        return;
    }

    const cells = row.querySelectorAll('td');
    console.log("Cells:", cells);

    // ពិនិត្យថា cells មានគ្រប់ Index ដែលត្រូវការឬអត់
    if (cells.length < 19) {
        alert('Table row does not have enough columns.');
        return;
    }

    cells[0].textContent = document.getElementById('KhmerName').value;
    cells[1].textContent = document.getElementById('EnglishName').value;
    cells[2].textContent = document.getElementById('DateOfBirth').value;

    // ✅ Update Gender
    const selectedGender = document.querySelector('input[name="Gender"]:checked')?.value || '';
    console.log("Selected Gender:", selectedGender);
    cells[3].textContent = selectedGender;

    cells[4].textContent = document.getElementById('Nationality').value;
    cells[5].textContent = document.getElementById('PlaceofBirth').value;
    cells[6].textContent = document.getElementById('Address').value;
    cells[7].textContent = document.getElementById('PhoneNumber').value;
    cells[8].textContent = document.getElementById('Email').value;
    cells[9].textContent = document.getElementById('FatherName').value;
    cells[10].textContent = document.getElementById('FatherPhoneNumber').value;
    cells[11].textContent = document.getElementById('MotherName').value;
    cells[12].textContent = document.getElementById('MotherPhoneNumber').value;

    // ✅ Update ApplyFor (Checkbox)
    const selectedCheckboxes = Array.from(document.querySelectorAll('.Apply input[type="checkbox"]:checked'))
        .map(e => e.value);
    console.log("Selected ApplyFor:", selectedCheckboxes);
    cells[13].textContent = selectedCheckboxes.join(', ');

    cells[14].textContent = document.getElementById('Year').value;
    cells[15].textContent = document.getElementById('Batch').value;
    cells[16].textContent = document.getElementById('Faculty').value;
    cells[17].textContent = document.getElementById('Major').value;
    cells[18].textContent = document.getElementById('Session').value;

    alert("✅ ទិន្នន័យត្រូវបានកែប្រែ!");
});






















































// document.querySelector('.Register_Now').addEventListener('click', function(event) {
//     event.preventDefault(); 

//     const formData = {
//         KhmerName: document.getElementById('KhmerName')?.value || '',
//         EnglishName: document.getElementById('EnglishName')?.value || '',
//         DateOfBirth: document.getElementById('DateOfBirth')?.value || '',
//         Gender: document.querySelector('.gender input[type="checkbox"]:checked')?.nextElementSibling.innerText || '',
//         Nationality: document.getElementById('Nationality')?.value || '',
//         PlaceOfBirth: document.getElementById('PlaceofBirth')?.value || '',
//         Address: document.getElementById('Address')?.value || '',
//         PhoneNumber: document.getElementById('Phone Number')?.value || '',
//         Email: document.getElementById('Email')?.value || '',
//         FatherName: document.getElementById('Father Name')?.value || '',
//         FatherPhone: document.getElementById('Father Phone Number')?.value || '',
//         MotherName: document.getElementById('Mother Name')?.value || '',
//         MotherPhone: document.getElementById('Mother Phone Number')?.value || '',
//         ApplyFor: Array.from(document.querySelectorAll('.Apply input[type="checkbox"]:checked'))
//             .map(e => e.nextElementSibling.innerText) 
//             .join(', ') || '',
//         Year: document.getElementById('Year')?.value || '',
//         Batch: document.getElementById('Batch')?.value || '',
//         Faculty: document.getElementById('Faculty')?.value || '',
//         Major: document.getElementById('Major')?.value || '',
//         Session: document.getElementById('Session')?.value || '',
//         School: document.querySelector('.School input[type="checkbox"]:checked')?.nextElementSibling.innerText || '',
//     };


//     const table = document.querySelector('.hh tbody');
//     const newRow = document.createElement('tr');
    
//     for (const key in formData) {
//         const newCell = document.createElement('td');
//         newCell.textContent = formData[key];
//         newRow.appendChild(newCell);
//     }

//     table.appendChild(newRow);
//     const actionsCell = document.createElement('td');
//     actionsCell.innerHTML =
//     `<button class="edit-btn">Edit</button>
//     <button class="delete-btn">Delete</button>`;
//     newRow.appendChild(actionsCell);
//     table.appendChild(newRow);

//     let alertText = "📋 Register Information:\n";
//     for (const key in formData) {
//         alertText += `${key}: ${formData[key]}\n`;
//     }

//     alert(alertText);  
// });
// document.querySelector('.Restart_Form').addEventListener('click', function(event) {
// event.preventDefault(); 

// document.querySelectorAll('input[type="text"], input[type="date"],input[type="email"],input[type="tel"]').forEach(input => {
//     if (!input.defaultValue) {
//         input.value = ''; 
//     } else {
//         input.value = input.defaultValue; 
//     }
// });
// document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => checkbox.checked = false);

// alert('ទិន្នន័យបញ្ចូលត្រូវបានលុប។ ទិន្នន័យដើមនៅតែមាន។');
// });








{/* <script>
    document.querySelector('.Register_Now').addEventListener('click', function(event) {
        event.preventDefault(); 
    
        const formData = {
            KhmerName: document.getElementById('KhmerName')?.value || '',
            EnglishName: document.getElementById('EnglishName')?.value || '',
            DateOfBirth: document.getElementById('DateOfBirth')?.value || '',
            Gender: document.querySelector('.gender input[type="checkbox"]:checked')?.nextElementSibling.innerText || '',
            Nationality: document.getElementById('Nationality')?.value || '',
            PlaceOfBirth: document.getElementById('PlaceofBirth')?.value || '',
            Address: document.getElementById('Address')?.value || '',
            PhoneNumber: document.getElementById('Phone Number')?.value || '',
            Email: document.getElementById('Email')?.value || '',
            FatherName: document.getElementById('Father Name')?.value || '',
            FatherPhone: document.getElementById('Father Phone Number')?.value || '',
            MotherName: document.getElementById('Mother Name')?.value || '',
            MotherPhone: document.getElementById('Mother Phone Number')?.value || '',
            ApplyFor: Array.from(document.querySelectorAll('.Apply input[type="checkbox"]:checked'))
                .map(e => e.nextElementSibling.innerText) 
                .join(', ') || '',
            Year: document.getElementById('Year')?.value || '',
            Batch: document.getElementById('Batch')?.value || '',
            Faculty: document.getElementById('Faculty')?.value || '',
            Major: document.getElementById('Major')?.value || '',
            Session: document.getElementById('Session')?.value || '',
            School: document.querySelector('.School input[type="checkbox"]:checked')?.nextElementSibling.innerText || '',
        };
    

        const table = document.querySelector('.hh tbody');
        const newRow = document.createElement('tr');
        
        for (const key in formData) {
            const newCell = document.createElement('td');
            newCell.textContent = formData[key];
            newRow.appendChild(newCell);
        }
    
        const actionsCell = document.createElement('td');
        actionsCell.innerHTML =
        `<button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>`;
        newRow.appendChild(actionsCell);
        table.appendChild(newRow);

        let alertText = "📋 Register Information:\n";
        for (const key in formData) {
            alertText += `${key}: ${formData[key]}\n`;
        }
    
        alert(alertText);  
    });

document.querySelector('.Restart_Form').addEventListener('click', function(event) {
    event.preventDefault(); 

    document.querySelectorAll('input[type="text"], input[type="date"],input[type="email"],input[type="tel"]').forEach(input => {
        if (!input.defaultValue) {
            input.value = ''; 
        } else {
            input.value = input.defaultValue; 
        }
    });
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => checkbox.checked = false);

    alert('ទិន្នន័យបញ្ចូលត្រូវបានលុប។ ទិន្នន័យដើមនៅតែមាន។');
});
// Detele 
document.querySelector('.hh tbody').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        event.target.closest('tr').remove();
        alert("🗑 ទិន្នន័យត្រូវបានលុប!");
    }
});
// Edit form
document.querySelector('.hh tbody').addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-btn')) {
        const row = event.target.closest('tr');
        const cells = row.querySelectorAll('td');

        document.getElementById('KhmerName').value = cells[0].textContent;
        document.getElementById('EnglishName').value = cells[1].textContent;
        document.getElementById('DateOfBirth').value = cells[2].textContent;
        document.getElementById('Male').checked = cells[3].textContent.trim() === "Male";
        document.getElementById('Female').checked = cells[3].textContent.trim() === "Female";
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

        document.getElementById('register_Form').dataset.editingRow = row.rowIndex;
    }
});
//Update form
document.querySelector('.hh tbody').addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-btn')) {
        const row = event.target.closest('tr');
        const cells = row.querySelectorAll('td');

        // ✅ រក្សាទុក rowIndex
        document.getElementById('register_Form').dataset.editingRow = row.rowIndex;

        document.getElementById('KhmerName').value = cells[0].textContent;
        document.getElementById('EnglishName').value = cells[1].textContent;
        document.getElementById('DateOfBirth').value = cells[2].textContent;
        
        // ✅ Update Gender (Radio)
        document.getElementById('Male').checked = cells[3].textContent.trim() === "Male";
        document.getElementById('Female').checked = cells[3].textContent.trim() === "Female";

        document.getElementById('Nationality').value = cells[4].textContent;
        document.getElementById('PlaceofBirth').value = cells[5].textContent;
        document.getElementById('Address').value = cells[6].textContent;
        document.getElementById('PhoneNumber').value = cells[7].textContent;
        document.getElementById('Email').value = cells[8].textContent;
        document.getElementById('FatherName').value = cells[9].textContent;
        document.getElementById('FatherPhoneNumber').value = cells[10].textContent;
        document.getElementById('MotherName').value = cells[11].textContent;
        document.getElementById('MotherPhoneNumber').value = cells[12].textContent;

        const selectedCheckboxes = Array.from(document.querySelectorAll('.Apply input[type="checkbox"]:checked'))
        .map(e => e.value);
        console.log("Selected ApplyFor:", selectedCheckboxes);
        cells[13].textContent = selectedCheckboxes.join(', ');
        document.getElementById('Year').value = cells[14].textContent;
        document.getElementById('Batch').value = cells[15].textContent;
        document.getElementById('Faculty').value = cells[16].textContent;
        document.getElementById('Major').value = cells[17].textContent;
        document.getElementById('Session').value = cells[18].textContent;

        // ✅ Update ApplyFor (Checkbox)
        document.querySelectorAll('.Apply input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = cells[19].textContent.includes(checkbox.value);
        });

        alert("✏️ សូមកែប្រែទិន្នន័យហើយចុច Update!");
    }
});
document.querySelector('.update-btn').addEventListener('click', function(event) {
    event.preventDefault();

    const editingRowIndex = parseInt(document.getElementById('register_Form').dataset.editingRow, 10);
    console.log("editingRowIndex:", editingRowIndex);

    if (isNaN(editingRowIndex) || editingRowIndex <= 0) {
        alert('Invalid row index.');
        return;
    }

    const table = document.querySelector('.hh tbody');
    console.log("Table element:", table);
    
    const row = table.rows[editingRowIndex - 1];
    console.log("Row element:", row);
    
    if (!row) {
        alert('Row not found.');
        return;
    }

    const cells = row.querySelectorAll('td');
    console.log("Cells:", cells);

    // ពិនិត្យថា cells មានគ្រប់ Index ដែលត្រូវការឬអត់
    if (cells.length < 20) {
        alert('Table row does not have enough columns.');
        return;
    }

    cells[0].textContent = document.getElementById('KhmerName').value;
    cells[1].textContent = document.getElementById('EnglishName').value;
    cells[2].textContent = document.getElementById('DateOfBirth').value;

    // ✅ Update Gender
    const selectedGender = document.querySelector('input[name="Gender"]:checked')?.value || '';
    console.log("Selected Gender:", selectedGender);
    cells[3].textContent = selectedGender;

    cells[4].textContent = document.getElementById('Nationality').value;
    cells[5].textContent = document.getElementById('PlaceofBirth').value;
    cells[6].textContent = document.getElementById('Address').value;
    cells[7].textContent = document.getElementById('PhoneNumber').value;
    cells[8].textContent = document.getElementById('Email').value;
    cells[9].textContent = document.getElementById('FatherName').value;
    cells[10].textContent = document.getElementById('FatherPhoneNumber').value;
    cells[11].textContent = document.getElementById('MotherName').value;
    cells[12].textContent = document.getElementById('MotherPhoneNumber').value;

    // ✅ Update ApplyFor (Checkbox)
    const selectedCheckboxes = Array.from(document.querySelectorAll('.Apply input[type="checkbox"]:checked'))
        .map(e => e.value);
    console.log("Selected ApplyFor:", selectedCheckboxes);
    cells[13].textContent = selectedCheckboxes.join(', ');

    cells[14].textContent = document.getElementById('Year').value;
    cells[15].textContent = document.getElementById('Batch').value;
    cells[16].textContent = document.getElementById('Faculty').value;
    cells[17].textContent = document.getElementById('Major').value;
    cells[18].textContent = document.getElementById('Session').value;
    const School = Array .from(document.querySelectorAll('.School input[type="checkbox"]:checked' ))
    .map(e => e.value);
    console.log("Selected School:", selectedCheckboxes);
    cells[19].textContent = selectedCheckboxes.join(', ');
    alert("✅ ទិន្នន័យត្រូវបានកែប្រែ!");
});
</script> */}