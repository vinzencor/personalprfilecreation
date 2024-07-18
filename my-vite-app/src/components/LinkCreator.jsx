import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputList = ({ items, setItems, placeholder, isImage }) => {
  const handleAddItem = () => {
    setItems([...items, { value: '', description: '' }]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="mb-2">
          {isImage ? (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleItemChange(index, 'value', URL.createObjectURL(e.target.files[0]))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              />
              <input
                type="text"
                placeholder={`Description ${index + 1}`}
                value={item.description}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              />
            </>
          ) : (
            <input
              type="text"
              placeholder={`${placeholder} ${index + 1}`}
              value={item.value}
              onChange={(e) => handleItemChange(index, 'value', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            />
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddItem}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
      >
        +
      </button>
    </div>
  );
};

const LinkCreator = () => {
  const [name, setName] = useState('');
  const [work, setWork] = useState('');
  const [projects, setProjects] = useState([{ value: '' }]);
  const [photos, setPhotos] = useState([{ value: '', description: '' }]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

  const handleProfilePhotoChange = (e) => {
    setProfilePhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !work) {
      alert('Please fill in all required fields');
      return;
    }

    navigate(`/profile/${name}`, {
      state: { name, work, projects, photos, profilePhoto },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="p-6 max-w-lg mx-auto bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-xl shadow-md space-y-4 text-white">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">
              Create your link
            </label>
            <input
              type="text"
              placeholder="samplelink/"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {name && (
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2">
                What is your work?
              </label>
              <div className="mb-4">
                <select
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled>
                    Select your work
                  </option>
                  <option value="developer">Developer</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>

              {work === 'developer' && (
                <div>
                  <label className="block text-lg font-bold mb-2">
                    Personal Projects
                  </label>
                  <InputList items={projects} setItems={setProjects} placeholder="Project" isImage={false} />
                </div>
              )}

              {work === 'doctor' && (
                <div>
                  <label className="block text-lg font-bold mb-2">
                    Photos
                  </label>
                  <InputList items={photos} setItems={setPhotos} placeholder="Photo" isImage={true} />
                </div>
              )}
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out mt-4"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkCreator;
