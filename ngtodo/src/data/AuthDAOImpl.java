package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import entities.User;

@Transactional
@Repository
public class AuthDAOImpl implements AuthDAO {

	@PersistenceContext
	private EntityManager em;

	@Autowired
	private PasswordEncoder encoder;
	
	@Override
	public User register(User u) {
		//You get the password from the user and then encode it
		String encryotedPW = encoder.encode(u.getPassword());
		//Set the user's new encryoted password
		u.setPassword(encryotedPW);
		//persist user
		em.persist(u);
		em.flush();
		return u;
	}

	@Override
	public User login(User u) {
		String query = "SELECT u FROM User u WHERE u.email = :email";
		List<User> users = em.createQuery(query, User.class)
				.setParameter("email", u.getEmail())
				.getResultList();
		if(users.size() > 0 ) {
			//matches method encrypts THEN compares then returns boolean
			boolean doMatch = encoder.matches(u.getPassword(), users.get(0).getPassword());
			//if passwords do match...
			if(doMatch) {
				return users.get(0);
			}
		}
		return null;
		//by returning null the user doesn't receive info on what happened but maybe you want that?
	}

}
