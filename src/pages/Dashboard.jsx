import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import revenue_pic from "../images/revenue.png";
import salaryicon from "../images/salary_mng.png";
import totalbookings from "../images/totalbookings.png";
import newbookings from "../images/newbookings.png";
import newbookingsamount from "../images/newbookingamount.png";

import totalvehicles from "../images/vehicles.png";
import stoppedvehicle from "../images/stopped truck.png";

import runningvehicles from "../images/running trucks.png";

import notifications from "../images/notifications.png";
import newdueamount from "../images/newdueamount.png";

import totaldueamount from "../images/totaldueamounts.png";

import fuelexpenses from "../images/fuelexpenses.png";

import otherexpenses from "../images/otherexpenses.png";
import total_expenses from "../images/total_expenses.png";

import DashboardBookings from "./DashboardBookings";
import { Button, Modal, Form } from "react-bootstrap";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [data, setData] = useState({
    tripDetails: [],
    alertNotifications: [],
  });

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const getDashboardData = async () => {
      const dashboardData = await retrieveDashboardData();
      if (dashboardData) {
        setData(dashboardData);
      }
    };

    getDashboardData();
  }, []);

  const retrieveDashboardData = async () => {
    const response = await axios.get(
      "http://171.228.167.35:8080:8080/api/transport/client/booking/admin/dashboard"
    );
    return response.data;
  };

  const getBookingsUsingStartTimeAndEndTime = (e) => {
    e.preventDefault();

    fetch(
      "http://171.228.167.35:8080:8080/api/transport/client/booking/search/date-time?startTime=" +
        convertToMillis(startTime) +
        "&endTime=" +
        convertToMillis(endTime),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //    Authorization: "Bearer " + admin_jwtToken,
        },
      }
    )
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            setData((prevState) => ({
              ...prevState,
              tripDetails: res.tripDetails,
            }));
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // setTimeout(() => {
        //   window.location.reload(true);
        // }, 1000);
      });
  };

  const getTodaysBookings = (e) => {
    fetch("http://171.228.167.35:8080:8080/api/transport/client/booking/todays", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //    Authorization: "Bearer " + admin_jwtToken,
      },
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            data.tripDetails = res.tripDetails;
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      });
  };

  const convertToMillis = (startTime) => {
    if (!startTime) {
      return null; // Handle case where startTime is not provided
    }

    const date = new Date(startTime);
    return date.getTime();
  };

  const markNotificationAsRead = (alertId) => {
    fetch(
      "http://171.228.167.35:8080:8080/api/transport/client/booking/dashboard/alert/read?alertId=" +
        alertId,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //    Authorization: "Bearer " + admin_jwtToken,
        },
      }
    )
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
      });
  };

  return (
    <div className="container-fluid mt-3 mb-5">
      <div className="container">
        <div className="text-center text-color">
          <h2>Bảng điều khiển chính</h2>
        </div>

        <div className="row">
          <div className="col-md-3">
            <div className="card rounded-card shadow-lg">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 ">
                    <img
                      src={totalvehicles}
                      class="card-img-top rounded"
                      alt="img"
                      style={{
                        width: "50px",
                      }}
                    />
                  </div>
                  <div className="col-md-9" style={{ whiteSpace: "nowrap" }}>
                    <h3> {data.totalVehicle}</h3>
                    <div className="text-muted">Tổng số xe</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card rounded-card shadow-lg">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 ">
                    <img
                      src={runningvehicles}
                      class="card-img-top rounded"
                      alt="img"
                      style={{
                        width: "50px",
                      }}
                    />
                  </div>
                  <div className="col-md-9" style={{ whiteSpace: "nowrap" }}>
                    <h3> {data.runningVehicle}</h3>
                    <div className="text-muted">Xe đang chạy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card rounded-card shadow-lg">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 ">
                    <img
                      src={stoppedvehicle}
                      class="card-img-top rounded"
                      alt="img"
                      style={{
                        width: "50px",
                      }}
                    />
                  </div>
                  <div className="col-md-9" style={{ whiteSpace: "nowrap" }}>
                    <h3>{data.stoppedVehicle}</h3>
                    <div className="text-muted">Xe dừng lại</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div
              className="card rounded-card shadow-lg"
              onClick={handleShow}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 ">
                    <img
                      src={notifications}
                      class="card-img-top rounded"
                      alt="img"
                      style={{
                        width: "62px",
                      }}
                    />
                  </div>
                  <div className="col-md-9" style={{ whiteSpace: "nowrap" }}>
                    <h3> {data.totalAlertNotification}</h3>
                    <div className="text-muted">Thông báo cảnh báo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-3">
            <div className="card rounded-card shadow-lg">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 ">
                    <img
                      src={totalbookings}
                      class="card-img-top rounded"
                      alt="img"
                      style={{
                        width: "50px",
                      }}
                    />
                  </div>
                  <div className="col-md-9" style={{ whiteSpace: "nowrap" }}>
                    <h3> {data.totalBookedOrder}</h3>
                    <div className="text-muted">Tổng số đơn hàng đã đặt</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card rounded-card shadow-lg">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 ">
                    <img
                      src={newbookings}
                      class="card-img-top rounded"
                      alt="img"
                      style={{
                        width: "50px",
                      }}
                    />
                  </div>
                  <div className="col-md-9" style={{ whiteSpace: "nowrap" }}>
                    <h3> {data.todayNewBooking}</h3>
                    <div className="text-muted">Đặt chỗ mới</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card rounded-card shadow-lg">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 ">
                    <img
                      src={revenue_pic}
                      class="card-img-top rounded"
                      alt="img"
                      style={{
                        width: "50px",
                      }}
                    />
                  </div>
                  <div className="col-md-9" style={{ whiteSpace: "nowrap" }}>
                    <h3> &#8377; {data.totalAmountBooked}/-</h3>
                    <div className="text-muted">Tổng số tiền đã đặt</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card rounded-card shadow-lg">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 ">
                    <img
                      src={newbookingsamount}
                      class="card-img-top rounded"
                      alt="img"
                      style={{
                        width: "62px",
                      }}
                    />
                  </div>
                  <div className="col-md-9" style={{ whiteSpace: "nowrap" }}>
                    <h3> &#8377; {data.totalNewBookedAmount}/-</h3>
                    <div className="text-muted">Số tiền đặt mới</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-3">
            <div className="card rounded-card shadow-lg">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 ">
                    <img
                      src={totaldueamount}
                      class="card-img-top rounded"
                      alt="img"
                      style={{
                        width: "50px",
                      }}
                    />
                  </div>
                  <div className="col-md-9" style={{ whiteSpace: "nowrap" }}>
                    <h3> &#8377; {data.totalDueAmount}/-</h3>
                    <div className="text-muted">Tổng số tiền phải trả</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card rounded-card shadow-lg">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 ">
                    <img
                      src={newdueamount}
                      class="card-img-top rounded"
                      alt="img"
                      style={{
                        width: "50px",
                      }}
                    />
                  </div>
                  <div className="col-md-9" style={{ whiteSpace: "nowrap" }}>
                    <h3> &#8377; {data.totalNewDueAmount}/-</h3>
                    <div className="text-muted">Số tiền đến hạn mới</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card rounded-card shadow-lg">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 ">
                    <img
                      src={fuelexpenses}
                      class="card-img-top rounded"
                      alt="img"
                      style={{
                        width: "50px",
                      }}
                    />
                  </div>
                  <div className="col-md-9" style={{ whiteSpace: "nowrap" }}>
                    <h3> &#8377;{data.todaysFuelExpense}/-</h3>
                    <div className="text-muted">Chi phí nhiên liệu ngày nay</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card rounded-card shadow-lg">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 ">
                    <img
                      src={otherexpenses}
                      class="card-img-top rounded"
                      alt="img"
                      style={{
                        width: "50px",
                      }}
                    />
                  </div>
                  <div className="col-md-9" style={{ whiteSpace: "nowrap" }}>
                    <h3>&#8377; {data.todaysOtherExpense}/-</h3>
                    <div className="text-muted">Chi phí khác ngày nay</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-3">
            <div className="card rounded-card shadow-lg">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 ">
                    <img
                      src={salaryicon}
                      class="card-img-top rounded"
                      alt="img"
                      style={{
                        width: "50px",
                      }}
                    />
                  </div>
                  <div className="col-md-9" style={{ whiteSpace: "nowrap" }}>
                    <h3> &#8377; {data.todaysSalaryPaid}/-</h3>
                    <div className="text-muted">Lương trả hôm nay</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card rounded-card shadow-lg">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 ">
                    <img
                      src={total_expenses}
                      class="card-img-top rounded"
                      alt="img"
                      style={{
                        width: "50px",
                      }}
                    />
                  </div>
                  <div className="col-md-9" style={{ whiteSpace: "nowrap" }}>
                    <h3> &#8377; {data.todaysTotalExpense}/-</h3>
                    <div className="text-muted">Tổng chi phí hôm nay</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DashboardBookings />
      </div>

      <Modal show={showModal} onHide={handleClose} className="modal-lg">
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title style={{ borderRadius: "1em" }}>
           Thông báo cảnh báo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Số xe.</th>
                  <th scope="col">Số đăng ký.</th>
                  <th scope="col">Thông tin miêu tả</th>
                  <th scope="col">Ngày cuối cùng</th>
                  <th scope="col">Hoạt động</th>
                </tr>
              </thead>
              <tbody>
                {data.alertNotifications.map((alert) => (
                  <tr key={alert.id}>
                    <td>{alert.vehicleNo}</td>
                    <td>{alert.vehicleRegistrationNo}</td>
                    <td>{alert.description}</td>
                    <td>{alert.lastDate}</td>
                    <td>
                      <button
                        onClick={() => {
                          markNotificationAsRead(alert.id);
                        }}
                        className="btn btn-sm bg-color custom-bg-text ms-2 mt-2"
                      >
                        Đánh dấu Đọc
                      </button>
                      <ToastContainer />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
