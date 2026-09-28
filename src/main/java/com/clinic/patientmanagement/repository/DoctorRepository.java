package com.clinic.patientmanagement.repository;
import com.clinic.patientmanagement.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
public interface DoctorRepository extends JpaRepository<Doctor,Long> {

}
