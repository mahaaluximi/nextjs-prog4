const UserProfile = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
        </div>
    );
}

export default UserProfile;

export async function getServerSideProps(context) {
    //can access req, res and params too
    const { req, res } = context;
    return {
        props: {
            name: 'Max'
        }
    }
}