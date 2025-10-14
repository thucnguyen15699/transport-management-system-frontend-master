import React from "react";

const ErrorPage = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center text-danger mb-4">404</h1>
        </div>
        <div className="col-12 col-md-10 offset-md-1">
          <h2 className="text-center mb-4">Ồ! Không tìm thấy trang</h2>
          <p className="lead text-center">
            Trang bạn đang tìm kiếm có thể đã bị xóa hoặc
            tạm thời không khả dụng.
          </p>
          <div className="text-center">
            <a href="/" className="btn btn-lg bg-color custom-bg-text mt-4">
              Quay lại trang chủ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
