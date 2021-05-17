const ProfileUpload: React.FC = (props) => {
    let file = File;

    const changeFile = (e) => {
        file = e.target.files[0];
    };

    return (
        <>
            {" "}
            <input type="file" onChange={changeFile} />
            <button
                onClick={() => {
                    alert(file);
                }}
            >
                Upload
            </button>{" "}
        </>
    );
};

export default ProfileUpload;
