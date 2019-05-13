package com.projects.service;

import com.projects.service.dto.EmployeeProjectDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.projects.domain.EmployeeProject}.
 */
public interface EmployeeProjectService {

    /**
     * Save a employeeProject.
     *
     * @param employeeProjectDTO the entity to save.
     * @return the persisted entity.
     */
    EmployeeProjectDTO save(EmployeeProjectDTO employeeProjectDTO);

    /**
     * Get all the employeeProjects.
     *
     * @return the list of entities.
     */
    List<EmployeeProjectDTO> findAll();


    /**
     * Get the "id" employeeProject.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<EmployeeProjectDTO> findOne(Long id);

    /**
     * Delete the "id" employeeProject.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
