import { FaRegTrashCan } from "react-icons/fa6";

/* eslint-disable react/prop-types */
const Articlebox = ({ article, handleDelete, handleApproved }) => {
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
          <button className="btn rounded btn-sm bg-[#2196F3]">Premium</button>
        ) : (
          <span>This Article is premium</span>
        )}
      </td>
      <td>
        <button className="btn rounded btn-sm bg-[#ff9800]">Decline</button>
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
