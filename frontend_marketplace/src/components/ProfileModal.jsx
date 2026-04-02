function ProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[350px] rounded-xl p-5 shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold">
              L
            </div>
            <div>
              <h4 className="font-semibold">Lil</h4>
              <p className="text-sm text-gray-500">lil@email.com</p>
            </div>
          </div>
          <button onClick={onClose} className="text-lg">✕</button>
        </div>

        {/* Stats */}
        <div className="flex justify-around text-center mb-4">
          <div>
            <h5 className="font-bold">12</h5>
            <p className="text-sm text-gray-500">Ads</p>
          </div>
          <div>
            <h5 className="font-bold">5</h5>
            <p className="text-sm text-gray-500">Sold</p>
          </div>
          <div>
            <h5 className="font-bold">3</h5>
            <p className="text-sm text-gray-500">Active</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button className="bg-gray-100 p-2 rounded-md hover:bg-gray-200">My Ads</button>
          <button className="bg-gray-100 p-2 rounded-md hover:bg-gray-200">Saved Items</button>
          <button className="bg-gray-100 p-2 rounded-md hover:bg-gray-200">Settings</button>
          <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProfileModal;