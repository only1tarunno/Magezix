import { FaRegTrashCan } from "react-icons/fa6";

/* eslint-disable react/prop-types */
const Articlebox = ({
  article,
  handleDelete,
  handleApproved,
  handlePremium,
  handleDecline,
}) => {
  const {
    _id,
    title,
    publisher,
    authorEmail,
    authorName,
    authorPhoto,
    postedTime,
    Approved,
    premium,
  } = article || {};
  return (
    <tr>
      <td>
        <div className="flex justify-center items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={authorPhoto} alt="" />
            </div>
          </div>
        </div>
      </td>
      <td className="max-w-[200px]">{title}</td>
      <td>{authorName}</td>
      <td>{authorEmail}</td>

      <td>
        {new Date(postedTime).toLocaleString(undefined, {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour12: true, // Use 12-hour format
        })}
      </td>
      <td>
        {Approved === "approved" ? (
          <span className="bg-[#4CAF50]">Approved</span>
        ) : Approved === "denied" ? (
          <span className="bg-[#f44336] ">Denied</span>
        ) : (
          <span className="bg-[#FFFF99]">Pending</span>
        )}
      </td>
      <td className="uppercase">{publisher}</td>

      <td>
        <button
          onClick={() => handleApproved(_id)}
          className="btn rounded btn-sm  bg-[#4CAF50]"
        >
          Approve
        </button>
      </td>
      <td>
        {premium === "basic" ? (
          <button
            onClick={() => handlePremium(_id)}
            className="btn rounded btn-sm bg-[#2196F3]"
          >
            Premium
          </button>
        ) : (
          <span className="font-bold text-[#FFD700]">
            Article is <br /> premium
          </span>
        )}
      </td>
      <td>
        <button
          onClick={() => document.getElementById(`my_modal_${_id}`).showModal()}
          className="btn rounded btn-sm bg-[#ff9800]"
        >
          Decline
        </button>
        {/* modal start here  */}
        <dialog id={`my_modal_${_id}`} className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            {/* form start here  */}
            <form onSubmit={handleDecline}>
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">Reason</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Write few words..."
                  name="reason"
                  required
                ></textarea>
              </div>
              <input type="hidden" name="id" defaultValue={_id} />
              <button
                type="submit"
                className="btn w-full bg-[#BB9CC0] border-[#BB9CC0] rounded  hover:bg-[#4c5161] hover:border-[#4c5161] text-white font-medium"
              >
                Decline
              </button>
            </form>
          </div>
        </dialog>
      </td>
      <td>
        <button
          onClick={() => handleDelete(_id)}
          className="btn rounded btn-sm bg-[#f44336] "
        >
          <FaRegTrashCan />
        </button>
      </td>
    </tr>
  );
};

export default Articlebox;
