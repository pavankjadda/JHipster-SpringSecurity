package com.projects.service.mapper;

import com.projects.domain.*;
import com.projects.service.dto.EmployeeProjectDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link EmployeeProject} and its DTO {@link EmployeeProjectDTO}.
 */
@Mapper(componentModel = "spring", uses = {EmployeeMapper.class, ProjectMapper.class})
public interface EmployeeProjectMapper extends EntityMapper<EmployeeProjectDTO, EmployeeProject> {

    @Mapping(source = "employee.id", target = "employeeId")
    @Mapping(source = "employee.firstName", target = "employeeFirstName")
    @Mapping(source = "project.id", target = "projectId")
    @Mapping(source = "project.projectTitle", target = "projectProjectTitle")
    EmployeeProjectDTO toDto(EmployeeProject employeeProject);

    @Mapping(source = "employeeId", target = "employee")
    @Mapping(source = "projectId", target = "project")
    EmployeeProject toEntity(EmployeeProjectDTO employeeProjectDTO);

    default EmployeeProject fromId(Long id) {
        if (id == null) {
            return null;
        }
        EmployeeProject employeeProject = new EmployeeProject();
        employeeProject.setId(id);
        return employeeProject;
    }
}
