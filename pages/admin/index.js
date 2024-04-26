import React, { useState } from 'react';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import withAuth from "../../components/withAuth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useAuth from '../../hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AdminPage = () => {
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push('/login');
    }
  }, [user, router]);
    const [post, setPost] = useState({
        title: '',
        text: '',
        type: 'announcement',
        location: '',
        // Assume handling file state for attachments here
    });

    const [file, setFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    const handleFileChange = event => {
        setFile(event.target.files[0]);
    };

    const uploadImage = async () => {
        if (!file) return null;
        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + file.name);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return url;
    };

    const handlePostSubmit = async () => {
        const imageUrl = await uploadImage();
        const db = getFirestore();
        const postsCollection = collection(db, "posts");
        await addDoc(postsCollection, {
            ...post,
            createdAt: new Date(),
            attachments: imageUrl ? [imageUrl] : []
        });
        alert('Post added!');
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <input name="title" value={post.title} onChange={handleInputChange} placeholder="Title" />
            <textarea name="text" value={post.text} onChange={handleInputChange} placeholder="Text"></textarea>
            <select name="type" value={post.type} onChange={handleInputChange}>
                <option value="announcement">Announcement</option>
                <option value="meeting">Meeting</option>
            </select>
            {post.type === 'meeting' && (
                <input name="location" value={post.location} onChange={handleInputChange} placeholder="Location" />
            )}
            <input type="file" onChange={handleFileChange} />
            <button onClick={handlePostSubmit}>Submit Post</button>
        </div>
    );
};

export default withAuth(AdminPage);
