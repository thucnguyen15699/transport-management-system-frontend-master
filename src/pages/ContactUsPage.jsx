const ContactUsPage = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">Liên hệ với chúng tôi</h1>
        </div>
        <div className="col-12 col-md-8 offset-md-2">
          <p className="text-center">
            Bạn có thắc mắc hoặc cần hỗ trợ? Chúng tôi luôn sẵn sàng hỗ trợ. 
            Dù bạn là quản trị viên cần hỗ trợ quản lý vận hành hay là nhà vận tải có thắc mắc về quản lý xe, 
            đặt chỗ cho khách hàng, hoặc chi phí, hãy liên hệ với chúng tôi. 
            Đội ngũ hỗ trợ tận tâm của chúng tôi luôn sẵn sàng hỗ trợ bạn.
          </p>

          <form className="mt-4">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Tin nhắn
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="4"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn bg-color custom-bg-text">
                Gửi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
