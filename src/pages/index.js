import { useEffect, useState } from 'react';
import { collection, getFirestore, query, onSnapshot, orderBy } from 'firebase/firestore';
import withAuth from '../components/withAuth';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Main Page</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.text}</p>
          {post.attachments.map(url => (
            <img key={url} src={url} alt="Post" style={{ width: '100px', height: 'auto' }} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default withAuth(HomePage);