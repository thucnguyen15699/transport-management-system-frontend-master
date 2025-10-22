import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const MentorProfile = () => {
  const user = JSON.parse(sessionStorage.getItem("active-mentor"));
  const mentor_jwtToken = sessionStorage.getItem("mentor-jwtToken");

  const navigate = useNavigate();

  const [mentor, setMentor] = useState(user);

  useEffect(() => {
    const getUser = async () => {
      const userRes = await retrieveUser();
      if (userRes) {
        setMentor(userRes.users[0]);
      }
    };

    getUser();
  }, []);

  const retrieveUser = async () => {
    const response = await axios.get(
      "http://171.228.167.35:8080/api/user/fetch/user-id?userId=" + mentor.id
    );
    return response.data;
  };

  const addProfile = () => {
    navigate("/mentor/profile/add");
  };

  return (
    <div className="container-fluid mb-2">
      <div className="container-fluid mb-2">
        <div className="d-flex align-items-center justify-content-center ms-5 mt-1 me-5 mb-3">
          <div
            className="h-100"
            style={{
              width: "900px",
            }}
          >
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-center">
                {(() => {
                  if (mentor.mentorDetail) {
                    return (
                      <img
                        src={
                          "http://171.228.167.35:8080/api/user/" +
                          mentor.mentorDetail.profilePic
                        }
                        className="card-img-top mentor-profile-photo mt-3 rounded-circle"
                        alt="profile_pic"
                      />
                    );
                  }
                })()}
              </div>
              <div className="row mt-4">
                <div className="col-md-4">
                  <p className="mb-2">
                    <b>First Name:</b> {mentor.firstName}
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="mb-2">
                    <b>Last Name:</b> {mentor.lastName}
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="mb-2">
                    <b>Email Id:</b> {mentor.emailId}
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-4">
                  <p className="mb-2">
                    <b>Số điện thoại:</b> {mentor.phoneNo}
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="mb-2">
                    <b>Địa chỉ:</b>{" "}
                    {mentor.address.street +
                      " " +
                      mentor.address.city +
                      " " +
                      mentor.address.pincode}
                  </p>
                </div>
              </div>

              {(() => {
                if (mentor.mentorDetail) {
                  return (
                    <div>
                      <div className="row mt-4">
                        <div className="col-md-4">
                          <p className="mb-2">
                            <b>Nghề nghiệp:</b> {mentor.mentorDetail.profession}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p className="mb-2">
                            <b>tiểu sử ngắn:</b> {mentor.mentorDetail.bio}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p className="mb-2">
                            <b>Trình độ cao nhất:</b>{" "}
                            {mentor.mentorDetail.highestQualification}
                          </p>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-4">
                          <p className="mb-2">
                            <b>Tuổi:</b> {mentor.mentorDetail.age}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p className="mb-2">
                            <b>Kinh nghiệm:</b> {mentor.mentorDetail.experience}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })()}

              {(() => {
                if (mentor.mentorDetail === null) {
                  return (
                    <div className="mt-3 mb-4">
                      <button
                        type="submit"
                        class="btn bg-color text-color"
                        onClick={addProfile}
                      >
                        Thêm hồ sơ
                      </button>
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
