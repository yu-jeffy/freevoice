import React, { useEffect, useState } from 'react';
import { collection, getFirestore, query, onSnapshot, orderBy } from 'firebase/firestore';
import withAuth from '../components/withAuth';
import Layout from '../components/Layout'; // Assuming you have a Layout component

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getFirestore();
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
      setError("Failed to fetch posts.");
      console.error("Error fetching posts: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Layout><div>Loading...</div></Layout>;
  }

  if (error) {
    return <Layout><div>Error: {error}</div></Layout>;
  }

  return (
    <Layout>
      <div>
        <h1>Main Page</h1>
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.text}</p>
              {post.attachments && post.attachments.map(url => (
                <img key={url} src={url} alt="Post" style={{ width: '100px', height: 'auto' }} />
              ))}
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </Layout>
  );
};

export default withAuth(HomePage);