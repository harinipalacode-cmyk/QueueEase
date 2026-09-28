package com.clinic.patientmanagement.services;

import com.clinic.patientmanagement.entity.Patient;
import com.clinic.patientmanagement.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServices {
   private final PatientRepository patientrepository;

   public PatientServices(PatientRepository patientrepository){
    this.patientrepository = patientrepository;
   }

   public Patient createPatient(Patient patient){
      return patientrepository.save(patient);
   }
   public List<Patient> getAllPatients(){
    return patientrepository.findAll();
   } 
   public Patient getPatientById(Long id){
    return patientrepository.findById(id).orElse(null);
   } 

   public Patient updatePatient(Long id,Patient patient)
   {
     Patient existingPatient = patientrepository.findById(id).orElse(null);
     if(existingPatient == null){
        return null;
     }

     existingPatient.setName(patient.getName());
     existingPatient.setAge(patient.getAge());
     existingPatient.setPhone(patient.getPhone());
     existingPatient.setProblem(patient.getProblem());
     existingPatient.setDname(patient.getDname());
     return patientrepository.save(existingPatient);
   }

   public void deletePatient(Long id){
    patientrepository.deleteById(id);
   }
}
