import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Cookie from 'js-cookie';
import { useSelector } from 'react-redux';
import DeleteFeedbackModel from './deleteFeedbackModel';

const FeedbackReport = () => {
  const token = Cookie.get('token');
  const businessName = useSelector((state) => state.business.businessName);
  const [feedback, setFeedback] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
    return `${dayName}-${dateStr}`;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://apibiri.eazydevz.in/api/getFeedback?businessName=${businessName}`);
      setFeedback(response.data?.feedback || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch feedback data.");
    }
  };

  const handleDeleteModal = (id) => {
    setDeleteModalOpen(true);
    setDeleteId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://apibiri.eazydevz.in/api/deleteFeedback/${id}`);
      setDeleteId(null);
      setDeleteModalOpen(false);
      fetchData(); // Refresh data after delete
      toast.success("Feedback deleted successfully.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete feedback.");
    }
  };

  useEffect(() => {
    if (businessName) {
      fetchData();
    }
  }, [businessName]);

  return (
    <div className="w-full h-full bg-[#DDDCDC] p-10">
      <DeleteFeedbackModel
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onSave={() => handleDelete(deleteId)}
        id={deleteId}
        setId={setDeleteId}
      />

      <div className="p-6">
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">#</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Feedback</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Rating</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {feedback.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.feedback}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.rating}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{formatDate(item.createdAt)}</td>
                  <td className="px-6 py-4 text-md text-gray-900">
                    <button
                      className="bg-red-500 p-2 text-md rounded-md text-white"
                      onClick={() => handleDeleteModal(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {feedback.length === 0 && (
            <div className="text-center py-4 text-gray-500 text-sm">No Feedback data found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackReport;
