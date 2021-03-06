package com.projects.web.rest;

import com.projects.ProjectsApp;
import com.projects.config.TestSecurityConfiguration;
import com.projects.domain.EmployeeProject;
import com.projects.repository.EmployeeProjectRepository;
import com.projects.service.EmployeeProjectService;
import com.projects.service.dto.EmployeeProjectDTO;
import com.projects.service.mapper.EmployeeProjectMapper;
import com.projects.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.projects.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link EmployeeProjectResource} REST controller.
 */
@SpringBootTest(classes = {ProjectsApp.class, TestSecurityConfiguration.class})
public class EmployeeProjectResourceIT {

    @Autowired
    private EmployeeProjectRepository employeeProjectRepository;

    @Autowired
    private EmployeeProjectMapper employeeProjectMapper;

    @Autowired
    private EmployeeProjectService employeeProjectService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restEmployeeProjectMockMvc;

    private EmployeeProject employeeProject;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmployeeProjectResource employeeProjectResource = new EmployeeProjectResource(employeeProjectService);
        this.restEmployeeProjectMockMvc = MockMvcBuilders.standaloneSetup(employeeProjectResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmployeeProject createEntity(EntityManager em) {
        EmployeeProject employeeProject = new EmployeeProject();
        return employeeProject;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmployeeProject createUpdatedEntity(EntityManager em) {
        EmployeeProject employeeProject = new EmployeeProject();
        return employeeProject;
    }

    @BeforeEach
    public void initTest() {
        employeeProject = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmployeeProject() throws Exception {
        int databaseSizeBeforeCreate = employeeProjectRepository.findAll().size();

        // Create the EmployeeProject
        EmployeeProjectDTO employeeProjectDTO = employeeProjectMapper.toDto(employeeProject);
        restEmployeeProjectMockMvc.perform(post("/api/employee-projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeProjectDTO)))
            .andExpect(status().isCreated());

        // Validate the EmployeeProject in the database
        List<EmployeeProject> employeeProjectList = employeeProjectRepository.findAll();
        assertThat(employeeProjectList).hasSize(databaseSizeBeforeCreate + 1);
        EmployeeProject testEmployeeProject = employeeProjectList.get(employeeProjectList.size() - 1);
    }

    @Test
    @Transactional
    public void createEmployeeProjectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = employeeProjectRepository.findAll().size();

        // Create the EmployeeProject with an existing ID
        employeeProject.setId(1L);
        EmployeeProjectDTO employeeProjectDTO = employeeProjectMapper.toDto(employeeProject);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmployeeProjectMockMvc.perform(post("/api/employee-projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeProjectDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EmployeeProject in the database
        List<EmployeeProject> employeeProjectList = employeeProjectRepository.findAll();
        assertThat(employeeProjectList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEmployeeProjects() throws Exception {
        // Initialize the database
        employeeProjectRepository.saveAndFlush(employeeProject);

        // Get all the employeeProjectList
        restEmployeeProjectMockMvc.perform(get("/api/employee-projects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(employeeProject.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getEmployeeProject() throws Exception {
        // Initialize the database
        employeeProjectRepository.saveAndFlush(employeeProject);

        // Get the employeeProject
        restEmployeeProjectMockMvc.perform(get("/api/employee-projects/{id}", employeeProject.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(employeeProject.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEmployeeProject() throws Exception {
        // Get the employeeProject
        restEmployeeProjectMockMvc.perform(get("/api/employee-projects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmployeeProject() throws Exception {
        // Initialize the database
        employeeProjectRepository.saveAndFlush(employeeProject);

        int databaseSizeBeforeUpdate = employeeProjectRepository.findAll().size();

        // Update the employeeProject
        EmployeeProject updatedEmployeeProject = employeeProjectRepository.findById(employeeProject.getId()).get();
        // Disconnect from session so that the updates on updatedEmployeeProject are not directly saved in db
        em.detach(updatedEmployeeProject);
        EmployeeProjectDTO employeeProjectDTO = employeeProjectMapper.toDto(updatedEmployeeProject);

        restEmployeeProjectMockMvc.perform(put("/api/employee-projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeProjectDTO)))
            .andExpect(status().isOk());

        // Validate the EmployeeProject in the database
        List<EmployeeProject> employeeProjectList = employeeProjectRepository.findAll();
        assertThat(employeeProjectList).hasSize(databaseSizeBeforeUpdate);
        EmployeeProject testEmployeeProject = employeeProjectList.get(employeeProjectList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingEmployeeProject() throws Exception {
        int databaseSizeBeforeUpdate = employeeProjectRepository.findAll().size();

        // Create the EmployeeProject
        EmployeeProjectDTO employeeProjectDTO = employeeProjectMapper.toDto(employeeProject);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmployeeProjectMockMvc.perform(put("/api/employee-projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeProjectDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EmployeeProject in the database
        List<EmployeeProject> employeeProjectList = employeeProjectRepository.findAll();
        assertThat(employeeProjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEmployeeProject() throws Exception {
        // Initialize the database
        employeeProjectRepository.saveAndFlush(employeeProject);

        int databaseSizeBeforeDelete = employeeProjectRepository.findAll().size();

        // Delete the employeeProject
        restEmployeeProjectMockMvc.perform(delete("/api/employee-projects/{id}", employeeProject.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<EmployeeProject> employeeProjectList = employeeProjectRepository.findAll();
        assertThat(employeeProjectList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeProject.class);
        EmployeeProject employeeProject1 = new EmployeeProject();
        employeeProject1.setId(1L);
        EmployeeProject employeeProject2 = new EmployeeProject();
        employeeProject2.setId(employeeProject1.getId());
        assertThat(employeeProject1).isEqualTo(employeeProject2);
        employeeProject2.setId(2L);
        assertThat(employeeProject1).isNotEqualTo(employeeProject2);
        employeeProject1.setId(null);
        assertThat(employeeProject1).isNotEqualTo(employeeProject2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeProjectDTO.class);
        EmployeeProjectDTO employeeProjectDTO1 = new EmployeeProjectDTO();
        employeeProjectDTO1.setId(1L);
        EmployeeProjectDTO employeeProjectDTO2 = new EmployeeProjectDTO();
        assertThat(employeeProjectDTO1).isNotEqualTo(employeeProjectDTO2);
        employeeProjectDTO2.setId(employeeProjectDTO1.getId());
        assertThat(employeeProjectDTO1).isEqualTo(employeeProjectDTO2);
        employeeProjectDTO2.setId(2L);
        assertThat(employeeProjectDTO1).isNotEqualTo(employeeProjectDTO2);
        employeeProjectDTO1.setId(null);
        assertThat(employeeProjectDTO1).isNotEqualTo(employeeProjectDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(employeeProjectMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(employeeProjectMapper.fromId(null)).isNull();
    }
}
