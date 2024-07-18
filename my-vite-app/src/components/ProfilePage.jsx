import { useLocation, useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { name } = useParams();
  const location = useLocation();
  const { work, projects, photos, profilePhoto } = location.state;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6">
        {profilePhoto && (
          <img
            src={profilePhoto}
            alt="Profile"
            className="w-full h-64 object-cover rounded-t-lg"
          />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          <h2 className="text-2xl font-semibold mb-4">Work: {work}</h2>

          {work === 'developer' && (
            <div>
              <h3 className="text-xl font-bold mb-2">Personal Projects</h3>
              <ul className="list-disc list-inside">
                {projects.map((project, index) => (
                  <li key={index}>{project.value}</li>
                ))}
              </ul>
            </div>
          )}

          {work === 'doctor' && (
            <div>
              <h3 className="text-xl font-bold mb-2">Photos</h3>
              {photos.map((photo, index) => (
                <div key={index} className="mb-4">
                  {photo.value && (
                    <img
                      src={photo.value}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg mb-2"
                    />
                  )}
                  <p>{photo.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
