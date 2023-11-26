import { useNavigate } from "react-router-dom";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";

/* eslint-disable react/prop-types */
const TableRows = ({ article, serial, handleDelete }) => {
  const { _id, image, title, Approved, premium } = article;
  const navigate = useNavigate();

  const handleDetail = (id) => {
    navigate(`/allArticles/${id}`);
  };

  const handleUpdate = (id) => {
    navigate(`/updateArticle/${id}`);
  };

  return (
    <tr>
      <th>{serial + 1}</th>
      <td>
        <div className="flex justify-center items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={image} alt="" />
            </div>
          </div>
        </div>
      </td>
      <td className="max-w-[200px]">{title}</td>
      <td>
        <button
          onClick={() => handleDetail(_id)}
          className="btn btn-ghost btn-xs rounded bg-[#00BFFF]"
        >
          Details
        </button>
      </td>

      <td>
        {Approved === "approved" ? (
          <span className="bg-green-500">Approved</span>
        ) : Approved === "denied" ? (
          <>
            <span>Denied</span>
            <button className="btn btn-xs rounded bg-[#FFA500]">
              View Reason
            </button>
          </>
        ) : (
          <span className="bg-[#FFFF99]">Pending</span>
        )}
      </td>
      <td>{premium === "basic" ? <span>No</span> : <span>Yes</span>}</td>
      <td>
        <button
          onClick={() => handleUpdate(_id)}
          className="btn btn-ghost btn-xs rounded bg-[#39cfcf]"
        >
          <FaRegPenToSquare />
        </button>
      </td>
      <td>
        <button
          onClick={() => handleDelete(_id)}
          className="btn btn-ghost btn-xs rounded bg-[#ff184e]"
        >
          <FaRegTrashCan />
        </button>
      </td>
    </tr>
  );
};

export default TableRows;
