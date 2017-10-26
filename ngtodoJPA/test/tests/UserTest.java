package tests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.User;

public class UserTest {
	private EntityManagerFactory emf = null;
	private EntityManager em = null;
	User user;
	
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
	public void test_User_Connected_to_DB() {
		user = em.find(User.class, 1);
		assertEquals(user.getPassword(), "bugs");
		assertEquals(user.getEmail(), "michaeljordan@spacejam.com");
	}
	
	@Test
	public void test_User_to_Todo() {
		user = em.find(User.class, 1);
		assertNotNull(user.getTodos());
		assertEquals(user.getTodos().get(0).getTask(), "Graduate SD");
	}
	
}
