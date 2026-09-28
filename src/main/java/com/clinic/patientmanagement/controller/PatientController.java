package com.clinic.patientmanagement.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.clinic.patientmanagement.entity.Patient;
import com.clinic.patientmanagement.services.PatientServices;

@Controller
public class PatientController {

    private final PatientServices patientservices;

    public PatientController(PatientServices patientservices) {
        this.patientservices = patientservices;
    }

    @PostMapping("/patient")
    @ResponseBody
    public Patient createPatient(@RequestBody Patient patient) {
        return patientservices.createPatient(patient);
    }

    @GetMapping("/patient")
    @ResponseBody
    public List<Patient> getAllPatients() {
        return patientservices.getAllPatients();
    }

    @GetMapping("/patient/{id}")
    @ResponseBody
    public Patient getPatientById(@PathVariable Long id) {
        return patientservices.getPatientById(id);
    }

    @PutMapping("/patient/{id}")
    @ResponseBody
    public Patient updatePatient(@PathVariable Long id, @RequestBody Patient patient) {
        return patientservices.updatePatient(id, patient);
    }

    @DeleteMapping("/patient/{id}")
    @ResponseBody
    public void deletePatient(@PathVariable Long id) {
        patientservices.deletePatient(id);
    }

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/add-patient")
    public String addPatientPage() {
        return "add-patient";
    }

    @GetMapping("/patient-page")
    public String patientPage() {
        return "patient-page";
    }
}
