package data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Todo;
import entities.User;

@Transactional
@Repository
public class TodoDAOImpl implements TodoDAO {
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public Set<Todo> index(int uid) {
		String query = "SELECT t FROM Todo t WHERE user.id = :id";
		List<Todo> todos = em.createQuery(query, Todo.class).setParameter("id", uid).getResultList();
		return new HashSet<Todo>(todos);
	}

	@Override
	public Todo show(int uid, int tid) {
		String query = "SELECT t FROM Todo t WHERE t.user.id = :uid AND t.id = :tid";
		Todo todo = em.createQuery(query, Todo.class)
				.setParameter("uid", uid)
				.setParameter("tid", tid)
				.getSingleResult();
		return todo;
	}

	@Override
	public Todo create(int uid, String todoJson) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			Todo mappedTodo = mapper.readValue(todoJson, Todo.class);
			User user = em.find(User.class, uid);
			mappedTodo.setUser(user);
			em.persist(mappedTodo);
			em.flush();
			return mappedTodo;
		} catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Todo update(int uid, int tid, String todoJson) {
		ObjectMapper mapper = new ObjectMapper();
		Todo managedTodo = em.find(Todo.class, tid);
		if(managedTodo.getUser().getId() != uid) {
			return null;
		}
		try {
			Todo mappedTodo = mapper.readValue(todoJson, Todo.class);
			managedTodo.setTask(mappedTodo.getTask());
			managedTodo.setDescription(mappedTodo.getDescription());
			managedTodo.setCompleted(mappedTodo.isCompleted());
			managedTodo.setCreatedAt(mappedTodo.getCreatedAt());
			managedTodo.setDueDate(mappedTodo.getDueDate());
			managedTodo.setCompleteDate(mappedTodo.getCompleteDate());
			managedTodo.setUpdatedAt(mappedTodo.getUpdatedAt());
			managedTodo.setUser(mappedTodo.getUser());
			
			return managedTodo;
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	
	}

	@Override
	public Boolean destroy(int uid, int tid) {
		String query = "DELETE FROM Todo WHERE id = :tid";
		int result = em.createQuery(query).setParameter("tid", tid).executeUpdate();
		System.out.println("******************************************************");
		System.out.println(result);
		if (result > 0) {
			return true;
		} else {
			return false;
		}
	}
//		Todo todo = em.find(Todo.class, tid);
//		System.out.println("********************************************************************");
//		if (todo.getUser().getId() == uid) {
//			em.remove(todo);
//			System.out.println("Todo deleted");
//			return true;
//		} else {
//			System.out.println("Todo not deleted");
//			return false;
//		}
	

}
