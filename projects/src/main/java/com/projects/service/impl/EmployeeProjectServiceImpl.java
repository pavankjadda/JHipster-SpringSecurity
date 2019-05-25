package com.projects.service.impl;

import com.projects.service.EmployeeProjectService;
import com.projects.domain.EmployeeProject;
import com.projects.repository.EmployeeProjectRepository;
import com.projects.service.dto.EmployeeProjectDTO;
import com.projects.service.mapper.EmployeeProjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link EmployeeProject}.
 */
@Service
@Transactional
public class EmployeeProjectServiceImpl implements EmployeeProjectService {

    private final Logger log = LoggerFactory.getLogger(EmployeeProjectServiceImpl.class);

    private final EmployeeProjectRepository employeeProjectRepository;

    private final EmployeeProjectMapper employeeProjectMapper;

    public EmployeeProjectServiceImpl(EmployeeProjectRepository employeeProjectRepository, EmployeeProjectMapper employeeProjectMapper) {
        this.employeeProjectRepository = employeeProjectRepository;
        this.employeeProjectMapper = employeeProjectMapper;
    }

    /**
     * Save a employeeProject.
     *
     * @param employeeProjectDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public EmployeeProjectDTO save(EmployeeProjectDTO employeeProjectDTO) {
        log.debug("Request to save EmployeeProject : {}", employeeProjectDTO);
        EmployeeProject employeeProject = employeeProjectMapper.toEntity(employeeProjectDTO);
        employeeProject = employeeProjectRepository.save(employeeProject);
        return employeeProjectMapper.toDto(employeeProject);
    }

    /**
     * Get all the employeeProjects.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<EmployeeProjectDTO> findAll() {
        log.debug("Request to get all EmployeeProjects");
        return employeeProjectRepository.findAll().stream()
            .map(employeeProjectMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one employeeProject by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<EmployeeProjectDTO> findOne(Long id) {
        log.debug("Request to get EmployeeProject : {}", id);
        return employeeProjectRepository.findById(id)
            .map(employeeProjectMapper::toDto);
    }

    /**
     * Delete the employeeProject by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete EmployeeProject : {}", id);
        employeeProjectRepository.deleteById(id);
    }
}
