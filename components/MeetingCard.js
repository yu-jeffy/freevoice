const MeetingCard = ({ post }) => {
    return (
        <div>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
            <p>Location: {post.location}</p>
        </div>
    );
};

export default MeetingCard;