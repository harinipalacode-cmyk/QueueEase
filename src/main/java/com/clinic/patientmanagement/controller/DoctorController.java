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

import com.clinic.patientmanagement.entity.Doctor;
import com.clinic.patientmanagement.services.DoctorServices;

@Controller
public class DoctorController {

    private final DoctorServices doctorservices;

    public DoctorController(DoctorServices doctorservices) {
        this.doctorservices = doctorservices;
    }

    @PostMapping("/doctors")
    @ResponseBody
    public Doctor createDoctor(@RequestBody Doctor doctor) {
        return doctorservices.createDoctor(doctor);
    }

    @GetMapping("/doctors")
    @ResponseBody
    public List<Doctor> getAllDoctors() {
        return doctorservices.getAllDoctors();
    }

    @GetMapping("/doctors/{id}")
    @ResponseBody
    public Doctor getDoctorById(@PathVariable Long id) {
        return doctorservices.getDoctorById(id);
    }

    @PutMapping("/doctors/{id}")
    @ResponseBody
    public Doctor updateDoctor(
            @PathVariable Long id,
            @RequestBody Doctor doctor) {

        return doctorservices.updateDoctor(id, doctor);
    }

    @DeleteMapping("/doctors/{id}")
    @ResponseBody
    public void deleteDoctor(@PathVariable Long id) {
        doctorservices.deleteDoctor(id);
    }

    @GetMapping("/visit-details")
    public String visitingdetailsPage() {
        return "visited patient details";
    }

    @GetMapping("/doctor-page")
    public String doctorPage() {
        return "doctor-page";
    }
}