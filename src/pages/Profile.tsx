import { useState, FC, ChangeEvent } from "react";
import {
  Col,
  Row,
  FlexboxGrid,
  Button,
  Input,
  InputPicker,
  DatePicker,
  useToaster,
  Message,
} from "rsuite";
import Style from "../styles/Profile.module.css";
import { FaRegEdit, FaSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import User from "../models/User";

//mock data for user
const user: User = {
  name: "Rick Astley",
  email: "rickastley1234@gmail.com",
  gender: "m",
  birthDate: new Date("2000-12-31"),
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjBCWfqcMo0udmC_nv8VqFkh8Ej4oeC-GL7DLmwEbtoSrPdZkvUhiYBBZS-7G63iZg-WQ&usqp=CAU",
};

type ShowingProps = {
  userData: User;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

type EditingProps = {
  setUserData: React.Dispatch<React.SetStateAction<User>>;
};

const ShowProfileSection: FC<ShowingProps> = ({ userData, setIsEdit }) => {
  const { name, email, gender, birthDate, avatar } = userData;
  const dateStr: string =
    birthDate?.getDate() +
    "/" +
    (birthDate ? birthDate?.getMonth() + 1 : 0) +
    "/" +
    birthDate?.getFullYear();
  return (
    <FlexboxGrid justify="center">
      <Col xs={23} md={21} lg={18} xl={16} className={Style["profile-section"]}>
        <Row>
          <h3>Your Profile</h3>
        </Row>
        <Row>
          <Col xs={24} md={8} xl={6} className={Style["profile-pic-col"]}>
            <img
              src={avatar}
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
                {name}
              </Col>
            </Row>
            <Row>
              <Col xs={8} className={Style["detail-title"]}>
                Email:
              </Col>
              <Col xs={16} className={Style["detail-info"]}>
                {email}
              </Col>
            </Row>
            <Row>
              <Col xs={8} className={Style["detail-title"]}>
                Gender:
              </Col>
              <Col xs={16} className={Style["detail-info"]}>
                {gender === "m" ? "Male" : "Female"}
              </Col>
            </Row>
            <Row>
              <Col xs={8} className={Style["detail-title"]}>
                Birth date:
              </Col>
              <Col xs={16} className={Style["detail-info"]}>
                {dateStr}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={Style["button-group"]}>
          <Button
            className={`${Style["button"]} ${Style["blue-btn"]}`}
            appearance="primary"
            startIcon={<FaRegEdit />}
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </Button>
        </Row>
      </Col>
    </FlexboxGrid>
  );
};

const EditProfileSection: FC<ShowingProps & EditingProps> = ({
  userData,
  setIsEdit,
  setUserData,
}) => {
  const [formData, setFormData] = useState(userData);
  const toaster = useToaster();

  const handleInputChange = (value: any, event: any) => {
    setFormData((currFormData) => ({
      ...currFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSelectedGender = (value: string) => {
    const inputGender: "m" | "f" = value === "Male" ? "m" : "f";
    setFormData((currFormData) => ({
      ...currFormData,
      gender: inputGender,
    }));
  };

  const handleSelectedBirthDate = (date: Date): void => {
    setFormData((currFormData) => ({
      ...currFormData,
      birthDate: date,
    }));
  };

  const handleSaveProfile = () => {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail: boolean = expression.test(formData.email);
    if (!isValidEmail) {
      toaster.push(
        <Message showIcon type="error" header="Input Error">
          Please enter valid email!
        </Message>,
        {
          placement: "topCenter",
          duration: 3000,
        }
      );
      return;
    }
    setUserData(formData);
    setIsEdit(false);
    //code to send request to API
  };

  const genderData = ["Male", "Female"].map((item) => ({
    label: item,
    value: item,
  }));

  return (
    <FlexboxGrid justify="center">
      <Col xs={23} md={21} lg={18} xl={16} className={Style["profile-section"]}>
        <Row>
          <h3>Edit Profile</h3>
        </Row>
        <Row>
          <Col xs={24} md={8} xl={6} className={Style["profile-pic-col"]}>
            <img
              src={formData.avatar}
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
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  size="lg"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={8} className={Style["detail-title"]}>
                Email:
              </Col>
              <Col xs={16} className={Style["detail-info"]}>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  size="lg"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={8} className={Style["detail-title"]}>
                Gender:
              </Col>
              <Col xs={16} className={Style["detail-info"]}>
                <InputPicker
                  value={formData.gender === "m" ? "Male" : "Female"}
                  data={genderData}
                  cleanable={false}
                  style={{ color: "red" }}
                  onSelect={handleSelectedGender}
                  size="lg"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={8} className={Style["detail-title"]}>
                Birth date:
              </Col>
              <Col xs={16} className={Style["detail-info"]}>
                {/* {formData.birthDate?.toLocaleDateString()} */}
                <DatePicker
                  format="dd/MM/yyyy"
                  value={formData.birthDate}
                  cleanable={false}
                  onSelect={handleSelectedBirthDate}
                  size="lg"
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={Style["button-group"]}>
          <Button
            className={Style["button"]}
            color="green"
            appearance="primary"
            startIcon={<FaSave />}
            onClick={() => handleSaveProfile()}
          >
            Save Profile
          </Button>
          <Button
            className={Style["button"]}
            color="red"
            appearance="primary"
            startIcon={<ImCancelCircle />}
            onClick={() => setIsEdit(false)}
          >
            Cancel
          </Button>
        </Row>
      </Col>
    </FlexboxGrid>
  );
};

const Profile = () => {
  const [userData, setUserData] = useState<User>(user);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <>
      {isEdit ? (
        <EditProfileSection
          userData={userData}
          setIsEdit={setIsEdit}
          setUserData={setUserData}
        />
      ) : (
        <ShowProfileSection userData={userData} setIsEdit={setIsEdit} />
      )}
    </>
  );
};

export default Profile;
