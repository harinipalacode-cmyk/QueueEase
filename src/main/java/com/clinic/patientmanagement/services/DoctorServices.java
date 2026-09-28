package com.clinic.patientmanagement.services;

import org.springframework.stereotype.Service;

import com.clinic.patientmanagement.entity.Doctor;
import com.clinic.patientmanagement.repository.DoctorRepository;
import java.util.List;

@Service
public class DoctorServices {
     private final DoctorRepository doctorrepository;

     public DoctorServices(DoctorRepository doctorrepository){
        this.doctorrepository = doctorrepository;
     }

     public Doctor createDoctor(Doctor doctor){
        return doctorrepository.save(doctor);
     }

     public List<Doctor> getAllDoctors(){
        return doctorrepository.findAll();
     }

     public Doctor getDoctorById(Long id){
        return doctorrepository.findById(id).orElse(null);
     }

     public Doctor updateDoctor(Long id,Doctor doctor){
        Doctor existingDoctor = doctorrepository.findById(id).orElse(null);
        if(existingDoctor == null){
            return  null;
        }

        existingDoctor.setDtName(doctor.getDtName());
        existingDoctor.setPtName(doctor.getPtName());
        existingDoctor.setPtAge(doctor.getPtAge());
        return doctorrepository.save(existingDoctor);
     }

     public void deleteDoctor(Long id){
        doctorrepository.deleteById(id);
     }

}
