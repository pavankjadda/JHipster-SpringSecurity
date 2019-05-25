package com.projects.service.mapper;

import com.projects.domain.*;
import com.projects.service.dto.EmployeeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Employee} and its DTO {@link EmployeeDTO}.
 */
@Mapper(componentModel = "spring", uses = {AddressMapper.class})
public interface EmployeeMapper extends EntityMapper<EmployeeDTO, Employee> {

    @Mapping(source = "address.id", target = "addressId")
    @Mapping(source = "address.streetName", target = "addressStreetName")
    EmployeeDTO toDto(Employee employee);

    @Mapping(target = "employeeProjects", ignore = true)
    @Mapping(source = "addressId", target = "address")
    Employee toEntity(EmployeeDTO employeeDTO);

    default Employee fromId(Long id) {
        if (id == null) {
            return null;
        }
        Employee employee = new Employee();
        employee.setId(id);
        return employee;
    }
}
