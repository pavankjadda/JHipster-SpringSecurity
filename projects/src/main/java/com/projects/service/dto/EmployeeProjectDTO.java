package com.projects.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.projects.domain.EmployeeProject} entity.
 */
public class EmployeeProjectDTO implements Serializable {

    private Long id;


    private Long employeeId;

    private String employeeFirstName;

    private Long projectId;

    private String projectProjectTitle;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeFirstName() {
        return employeeFirstName;
    }

    public void setEmployeeFirstName(String employeeFirstName) {
        this.employeeFirstName = employeeFirstName;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectProjectTitle() {
        return projectProjectTitle;
    }

    public void setProjectProjectTitle(String projectProjectTitle) {
        this.projectProjectTitle = projectProjectTitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EmployeeProjectDTO employeeProjectDTO = (EmployeeProjectDTO) o;
        if (employeeProjectDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employeeProjectDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EmployeeProjectDTO{" +
            "id=" + getId() +
            ", employee=" + getEmployeeId() +
            ", employee='" + getEmployeeFirstName() + "'" +
            ", project=" + getProjectId() +
            ", project='" + getProjectProjectTitle() + "'" +
            "}";
    }
}
