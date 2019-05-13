package com.projects.service;

import com.projects.service.dto.EmployeeProjectDTO;
import java.util.List;

/**
 * Service Interface for managing EmployeeProject.
 */
public interface EmployeeProjectService {

    /**
     * Save a employeeProject.
     *
     * @param employeeProjectDTO the entity to save
     * @return the persisted entity
     */
    EmployeeProjectDTO save(EmployeeProjectDTO employeeProjectDTO);

    /**
     * Get all the employeeProjects.
     *
     * @return the list of entities
     */
    List<EmployeeProjectDTO> findAll();

    /**
     * Get the "id" employeeProject.
     *
     * @param id the id of the entity
     * @return the entity
     */
    EmployeeProjectDTO findOne(Long id);

    /**
     * Delete the "id" employeeProject.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
