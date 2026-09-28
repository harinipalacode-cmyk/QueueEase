package com.clinic.patientmanagement.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="patient")

public class Patient {
     @Id 
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;
     private String name;
     private String phone;
     private int age;
     private String problem;
     private String Dname;

     public Patient(){
        
     }

     public Patient(String name,String phone,int age,String problem,String Dname){
        this.name = name;
        this.phone = phone;
        this.age = age;
        this.problem = problem;
        this.Dname = Dname;
     }

     public Long getId(){
        return id;
     }
     public void setId(Long id){
        this.id = id;
     }

     public String getName(){
        return name;
     }
     public void setName(String name){
        this.name = name;
     }
     public String getPhone(){
        return phone;
     }
     public void setPhone(String phone){
        this.phone = phone;
     } 

     public int getAge(){
        return age;
     }
     public void setAge(int age){
        this.age = age;
     }
     public String getProblem(){
          return problem;
     }
     public void setProblem(String problem){
        this.problem = problem;
     }
     public String getDname(){
        return Dname;
     }
     public void setDname(String Dname){
        this.Dname=Dname;
     }

}
