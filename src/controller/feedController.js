import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { app } from '../lib/config-firebase';

// const auth = getAuth(); // Obtener la instancia de Firebase Authentication
const db = getFirestore(app);

export async function guardarPost(datos) {
  try {
    console.log('Datos antes de guardar:', datos); // Agrega este mensaje de depuración
    const documento = await addDoc(collection(db, 'posts'), datos);
    return documento;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
  return null;
}

export async function traerpost() {
  try {
    const todosLosPosts = query(collection(db, 'posts'), orderBy('created_date', 'desc'));
    const querySnapshot = await getDocs(todosLosPosts);
    return querySnapshot;
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    return null;
  }
}

// ...

// Likes
export async function addLiked(userId, idPost) {
  const documentoPosts = doc(db, 'posts', idPost);

  // Atomically add a new usuario to the "likes" array field.
  await updateDoc(documentoPosts, {
    likes: arrayUnion(userId),
  });
}

export async function removeLiked(userId, idPost) {
  const documentoPosts = doc(db, 'posts', idPost);
  // Atomically remove a usuario from the "likes" array field.
  await updateDoc(documentoPosts, {
    likes: arrayRemove(userId),
  });
}
