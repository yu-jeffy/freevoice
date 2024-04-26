import AnnouncementCard from './AnnouncementCard';
import MeetingCard from './MeetingCard';

const Post = ({ post }) => {
    switch (post.type) {
        case 'announcement':
            return <AnnouncementCard post={post} />;
        case 'meeting':
            return <MeetingCard post={post} />;
        default:
            return <p>Unknown Post Type</p>;
    }
};

export default Post;