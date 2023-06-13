import { useState, FC, ChangeEvent, useEffect } from "react";
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
  Uploader,
} from "rsuite";
import Style from "../styles/Profile.module.css";
import { FaRegEdit, FaSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import User, { LoginRegisterUser } from "../models/User";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { AuthState, login, updateUser } from "../features/auth/authSlice";
import { updateUserPayload } from "../models/User";
import moment from "moment";
import { Buffer } from "buffer";
import defaultLogo from "../assets/default-avatar-photo.jpg";

//mock data for user
const user: User = {
  _id: "12345",
  name: "Rick Astley",
  email: "rickastley1234@gmail.com",
  gender: "M",
  birthDate: new Date("2000-12-31"),
  avatar: null,
  token: "12345",
};

type ShowingProps = {
  // userData: User;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

type EditingProps = {
  setUserData: React.Dispatch<React.SetStateAction<User>>;
};

const ShowProfileSection: FC<ShowingProps> = ({ setIsEdit }) => {
  const { user } = useSelector<RootState, AuthState>((state) => state.auth);
  const { name, email, gender, birthDate, avatar } = user!;
  const dateStr: string = birthDate
    ? moment(birthDate).format("ll")
    : "undefined";

  return (
    <FlexboxGrid justify="center">
      <Col xs={23} md={21} lg={18} xl={16} className={Style["profile-section"]}>
        <Row>
          <h3>Your Profile</h3>
        </Row>
        <Row>
          <Col xs={24} md={8} xl={6} className={Style["profile-pic-col"]}>
            <Row className={Style["profile-pic-row"]}>
              <img
                src={avatar ? `data:image/jpeg;base64,${avatar}` : defaultLogo}
                alt="Profile picture"
                className={Style["profile-pic"]}
              />
            </Row>
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
                {gender === "M" ? "Male" : "Female"}
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

const EditProfileSection: FC<ShowingProps> = ({ setIsEdit }) => {
  const { user } = useSelector<RootState, AuthState>((state) => state.auth);
  const [formData, setFormData] = useState<User>({
    _id: "12345",
    name: "John Doe",
    email: "johndoe@gmail.com",
    gender: "M",
    birthDate: new Date("2000-12-31"),
    avatar: null,
    token: "12345",
  });
  const toaster = useToaster();
  const dispatch = useDispatch<AppDispatch>();
  // console.log(userData);
  // console.log(formData);

  // const [buffer, setBuffer] = useState<Uint8Array | null>();
  // console.log(buffer);

  useEffect(() => {
    setFormData(user!);
    if (user?.birthDate == null) {
      setFormData((currFormData) => ({
        ...currFormData,
        birthDate: new Date(),
      }));
    }
  }, []);

  const handleInputChange = (value: any, event: any) => {
    setFormData((currFormData) => ({
      ...currFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSelectedGender = (value: string) => {
    const inputGender: "M" | "F" = value === "Male" ? "M" : "F";
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

  const handleLoadedPic = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];

    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     const result = e.target?.result as ArrayBuffer;
    //     const buffer = new Uint8Array(result);
    //     const base64Image = btoa(String.fromCharCode(...buffer));
    //     console.log(base64Image);
    //     updateFormDataPic(base64Image);
    //   };
    //   reader.readAsArrayBuffer(file);
    // }

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          updateFormDataPic(result.split(",")[1]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const updateFormDataPic = (base64String: string): void => {
    setFormData((currFormData) => ({
      ...currFormData,
      avatar: base64String,
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

    const userData: updateUserPayload = {
      userId: formData._id,
      updatedUser: formData,
    };
    dispatch(updateUser(userData));
    setIsEdit(false);
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
            <Row className={Style["profile-pic-row"]}>
              <img
                src={
                  formData.avatar
                    ? `data:image/jpeg;base64,${formData.avatar}`
                    : defaultLogo
                }
                alt="Profile picture"
                className={Style["profile-pic"]}
              />
            </Row>
            <Row
              className={Style["profile-pic-row"]}
              style={{ fontSize: "10px" }}
            >
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleLoadedPic}
              />
            </Row>
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
                  value={formData.gender === "M" ? "Male" : "Female"}
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
                <DatePicker
                  format="dd/MM/yyyy"
                  value={new Date(formData?.birthDate)}
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
  // const [userData, setUserData] = useState<User>({
  //   _id: "12345",
  //   name: "John Doe",
  //   email: "johndoe@gmail.com",
  //   gender: "M",
  //   birthDate: new Date("2000-12-31"),
  //   avatar: null,
  //   token: "12345",
  // });
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { user } = useSelector<RootState, AuthState>((state) => state.auth);

  // useEffect(() => {
  //   setUserData(user);
  //   console.log("render profile");
  // }, []);

  // console.log(user);

  return (
    <>
      {isEdit ? (
        <EditProfileSection setIsEdit={setIsEdit} />
      ) : (
        <ShowProfileSection setIsEdit={setIsEdit} />
      )}
    </>
  );
};

export default Profile;
