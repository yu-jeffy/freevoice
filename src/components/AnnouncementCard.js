const AnnouncementCard = ({ post }) => {
    return (
        <div>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
            {post.attachments && post.attachments.map((url) => (
                <img key={url} src={url} alt="Attachment" style={{ width: '100px', height: 'auto' }} />
            ))}
        </div>
    );
};

export default AnnouncementCard;