package com.clinic.patientmanagement.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity  

@Table(name="doctors") 
public class Doctor {
  @Id 
  @GeneratedValue(strategy  = GenerationType.IDENTITY) 
  private Long id;
  private String dtname;
  private String ptname;   
  private int ptage;
  public Doctor(){
  
  }
  public Doctor(String dtname,String ptname,int ptage){
    this.dtname = dtname;
    this.ptname = ptname;
    this.ptage = ptage;
  }

  public Long getId(){
    return id;
  }
  public void setId(Long id){
    this.id = id;
  }

  public String getDtName(){
    return dtname;
  }

  public void setDtName(String dtname){
    this.dtname = dtname;
  }

  public String getPtName(){
    return ptname;
  }

  public void setPtName(String ptname){
    this.ptname = ptname;
  }

  public int getPtAge(){
    return ptage;
  }

  public void setPtAge(int ptage){
    this.ptage = ptage;
  }

}
