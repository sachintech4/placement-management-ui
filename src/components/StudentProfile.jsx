import React, { useContext, useState, useEffect } from "react";
import { AuthUserContext } from "../contexts";
import { doc, onSnapshot, updateDoc } from "@firebase/firestore";
import { db } from "../firebase-config";
import cons from "../cons";
import {
  View,
  ToggleButton,
  TextField,
  Form,
  Button,
  Grid,
  Flex,
} from "@adobe/react-spectrum";
import { ToastQueue } from "@react-spectrum/toast";
import Edit from "@spectrum-icons/workflow/Edit";

function StudentProfile() {
  const user = useContext(AuthUserContext);
  const [edit, setEdit] = useState(false);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState({ day: "", month: "", year: "" });
  const [id, setId] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isPlaced, setIsPlaced] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [prn, setPrn] = useState("");
  const [tenthPercentage, setTenthPercentage] = useState("");
  const [twelfthPercentage, setTwelfthPercentage] = useState("");
  const [tenthYearOfPassing, setTenthYearOfPassing] = useState("");
  const [twelfthYearOfPassing, setTwelfthYearOfPassing] = useState("");
  const [ugCgpa, setUgCgpa] = useState("");
  const [pgCgpa, setPgCgpa] = useState("");
  const [ugYearOfPassing, setUgYearOfPassing] = useState("");
  const [pgYearOfPassing, setPgYearOfPassing] = useState("");

  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [dobInput, setDobInput] = useState({ day: "", month: "", year: "" });
  const [contactNumberInput, setContactNumberInput] = useState("");
  const [isPlacedInput, setIsPlacedInput] = useState("");
  const [rollNoInput, setRollNoInput] = useState("");
  const [prnInput, setPrnInput] = useState("");
  const [tenthPercentageInput, setTenthPercentageInput] = useState("");
  const [twelfthPercentageInput, setTwelfthPercentageInput] = useState("");
  const [tenthYearOfPassingInput, setTenthYearOfPassingInput] = useState("");
  const [twelfthYearOfPassingInput, setTwelfthYearOfPassingInput] =
    useState("");
  const [ugCgpaInput, setUgCgpaInput] = useState("");
  const [pgCgpaInput, setPgCgpaInput] = useState("");
  const [ugYearOfPassingInput, setUgYearOfPassingInput] = useState("");
  const [pgYearOfPassingInput, setPgYearOfPassingInput] = useState("");

  const docRef = doc(db, cons.DB.COLLECTIONS.USERS_STUDENT, user.uid);

  const handleContactNumber = (inputValue) => {
    const numericInput = inputValue.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    const maxDigits = 10;
    const limitedInput = numericInput.slice(0, maxDigits); // Limit to 10 digits
    setContactNumberInput(limitedInput);
  };

  const handle10Percentage = (inputValue, setPercentageInput) => {
    const numericInput = inputValue.replace(/[^0-9.]/g, ""); // Remove non-numeric characters except for decimal point
    setTenthPercentageInput(numericInput);
  };
  const handle12Percentage = (inputValue, setPercentageInput) => {
    const numericInput = inputValue.replace(/[^0-9.]/g, ""); // Remove non-numeric characters except for decimal point
    setTwelfthPercentageInput(numericInput);
  };
  const handleUgCgpa = (inputValue, setPercentageInput) => {
    const numericInput = inputValue.replace(/[^0-9.]/g, ""); // Remove non-numeric characters except for decimal point
    setUgCgpaInput(numericInput);
  };
  const handlePgCgpa = (inputValue, setPercentageInput) => {
    const numericInput = inputValue.replace(/[^0-9.]/g, ""); // Remove non-numeric characters except for decimal point
    setPgCgpaInput(numericInput);
  };

  const handle10YearOfPassing = (inputValue, setYearOfPassingInput) => {
    const numericInput = inputValue.replace(/[^0-9]/g, "");
    const maxDigits = 10;
    const limitedInput = numericInput.slice(0, maxDigits); // Remove non-numeric characters
    setTenthYearOfPassingInput(limitedInput);
  };
  const handle12YearOfPassing = (inputValue, setYearOfPassingInput) => {
    const numericInput = inputValue.replace(/[^0-9]/g, "");
    const maxDigits = 10;
    const limitedInput = numericInput.slice(0, maxDigits); // Remove non-numeric characters
    setTwelfthYearOfPassingInput(limitedInput);
  };
  const handleUgYearOfPassing = (inputValue, setYearOfPassingInput) => {
    const numericInput = inputValue.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    const maxDigits = 10;
    const limitedInput = numericInput.slice(0, maxDigits);
    setUgYearOfPassingInput(limitedInput);
  };
  const handlePgYearOfPassing = (inputValue, setYearOfPassingInput) => {
    const numericInput = inputValue.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    const maxDigits = 10;
    const limitedInput = numericInput.slice(0, maxDigits);
    setPgYearOfPassingInput(limitedInput);
  };

  // Get Student document using uid
  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setEmail(data.email);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setDob(data.dob);
        setContactNumber(data.contactNumber);
        setIsPlaced(data.isPlaced);
        setRollNo(data.rollNo);
        setPrn(data.prn);
        setTenthPercentage(data.tenthPercentage);
        setTwelfthPercentage(data.twelfthPercentage);
        setTenthYearOfPassing(data.tenthYearOfPassing);
        setTwelfthYearOfPassing(data.twelfthYearOfPassing);
        setUgCgpa(data.ugCgpa);
        setPgCgpa(data.pgCgpa);
        setUgYearOfPassing(data.ugYearOfPassing);
        setPgYearOfPassing(data.pgYearOfPassing);

        // Sets value for the input field
        setFirstNameInput(data.firstName);
        setLastNameInput(data.lastName);
        setDobInput(data.dob);
        setContactNumberInput(data.contactNumber);
        setIsPlacedInput(data.isPlaced);
        setRollNoInput(data.rollNo);
        setPrnInput(data.prn);
        setTenthPercentageInput(data.tenthPercentage);
        setTwelfthPercentageInput(data.twelfthPercentage);
        setTenthYearOfPassingInput(data.tenthYearOfPassing);
        setTwelfthYearOfPassingInput(data.twelfthYearOfPassing);
        setUgCgpaInput(data.ugCgpa);
        setPgCgpaInput(data.pgCgpa);
        setUgYearOfPassingInput(data.ugYearOfPassing);
        setPgYearOfPassingInput(data.pgYearOfPassing);
      } else {
        console.log("Document does not exist");
      }
    });

    return () => unsubscribe();
  }, [user.uid]);

  const updateStudentDocument = async (e) => {
    e.preventDefault();
    const updatedStudentData = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      dob: {
        day: dobInput.day,
        month: dobInput.month,
        year: dobInput.year,
      },
      // rollNo: rollNoInput,
      contactNumber: contactNumberInput,
      // prn: prnInput,
      tenthPercentage: tenthPercentageInput,
      tenthYearOfPassing: tenthYearOfPassingInput,
      twelfthPercentage: twelfthPercentageInput,
      twelfthYearOfPassing: twelfthYearOfPassingInput,
      ugCgpa: ugCgpaInput,
      ugYearOfPassing: ugYearOfPassingInput,
      pgCgpa: pgCgpaInput,
      pgYearOfPassing: pgYearOfPassingInput,
    };

    try {
      await updateDoc(docRef, updatedStudentData);
      console.log("Student document updated successfully.");
      ToastQueue.positive("Document updated successfully.", { timeout: 1000 });
    } catch (error) {
      console.error("Error updating Student data.");
      ToastQueue.negative("Failed to update the document.", { timeout: 1000 });
    }
  };

  const onToggleEdit = () => {
    setEdit((_edit) => {
      if (_edit) {
        setFirstNameInput(firstName);
        setLastNameInput(lastName);
        setContactNumber(contactNumber);
        setDobInput(dob);
        setIsPlacedInput(isPlaced);
        setRollNoInput(rollNo);
        setPrnInput(prn);
        setTenthPercentageInput(tenthPercentage);
        setTwelfthPercentageInput(twelfthPercentage);
        setTenthYearOfPassingInput(tenthYearOfPassing);
        setTwelfthYearOfPassingInput(twelfthYearOfPassing);
        setUgCgpaInput(ugCgpa);
        setPgCgpaInput(pgCgpa);
        setUgYearOfPassingInput(ugYearOfPassing);
        setPgYearOfPassingInput(pgYearOfPassing);
      }
      return !_edit;
    });
  };

  return (
    <View height="100vh" overflowY="auto">
      <View
        padding="size-250"
        width="fit-content"
        borderWidth="thin"
        borderColor="dark"
        borderRadius="medium"
        backgroundColor="gray-200"
      >
        <Form onSubmit={updateStudentDocument}>
          <Grid
            areas={[
              "firstName lastName",
              "email email",
              "rollNo dob",
              "contactNumber prn",
              "tenthPercentage tenthYearOfPassing",
              "twelfthPercentage twelfthYearOfPassing",
              "ugCgpa ugYearOfPassing",
              "pgCgpa pgYearOfPassing",
              "isPlaced isPlaced",
              "toggle submit",
            ]}
            columns={"1fr 1fr"}
            gap={"size-200"}
          >
            <TextField
              gridArea={"firstName"}
              label="First Name"
              isReadOnly={!edit}
              value={firstNameInput === null ? "" : firstNameInput}
              onChange={setFirstNameInput}
            />
            <TextField
              gridArea={"lastName"}
              label="Last Name"
              isReadOnly={!edit}
              value={lastNameInput === null ? "" : lastNameInput}
              onChange={setLastNameInput}
            />
            <TextField
              gridArea={"email"}
              label={
                edit ? "To update email, look for the Settings page." : "Email"
              }
              value={email}
              isReadOnly
            />
            <TextField
              gridArea={"rollNo"}
              label="Roll No"
              isReadOnly={!edit}
              value={rollNoInput === null ? "" : rollNoInput}
              onChange={setRollNoInput}
            />
            <Flex gridArea={"dob"} alignitems={"end"} gap={"size-400"}>
              <TextField
                label="Day"
                isReadOnly={!edit}
                value={dobInput.day === null ? "" : dobInput.day}
                width={"size-200"}
                onChange={(value) => setDobInput({ ...dobInput, day: value })}
              />
              <TextField
                label="Month"
                isReadOnly={!edit}
                value={dobInput.month === null ? "" : dobInput.month}
                width={"size-200"}
                onChange={(value) => setDobInput({ ...dobInput, month: value })}
              />
              <TextField
                label="Year"
                isReadOnly={!edit}
                value={dobInput.year === null ? "" : dobInput.year}
                width={"size-800"}
                onChange={(value) => setDobInput({ ...dobInput, year: value })}
              />
            </Flex>
            <TextField
              gridArea={"prn"}
              label="PRN"
              isReadOnly={!edit}
              value={prnInput === null ? "" : prnInput}
              onChange={setPrnInput}
            />
            <TextField
              gridArea={"contactNumber"}
              label="Contact Number"
              isReadOnly={!edit}
              value={contactNumberInput}
              onChange={handleContactNumber}
            />

            <TextField
              gridArea={"tenthPercentage"}
              label="10th Percentage"
              isReadOnly={!edit}
              value={tenthPercentageInput}
              onChange={(inputValue) =>
                handle10Percentage(inputValue, setTenthPercentageInput)
              }
            />

            <TextField
              gridArea={"twelfthPercentage"}
              label="12th Percentage"
              isReadOnly={!edit}
              value={twelfthPercentageInput}
              onChange={(inputValue) =>
                handle12Percentage(inputValue, setTwelfthPercentageInput)
              }
            />

            <TextField
              gridArea={"tenthYearOfPassing"}
              label="10th Year Of Passing"
              isReadOnly={!edit}
              value={tenthYearOfPassingInput}
              onChange={(inputValue) =>
                handle10YearOfPassing(inputValue, setTenthYearOfPassingInput)
              }
            />

            <TextField
              gridArea={"twelfthYearOfPassing"}
              label="12th Year Of Passing"
              isReadOnly={!edit}
              value={twelfthYearOfPassingInput}
              onChange={(inputValue) =>
                handle12YearOfPassing(inputValue, setTwelfthYearOfPassingInput)
              }
            />

            <TextField
              gridArea={"ugCgpa"}
              label="Under Graduate CGPA"
              isReadOnly={!edit}
              value={ugCgpaInput}
              onChange={(inputValue) =>
                handleUgCgpa(inputValue, setUgCgpaInput)
              }
            />

            <TextField
              gridArea={"ugYearOfPassing"}
              label="Under Graduate Year Of Passing"
              isReadOnly={!edit}
              value={ugYearOfPassingInput}
              onChange={(inputValue) =>
                handleUgYearOfPassing(inputValue, setUgYearOfPassingInput)
              }
            />

            <TextField
              gridArea={"pgCgpa"}
              label="Post Graduate CGPA"
              isReadOnly={!edit}
              value={pgCgpaInput}
              onChange={(inputValue) =>
                handlePgCgpa(inputValue, setPgCgpaInput)
              }
            />

            <TextField
              gridArea={"pgYearOfPassing"}
              label="Post Graduate Year Of Passing"
              isReadOnly={!edit}
              value={pgYearOfPassingInput}
              onChange={(inputValue) =>
                handlePgYearOfPassing(inputValue, setPgYearOfPassingInput)
              }
            />
            <TextField
              gridArea={"isPlaced"}
              label="Placement Status"
              isReadOnly={!edit}
              value={isPlacedInput ? "Placed" : "not Placed"}
              onChange={setIsPlacedInput}
            />
            <View gridArea={"toggle"} justifySelf={"center"}>
              <ToggleButton
                onPress={onToggleEdit}
                aria-label="edit details"
                isSelected={edit}
              >
                <Edit />
              </ToggleButton>
            </View>
            {edit && (
              <View gridArea={"submit"} justifySelf={"center"}>
                <Button variant="cta" type="submit">
                  Update
                </Button>
              </View>
            )}
          </Grid>
        </Form>
      </View>
    </View>
  );
}

export default StudentProfile;
