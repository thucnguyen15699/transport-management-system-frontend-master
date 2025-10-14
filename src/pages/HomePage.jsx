import vehicle_mng from "./../images/vehicle_mng.png";
import Carousel from "./Carousel";
import client_branch from "./../images/client_branch.png";
import trip_mngt from "./../images/trip_mngt.png";
import expense_mngt from "./../images/expense_mngt.png";
import salary_mng from "./../images/salary_mng.png";

import trip_payments from "./../images/trip_payments.png";

import { Link } from "react-router-dom";

const HomePage = () => {
    const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  
    if (admin) {
      console.log("Người đang đăng nhập:", admin.emailId);
    } else {
      console.log("Chưa có ai đăng nhập");
    }
  return (
    <div>
      {/* Hero Section */}

      <Carousel />

      <div className="container text-center mt-5">
        <h1 className="display-4">Quản lý doanh nghiệp vận tải của bạn một cách dễ dàng</h1>
        <p className="text-muted mt-4">
          Một nền tảng toàn diện dành cho quản trị viên và nhà vận tải để quản lý hiệu quả phương tiện,
          khách hàng, đặt chỗ, nhân viên, v.v. Theo dõi chi phí chuyến đi, 
          giám sát thanh toán và đảm bảo sự phối hợp liền mạch các hoạt động hàng ngày. 
          Đơn giản hóa mọi khía cạnh của quản lý vận tải với các cập nhật theo thời gian thực và báo cáo chi tiết.
        </p>

        <Link
          to="/admin/dashboard"
          className="btn btn-lg bg-color custom-bg-text mt-4"
        >
          Get Started
        </Link>
      </div>

      {/* Features Section */}
      <section className="features-section py-5 mt-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4">
              <img
                src={vehicle_mng} // Placeholder path
                alt="Vehicle Management"
                className="img-fluid mb-3"
                style={{ maxHeight: "150px" }}
              />
              <h3>Quản lý phương tiện</h3>
              <p>
                Dễ dàng quản lý đội xe của bạn, 
                từ việc thêm xe mới đến theo dõi tình trạng bảo trì và khả năng sử dụng của xe.
              </p>
            </div>
            <div className="col-md-4">
              <img
                src={client_branch} // Placeholder path
                alt="Client Management"
                className="img-fluid mb-3"
                style={{ maxHeight: "150px" }}
              />
              <h3>Quản lý khách hàng & chi nhánh</h3>
              <p>
                Thêm khách hàng mới, quản lý thông tin chi tiết của họ và theo dõi 
                các chi nhánh của khách hàng để hoạt động diễn ra suôn sẻ.
              </p>
            </div>
            <div className="col-md-4">
              <img
                src={trip_mngt} // Placeholder path
                alt="Trip Management"
                className="img-fluid mb-3"
                style={{ maxHeight: "150px" }}
              />
              <h3>Quản lý chuyến đi của khách hàng</h3>
              <p>
                Quản lý chuyến đi của khách hàng hiệu quả bằng cách thêm chuyến đi, 
                theo dõi chi phí chuyến đi, tính giá, phí và xử lý thanh toán.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="features-section py-5 bg-light">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4">
              <img
                src={expense_mngt} // Placeholder path
                alt="Expense Management"
                className="img-fluid mb-3"
                style={{ maxHeight: "150px" }}
              />
              <h3>Quản lý chi phí</h3>
              <p>
                Quản lý mọi loại chi phí, từ chi phí nhiên liệu cho chuyến đi đến
               các khoản phí khác và theo dõi tổng chi phí.
              </p>
            </div>
            <div className="col-md-4">
              <img
                src={salary_mng} // Placeholder path
                alt="Employee Salary Management"
                className="img-fluid mb-3"
                style={{ maxHeight: "150px" }}
              />
              <h3>Quản lý lương nhân viên</h3>
              <p>
                Quản lý nhân viên như tài xế và người giúp việc, theo dõi lương của họ, 
                phân công họ đi công tác và giám sát hiệu suất làm việc của họ.
              </p>
            </div>
            <div className="col-md-4">
              <img
                src={trip_payments} // Placeholder path
                alt="Secure Transactions"
                className="img-fluid mb-3"
                style={{ maxHeight: "150px" }}
              />
              <h3>Hồ sơ thanh toán chuyến đi</h3>
              <p>
                Theo dõi tất cả các khoản thanh toán cho chuyến đi, bao gồm cả việc khách hàng đã thanh toán đầy đủ hay vẫn đang chờ xử lý. Dễ dàng
                quản lý trạng thái thanh toán để vận hành tài chính liền mạch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Người dùng của chúng tôi nói gì</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card p-4">
                <p>
                  "Nền tảng này đã cách mạng hóa cách tôi quản lý đội xe và
                  nhân viên của mình. Mọi thứ giờ đây đều ở cùng một nơi!"
                </p>
                <p className="text-end">
                  <strong>- Transporter 1</strong>
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-4">
                <p>
                  "Việc quản lý toàn bộ hoạt động vận tải giờ đây
                   dễ dàng hơn bao giờ hết. Rất đáng để thử!"
                </p>
                <p className="text-end">
                  <strong>- Admin 1</strong>
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-4">
                <p>
                  "Hệ thống thanh toán an toàn đảm bảo tính minh bạch cho cả bên vận chuyển và khách hàng."
                </p>
                <p className="text-end">
                  <strong>- Client 1</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="cta-section text-white text-center py-5"
        style={{
          backgroundImage: "url('/path-to-cta-background.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="container text-color">
          <h2>Bạn đã sẵn sàng quản lý doanh nghiệp vận tải của mình chưa?</h2>
          <p className="lead">
            Tham gia cùng nhiều quản trị viên và nhà vận chuyển thành công đang quản lý doanh nghiệp của họ bằng nền tảng của chúng tôi.
          </p>
          <Link
            to="/user/register"
            className="btn btn-lg bg-color custom-bg-text"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
