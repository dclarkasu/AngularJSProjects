package tests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Todo;

public class TodoTest {
	private EntityManagerFactory emf = null;
	private EntityManager em = null;
	Todo todo;
	
	@Before
	public void setUp() {
		emf = Persistence.createEntityManagerFactory("ngtodo");
		em = emf.createEntityManager();
	}
	
	@After
	public void tearDown() {
		em.close();
		emf.close();

	}
	
	@Test
	public void test_Smoke() {
		boolean pass = true;
		assertEquals(pass, true);
	}
	
	@Test
	public void test_Todo_Connected_to_DB() {
		todo = em.find(Todo.class, 1);
		assertEquals(todo.getTask(), "Graduate SD");
		assertEquals(todo.getDescription(), "They are slave drivers here");
	}
	
	@Test
	public void test_Todo_to_User() {
		todo = em.find(Todo.class, 1);
		assertEquals(todo.getUser().getTodos().size(), 1);
		assertEquals(todo.getUser().getPassword(), "bugs");
	}
	
}
