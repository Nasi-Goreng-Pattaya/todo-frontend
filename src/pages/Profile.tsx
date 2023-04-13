import { useState, FC } from "react";
import { Col, Row, FlexboxGrid, Button } from "rsuite";
import Style from "../styles/Profile.module.css";
import { FaRegEdit } from "react-icons/fa";
import User from "../models/User";

//mock data for user
const user: User = {
  name: "Rick Astley",
  email: "rickastley1234@gmail.com",
  gender: "m",
  birthDate: new Date("2000-04-06"),
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjBCWfqcMo0udmC_nv8VqFkh8Ej4oeC-GL7DLmwEbtoSrPdZkvUhiYBBZS-7G63iZg-WQ&usqp=CAU",
};

const detail_titles: string[] = ["Username", "Email", "Gender", "Birth Date"];

const Profile = () => {
  const [userData, setUserData] = useState<User>(user);

  return (
    <FlexboxGrid justify="center">
      <Col xs={23} md={21} lg={18} xl={16} className={Style["profile-section"]}>
        <Row>
          <h3>Your Profile</h3>
        </Row>
        <Row>
          <Col xs={24} md={8} xl={6} className={Style["profile-pic-col"]}>
            <img
              src={userData.avatar}
              alt="Profile picture"
              className={Style["profile-pic"]}
            />
          </Col>
          <Col xs={24} md={16} xl={18} className={Style["details"]}>
            <Row>
              <Col xs={8} className={Style["detail-title"]}>
                Name:
              </Col>
              <Col xs={16} className={Style["detail-info"]}>
                {userData.name}
              </Col>
            </Row>
            <Row>
              <Col xs={8} className={Style["detail-title"]}>
                Email:
              </Col>
              <Col xs={16} className={Style["detail-info"]}>
                {userData.email}
              </Col>
            </Row>
            <Row>
              <Col xs={8} className={Style["detail-title"]}>
                Gender:
              </Col>
              <Col xs={16} className={Style["detail-info"]}>
                {userData.gender === "m" ? "Male" : "Female"}
              </Col>
            </Row>
            <Row>
              <Col xs={8} className={Style["detail-title"]}>
                Birth date:
              </Col>
              <Col xs={16} className={Style["detail-info"]}>
                {userData.birthDate?.toLocaleDateString()}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ display: "flex" }}>
          <Button
            className={Style["button"]}
            appearance="primary"
            startIcon={<FaRegEdit />}
          >
            Edit Profile
          </Button>
        </Row>
      </Col>
    </FlexboxGrid>
  );
};

export default Profile;
