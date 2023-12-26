export default function NewsDelPop({ delPop, setDelPop, handleDelete }) {
  return (
    <div
      className={`update-user fixed left-0 top-0 flex h-[100vh] w-full items-center  justify-center ${
        !delPop && "hidden"
      }`}
    >
      <div className="m-auto flex flex-col justify-center gap-6 rounded-lg bg-white p-4 text-center md:w-[28%]">
        <div className="flex justify-center py-2">
          <h2 className="text-xl font-bold">Are you sure?</h2>
        </div>
        <h3>This action can't be reversed</h3>
        <div className="item-center flex justify-center gap-6 p-2">
          <button
            className="btn-secondary"
            onClick={() => {
              setDelPop(false);
            }}
          >
            Cancel
          </button>
          <button className="btn-primary" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
