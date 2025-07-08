const UserPage = (props) => {
    return (
        <div>
            <h1>User: {props.uid}</h1>
        </div>
    );
}

export default UserPage;

export async function getServerSideProps(context) {
    const { params } = context;
    const { uid } = params;
    return {
        props: {
            uid: 'Userid-' + uid,
        }
    }
    
}