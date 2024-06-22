const PostForm = ({handleSubmit,handleChange ,formData}) => {
  return (
    <div
      className="modal fade"
      id="exampleModal2"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="d-flex flex-column align-items-end">
          <button
            type="button"
            className="btn-close btn-close-2 trans mb-2"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => window.location.reload()}
          ></button>
          <div className="modal-content">
            <div className="modal-header modal-header-postform w-100">
              <h4 className="show-title">Creating a New Listing</h4>
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

                      <button className="btn btn-dark add-btn mb-3 w-25 h-25">
                        ADD
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

export default PostForm;
