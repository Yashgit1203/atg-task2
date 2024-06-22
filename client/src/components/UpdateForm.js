import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateForm = ({ post }) => {
  const [formData, setFormData] = useState({
    id: post._id,
    url: post.image,
    description: post.description,
  });

  useEffect(() => {
    setFormData({
      id: post._id,
      url: post.url,
      description: post.description,
    });
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://atg-task2.onrender.com/posts/edit', formData);
      console.log(response);
      document.querySelector(".btn-close-3").click();
      
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
    
  };

  return (
    <div
      className="modal fade"
      id="exampleModal3"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="d-flex flex-column align-items-end">
          <button
            type="button"
            className="btn-close btn-close-3 trans mb-2"
            data-bs-dismiss="modal"
            aria-label="Close"
            
          ></button>
          <div className="modal-content">
            <div className="modal-header modal-header-postform w-100">
              <h4 className="show-title">Edit Post</h4>
            </div>
            <div className="modal-body row">
              <div className="modal_form_l col-12">
                <div className="row">
                  <div className="col-8 offset-2 edit-card">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                          Enter Image URL
                        </label>
                        <input
                          name="url"
                          className="form-control h-25"
                          id="image"
                          placeholder="Enter URL here ..."
                          required
                          type="text"
                          value={formData.url}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="desc" className="form-label">
                          Description
                        </label>
                        <input
                          name="description"
                          className="form-control h-25"
                          id="desc"
                          placeholder="Enter description"
                          type="text"
                          required
                          value={formData.description}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">Enter description</div>
                      </div>

                      <button onClick={() => window.location.reload()} type="submit" className="btn btn-dark add-btn mb-3 w-25 h-25">
                        Edit
                      </button>
                    </form>
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
