// ==================================================
// CREATE PATIENT
// ==================================================

const patientForm = document.getElementById("patientForm");

if (patientForm) {

    patientForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const age =
            document.getElementById("age").value.trim();

        const problem =
            document.getElementById("problem").value.trim();

        const Dname =
            document.getElementById("Dname").value.trim();

        const message =
            document.getElementById("message");

        message.innerText = "";
        message.className = "";


        // Name validation
        if (name === "") {

            message.innerText =
                "Patient name is required.";

            message.className = "error-message";

            return;
        }

        if (name.length < 3) {

            message.innerText =
                "Patient name must contain at least 3 characters.";

            message.className = "error-message";

            return;
        }


        // Phone validation
        if (phone === "") {

            message.innerText =
                "Phone number is required.";

            message.className = "error-message";

            return;
        }

        if (!/^[0-9]{10}$/.test(phone)) {

            message.innerText =
                "Please enter a valid 10-digit phone number.";

            message.className = "error-message";

            return;
        }


        // Age validation
        if (age === "") {

            message.innerText =
                "Age is required.";

            message.className = "error-message";

            return;
        }

        if (Number(age) <= 0 || Number(age) > 120) {

            message.innerText =
                "Please enter a valid age.";

            message.className = "error-message";

            return;
        }


        // Problem validation
        if (problem === "") {

            message.innerText =
                "Patient problem is required.";

            message.className = "error-message";

            return;
        }


        // Doctor validation
        if (Dname === "") {

            message.innerText =
                "Doctor name is required.";

            message.className = "error-message";

            return;
        }


        // Create patient object
        const patient = {

            name: name,

            phone: phone,

            age: Number(age),

            problem: problem,

            Dname: Dname

        };


        // Send request to Spring Boot
        fetch("/patient", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(patient)

        })

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Failed to create patient"
                );
            }

            return response.json();

        })

        .then(data => {

            message.innerText =
                "Patient added successfully.";

            message.className =
                "success-message";

            patientForm.reset();

        })

        .catch(error => {

            message.innerText =
                "Error adding patient. Please try again.";

            message.className =
                "error-message";

            console.error(
                "Error creating patient:",
                error
            );

        });

    });

}


// ==================================================
// READ ALL PATIENTS
// ==================================================

const patientTableBody =
    document.getElementById("patientTableBody");

if (patientTableBody) {

    fetch("/patient")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Failed to load patients"
                );

            }

            return response.json();

        })

        .then(patients => {

            patientTableBody.innerHTML = "";

            if (patients.length === 0) {

                patientTableBody.innerHTML = `
                    <tr>
                        <td colspan="7" class="status-message">
                            No patient records found.
                        </td>
                    </tr>
                `;

                return;
            }


            patients.forEach(patient => {

                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>${patient.id}</td>

                    <td>${patient.name}</td>

                    <td>${patient.phone}</td>

                    <td>${patient.age}</td>

                    <td>${patient.problem}</td>

                    <td>${patient.Dname}</td>

                    <td>

                        <button
                            class="edit-button"
                            onclick="editPatient(${patient.id})">
                            Edit
                        </button>

                        <button
                            class="delete-button"
                            onclick="deletePatient(${patient.id})">
                            Delete
                        </button>

                    </td>

                `;


                patientTableBody.appendChild(row);

            });

        })

        .catch(error => {

            console.error(
                "Error loading patients:",
                error
            );

            patientTableBody.innerHTML = `

                <tr>

                    <td
                        colspan="7"
                        class="status-message">
                        Unable to load patient records.
                    </td>

                </tr>

            `;

        });

}


// ==================================================
// DELETE PATIENT
// ==================================================

function deletePatient(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this patient?"
        );

    if (!confirmed) {

        return;

    }


    fetch(`/patient/${id}`, {

        method: "DELETE"

    })

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Failed to delete patient"
            );

        }

        return response.text();

    })

    .then(() => {

        alert(
            "Patient deleted successfully."
        );

        location.reload();

    })

    .catch(error => {

        console.error(
            "Error deleting patient:",
            error
        );

        alert(
            "Error deleting patient."
        );

    });

}


// ==================================================
// EDIT PATIENT
// ==================================================

function editPatient(id) {

    const name =
        prompt("Enter patient name:");

    if (name === null) {

        return;

    }


    const phone =
        prompt("Enter phone number:");

    if (phone === null) {

        return;

    }


    const age =
        prompt("Enter patient age:");

    if (age === null) {

        return;

    }


    const problem =
        prompt("Enter patient problem:");

    if (problem === null) {

        return;

    }


    const Dname =
        prompt("Enter doctor name:");

    if (Dname === null) {

        return;

    }


    if (
        name.trim() === "" ||
        phone.trim() === "" ||
        age.trim() === "" ||
        problem.trim() === "" ||
        Dname.trim() === ""
    ) {

        alert(
            "All fields are required."
        );

        return;

    }


    if (!/^[0-9]{10}$/.test(phone.trim())) {

        alert(
            "Please enter a valid 10-digit phone number."
        );

        return;

    }


    if (
        Number(age) <= 0 ||
        Number(age) > 120
    ) {

        alert(
            "Please enter a valid age."
        );

        return;

    }


    const patient = {

        name: name.trim(),

        phone: phone.trim(),

        age: Number(age),

        problem: problem.trim(),

        Dname: Dname.trim()

    };


    fetch(`/patient/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(patient)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error(
                `Update failed. Status: ${response.status}`
            );

        }

        return response.json();

    })

    .then(updatedPatient => {

        alert(
            "Patient updated successfully!"
        );

        location.reload();

    })

    .catch(error => {

        console.error(
            "Error updating patient:",
            error
        );

        alert(
            "Error updating patient."
        );

    });

}
// ==========================================
// DOCTOR MANAGEMENT
// ==========================================


// Add Doctor
const doctorForm =
    document.getElementById("doctorForm");

if (doctorForm) {

    doctorForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const dtname =
                document
                    .getElementById("dtname")
                    .value
                    .trim();

            const ptname =
                document
                    .getElementById("ptname")
                    .value
                    .trim();

            const ptage =
                parseInt(
                    document
                        .getElementById("ptage")
                        .value
                );

            const message =
                document.getElementById(
                    "doctorMessage"
                );


            // Validation
            if (dtname === "") {

                message.innerText =
                    "Please enter the doctor name.";

                message.style.color =
                    "#d32f2f";

                return;
            }


            if (ptname === "") {

                message.innerText =
                    "Please enter the patient name.";

                message.style.color =
                    "#d32f2f";

                return;
            }


            if (
                isNaN(ptage) ||
                ptage < 1 ||
                ptage > 120
            ) {

                message.innerText =
                    "Please enter a valid patient age.";

                message.style.color =
                    "#d32f2f";

                return;
            }


            const doctorData = {

                dtname: dtname,

                ptname: ptname,

                ptage: ptage

            };


            try {

                const response =
                    await fetch("/doctors", {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify(
                                doctorData
                            )

                    });


                if (!response.ok) {

                    throw new Error(
                        "Failed to add doctor"
                    );

                }


                const savedDoctor =
                    await response.json();


                message.innerText =
                    "Doctor record added successfully!";

                message.style.color =
                    "#2e7d32";


                doctorForm.reset();


            } catch (error) {

                console.error(
                    "Error adding doctor:",
                    error
                );

                message.innerText =
                    "Unable to add doctor record.";

                message.style.color =
                    "#d32f2f";

            }

        }
    );

}


// ==========================================
// LOAD DOCTORS
// ==========================================

async function loadDoctors() {

    const tableBody =
        document.getElementById(
            "doctorTableBody"
        );


    if (!tableBody) {

        return;

    }


    try {

        const response =
            await fetch("/doctors");


        if (!response.ok) {

            throw new Error(
                "Failed to load doctors"
            );

        }


        const doctors =
            await response.json();


        tableBody.innerHTML = "";


        if (doctors.length === 0) {

            tableBody.innerHTML = `

                <tr>

                    <td
                        colspan="5"
                        style="text-align:center;">

                        No doctor records found.

                    </td>

                </tr>

            `;

            return;

        }


        doctors.forEach(
            function (doctor) {

                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>
                        ${doctor.id}
                    </td>

                    <td>
                        ${doctor.dtName}
                    </td>

                    <td>
                        ${doctor.ptName}
                    </td>

                    <td>
                        ${doctor.ptAge}
                    </td>

                    <td>

                        <button
                            class="button edit-button"
                            onclick="editDoctor(${doctor.id})">

                            Edit

                        </button>

                        <button
                            class="button delete-button"
                            onclick="deleteDoctor(${doctor.id})">

                            Delete

                        </button>

                    </td>

                `;


                tableBody.appendChild(row);

            }
        );


    } catch (error) {

        console.error(
            "Error loading doctors:",
            error
        );


        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    style="text-align:center; color:red;">

                    Unable to load doctor records.

                </td>

            </tr>

        `;

    }

}


// ==========================================
// DELETE DOCTOR
// ==========================================

async function deleteDoctor(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this doctor record?"
        );


    if (!confirmed) {

        return;

    }


    try {

        const response =
            await fetch(
                `/doctors/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to delete doctor"
            );

        }


        alert(
            "Doctor record deleted successfully."
        );


        loadDoctors();


    } catch (error) {

        console.error(
            "Error deleting doctor:",
            error
        );


        alert(
            "Unable to delete doctor record."
        );

    }

}


// ==========================================
// EDIT DOCTOR
// ==========================================

async function editDoctor(id) {

    const dtname =
        prompt(
            "Enter doctor name:"
        );


    if (dtname === null) {

        return;

    }


    const ptname =
        prompt(
            "Enter patient name:"
        );


    if (ptname === null) {

        return;

    }


    const ptage =
        prompt(
            "Enter patient age:"
        );


    if (ptage === null) {

        return;

    }


    const age =
        parseInt(ptage);


    if (
        isNaN(age) ||
        age < 1 ||
        age > 120
    ) {

        alert(
            "Please enter a valid patient age."
        );

        return;

    }


    const doctorData = {

        dtname: dtname.trim(),

        ptname: ptname.trim(),

        ptage: age

    };


    try {

        const response =
            await fetch(
                `/doctors/${id}`,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            doctorData
                        )

                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to update doctor"
            );

        }


        alert(
            "Doctor record updated successfully."
        );


        loadDoctors();


    } catch (error) {

        console.error(
            "Error updating doctor:",
            error
        );


        alert(
            "Unable to update doctor record."
        );

    }

}