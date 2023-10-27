import React from "react";

function NewsDelPop({ delPop, setDelPop, handleDelete }) {
    return (
        <div
            className={`fixed top-0 left-0 w-full flex justify-center items-center update-user  h-[100vh] ${
                !delPop && "hidden"
            }`}
        >
            <div className="flex flex-col justify-center text-center m-auto md:w-[28%] bg-white p-4 gap-6 rounded-lg">
                <div className="flex justify-center py-2">
                    <h2 className="text-xl font-bold">Are you sure?</h2>
                </div>
                <h3>This action can't be reversed</h3>
                <div className="flex item-center justify-center p-2 gap-6">
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

export default NewsDelPop;
